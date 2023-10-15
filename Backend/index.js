const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const userSchema = require("./schema/userSchema");
const SellerSchema = require("./schema/sellerSchema");
const orderSchema = require("./schema/orderSchema");
const nodemailer = require("nodemailer");
const pdf = require("html-pdf");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const admin = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");

const seller = require("./routes/sellerRoutes");
const user = require("./routes/userRoutes");

const banner = require("./routes/bannerRoutes");

const chat = require("./routes/chatRoutes");
const order = require("./routes/orderRoutes");
const reviewSchema = require("./schema/reviewSchema");
// const couponsSchema = require("./schema/couponsSchema");
const discountCoupon = require("./routes/discountCouponRoute");
const { paymentConfirm } = require("./controller/orderController");
const sellerSchema = require("./schema/sellerSchema");
const {
  initializeUserForChat,
  handleMessageSendedByUsers,
} = require("./controller/chatController");
const Chat = require("./schema/chatSchema");
const auth = require("./middlewares/auth");
const { verifyEmail } = require('./controller/mail');
const Tax = require("./schema/taxSchema");

// const dotenv = require("dotenv");

// dotenv.config();

app.use(cookieParser());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("connection", async ({ id, role }) => {
    console.log(id, " ", role, " ", socket.id, "dhinchak pooja");
    if (role === "user") {
      const user = await userSchema.findByIdAndUpdate(id, { chatId: socket.id });
      socket.join('users')
      io.to('sellers').emit('online', { id: user?._id.toString(), online: true })
    }

    if (role === "seller") {
      const seller = await sellerSchema.findByIdAndUpdate(id, { chatId: socket.id });
      socket.join('sellers')
      io.to('users').emit('online', { id: seller._id.toString(), online: true })
    }
  });

  socket.on("send-message", async ({ myId, toRole, toId, spot, message }) => {
    try {
    if (toRole === "user") {
      const user = await userSchema.findById(toId);
      let seller = await sellerSchema.findById(myId);
      if (user.queries.length === 0) {
        let chat = await Chat.create({
          inquirer: user?._id,
          respondent: myId,
          spot,
        });
        chat.messages.push({
          message,
          by: seller.firstName + " " + seller.lastName,
          date: Date.now(),
        });
        await chat.save();
        seller.queries.push(chat._id);
        await seller.save();
        user.queries.push(chat._id);
        await user.save();
        if (user.chatId !== "") {
          io.to(user.chatId).emit("receive-message", {
            message,
            by: seller.firstName + " " + seller.lastName,
          });
        }
      } else {
        user.queries.map(async (value) => {
          let chat = await Chat.findById(value._id);
          if (
            chat.respondent._id.toString() === myId &&
            chat.inquirer._id.toString() === toId &&
            chat.spot._id.toString() === spot
          ) {
            chat.messages.push({
              by: seller.firstName + " " + seller.lastName,
              message,
              date: Date.now(),
            });
            await chat.save();
            if (user.chatId !== "") {
              io.to(user.chatId).emit("receive-message", {
                message,
                by: seller.firstName + " " + seller.lastName,
              });
              return;
            }
          }
        });
      }
    }

    if (toRole === "seller") {
      const seller = await sellerSchema.findById(toId);
      let user = await userSchema.findById(myId);
      if (seller._doc.queries.length === 0) {
        let chat = await Chat.create({
          respondent: toId,
          inquirer: myId,
          spot,
        });
        chat.messages.push({
          message,
          by: user.firstName + " " + user.lastName,
          date: Date.now(),
        });
        await chat.save();
        seller.queries.push(chat._id);
        await seller.save();
        user.queries.push(chat._id);
        await user.save();
        if (seller.chatId !== "") {
          io.to(seller.chatId).emit("receive-message", {
            by: user.firstName + " " + user.lastName,
            message,
          });
        }
      } else {
        seller._doc.queries.map(async (value) => {
          let chat = await Chat.findById(value._id);
          if (
            chat.respondent._id.toString() === toId &&
            chat.inquirer._id.toString() === myId &&
            chat.spot._id.toString() === spot
          ) {
            chat.messages.push({
              by: user.firstName + " " + user.lastName,
              message,
              date: Date.now(),
            });
            await chat.save();
            if (seller.chatId !== "") {
              io.to(seller.chatId).emit("receive-message", {
                by: user.firstName + " " + user.lastName,
                message,
              });
              return;
            }
          }
        });
      }
    }
  } catch (err) {
  }
  });

  socket.on("close-connection", async ({ id, role }) => {
    if (role === "user") {
      await userSchema.findByIdAndUpdate(id, { chatId: "" });
    }

    if (role === "seller") {
      await sellerSchema.findByIdAndUpdate(id, { chatId: "" });
    }
  });

  socket.on("online", async ({ toId, toRole, status }) => {
    if (toRole === "user") {
      const user = await userSchema.findById(toRole);
      if (user.chatId !== "") {
        io.to(user.chatId).emit('online', { id: seller._id, online: status })
      }
    }

    if (toRole === "seller") {
      const seller = await sellerSchema.findById(toId);
      if (seller.chatId !== "") {
        io.to(user.chatId).emit('online', { id: seller._id, online: status })
      }
    }
  });

  socket.on('typing', async ({ status, toId, toRole }) => {
    console.log(status, toId, toRole)
    if(toRole === 'seller') {
      let seller = await sellerSchema.findById(toId)
      if (seller.chatId !== '') {
      io.to(seller.chatId).emit('typing', status)
      }
    } else {
      let user = await userSchema.findById(toId)
      if (user.chatId !== '') {
        io.to(user.chatId).emit('typing', status)
      }
    }
  })
});

app.post(
  "/api/payment-webhook",
  bodyParser.raw({ type: "*/*" }),
  paymentConfirm
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set EJS as the template engine
// app.set("view engine", "ejs");
// import API.js

app.use(express.static(path.join(__dirname, "build")));
// use API routes
app.use("/api/admin", admin);
app.use("/api", user);
app.use('/api/verify-email', verifyEmail)
app.use("/api", discountCoupon);

app.use("/api", chat);
app.use("/api", seller);
app.use("/api", banner);
app.use("/api", order);
app.use('/api/trial', async (req, res) => {
  const states = {
    "New York": [
      "New York",
      "Buffalo",
      "Rochester",
      "Yonkers",
      "Syracuse",
      "Albany",
      "New Rochelle",
      "Mount Vernon",
      "Schenectady",
      "Utica",
      "White Plains",
      "Hempstead",
      "Troy",
      "Niagara Falls",
      "Binghamton",
      "Freeport",
      "Valley Stream"
    ],
    "California": [
      "Los Angeles",
      "San Diego",
      "San Jose",
      "San Francisco",
      "Fresno",
      "Sacramento",
      "Long Beach",
      "Oakland",
      "Bakersfield",
      "Anaheim",
      "Santa Ana",
      "Riverside",
      "Stockton",
      "Chula Vista",
      "Irvine",
      "Fremont",
      "San Bernardino",
      "Modesto",
      "Fontana",
      "Oxnard",
      "Moreno Valley",
      "Huntington Beach",
      "Glendale",
      "Santa Clarita",
      "Garden Grove",
      "Oceanside",
      "Rancho Cucamonga",
      "Santa Rosa",
      "Ontario",
      "Lancaster",
      "Elk Grove",
      "Corona",
      "Palmdale",
      "Salinas",
      "Pomona",
      "Hayward",
      "Escondido",
      "Torrance",
      "Sunnyvale",
      "Orange",
      "Fullerton",
      "Pasadena",
      "Thousand Oaks",
      "Visalia",
      "Simi Valley",
      "Concord",
      "Roseville",
      "Victorville",
      "Santa Clara",
      "Vallejo",
      "Berkeley",
      "El Monte",
      "Downey",
      "Costa Mesa",
      "Inglewood",
      "Carlsbad",
      "San Buenaventura (Ventura)",
      "Fairfield",
      "West Covina",
      "Murrieta",
      "Richmond",
      "Norwalk",
      "Antioch",
      "Temecula",
      "Burbank",
      "Daly City",
      "Rialto",
      "Santa Maria",
      "El Cajon",
      "San Mateo",
      "Clovis",
      "Compton",
      "Jurupa Valley",
      "Vista",
      "South Gate",
      "Mission Viejo",
      "Vacaville",
      "Carson",
      "Hesperia",
      "Santa Monica",
      "Westminster",
      "Redding",
      "Santa Barbara",
      "Chico",
      "Newport Beach",
      "San Leandro",
      "San Marcos",
      "Whittier",
      "Hawthorne",
      "Citrus Heights",
      "Tracy",
      "Alhambra",
      "Livermore",
      "Buena Park",
      "Menifee",
      "Hemet",
      "Lakewood",
      "Merced",
      "Chino",
      "Indio",
      "Redwood City",
      "Lake Forest",
      "Napa",
      "Tustin",
      "Bellflower",
      "Mountain View",
      "Chino Hills",
      "Baldwin Park",
      "Alameda",
      "Upland",
      "San Ramon",
      "Folsom",
      "Pleasanton",
      "Union City",
      "Perris",
      "Manteca",
      "Lynwood",
      "Apple Valley",
      "Redlands",
      "Turlock",
      "Milpitas",
      "Redondo Beach",
      "Rancho Cordova",
      "Yorba Linda",
      "Palo Alto",
      "Davis",
      "Camarillo",
      "Walnut Creek",
      "Pittsburg",
      "South San Francisco",
      "Yuba City",
      "San Clemente",
      "Laguna Niguel",
      "Pico Rivera",
      "Montebello",
      "Lodi",
      "Madera",
      "Santa Cruz",
      "La Habra",
      "Encinitas",
      "Monterey Park",
      "Tulare",
      "Cupertino",
      "Gardena",
      "National City",
      "Rocklin",
      "Petaluma",
      "Huntington Park",
      "San Rafael",
      "La Mesa",
      "Arcadia",
      "Fountain Valley",
      "Diamond Bar",
      "Woodland",
      "Santee",
      "Lake Elsinore",
      "Porterville",
      "Paramount",
      "Eastvale",
      "Rosemead",
      "Hanford",
      "Highland",
      "Brentwood",
      "Novato",
      "Colton",
      "Cathedral City",
      "Delano",
      "Yucaipa",
      "Watsonville",
      "Placentia",
      "Glendora",
      "Gilroy",
      "Palm Desert",
      "Cerritos",
      "West Sacramento",
      "Aliso Viejo",
      "Poway",
      "La Mirada",
      "Rancho Santa Margarita",
      "Cypress",
      "Dublin",
      "Covina",
      "Azusa",
      "Palm Springs",
      "San Luis Obispo",
      "Ceres",
      "San Jacinto",
      "Lincoln",
      "Newark",
      "Lompoc",
      "El Centro",
      "Danville",
      "Bell Gardens",
      "Coachella",
      "Rancho Palos Verdes",
      "San Bruno",
      "Rohnert Park",
      "Brea",
      "La Puente",
      "Campbell",
      "San Gabriel",
      "Beaumont",
      "Morgan Hill",
      "Culver City",
      "Calexico",
      "Stanton",
      "La Quinta",
      "Pacifica",
      "Montclair",
      "Oakley",
      "Monrovia",
      "Los Banos",
      "Martinez"
    ],
    "Illinois": [
      "Chicago",
      "Aurora",
      "Rockford",
      "Joliet",
      "Naperville",
      "Springfield",
      "Peoria",
      "Elgin",
      "Waukegan",
      "Cicero",
      "Champaign",
      "Bloomington",
      "Arlington Heights",
      "Evanston",
      "Decatur",
      "Schaumburg",
      "Bolingbrook",
      "Palatine",
      "Skokie",
      "Des Plaines",
      "Orland Park",
      "Tinley Park",
      "Oak Lawn",
      "Berwyn",
      "Mount Prospect",
      "Normal",
      "Wheaton",
      "Hoffman Estates",
      "Oak Park",
      "Downers Grove",
      "Elmhurst",
      "Glenview",
      "DeKalb",
      "Lombard",
      "Belleville",
      "Moline",
      "Buffalo Grove",
      "Bartlett",
      "Urbana",
      "Quincy",
      "Crystal Lake",
      "Plainfield",
      "Streamwood",
      "Carol Stream",
      "Romeoville",
      "Rock Island",
      "Hanover Park",
      "Carpentersville",
      "Wheeling",
      "Park Ridge",
      "Addison",
      "Calumet City"
    ],
    "Texas": [
      "Houston",
      "San Antonio",
      "Dallas",
      "Austin",
      "Fort Worth",
      "El Paso",
      "Arlington",
      "Corpus Christi",
      "Plano",
      "Laredo",
      "Lubbock",
      "Garland",
      "Irving",
      "Amarillo",
      "Grand Prairie",
      "Brownsville",
      "Pasadena",
      "McKinney",
      "Mesquite",
      "McAllen",
      "Killeen",
      "Frisco",
      "Waco",
      "Carrollton",
      "Denton",
      "Midland",
      "Abilene",
      "Beaumont",
      "Round Rock",
      "Odessa",
      "Wichita Falls",
      "Richardson",
      "Lewisville",
      "Tyler",
      "College Station",
      "Pearland",
      "San Angelo",
      "Allen",
      "League City",
      "Sugar Land",
      "Longview",
      "Edinburg",
      "Mission",
      "Bryan",
      "Baytown",
      "Pharr",
      "Temple",
      "Missouri City",
      "Flower Mound",
      "Harlingen",
      "North Richland Hills",
      "Victoria",
      "Conroe",
      "New Braunfels",
      "Mansfield",
      "Cedar Park",
      "Rowlett",
      "Port Arthur",
      "Euless",
      "Georgetown",
      "Pflugerville",
      "DeSoto",
      "San Marcos",
      "Grapevine",
      "Bedford",
      "Galveston",
      "Cedar Hill",
      "Texas City",
      "Wylie",
      "Haltom City",
      "Keller",
      "Coppell",
      "Rockwall",
      "Huntsville",
      "Duncanville",
      "Sherman",
      "The Colony",
      "Burleson",
      "Hurst",
      "Lancaster",
      "Texarkana",
      "Friendswood",
      "Weslaco"
    ],
    "Pennsylvania": [
      "Philadelphia",
      "Pittsburgh",
      "Allentown",
      "Erie",
      "Reading",
      "Scranton",
      "Bethlehem",
      "Lancaster",
      "Harrisburg",
      "Altoona",
      "York",
      "State College",
      "Wilkes-Barre"
    ],
    "Arizona": [
      "Phoenix",
      "Tucson",
      "Mesa",
      "Chandler",
      "Glendale",
      "Scottsdale",
      "Gilbert",
      "Tempe",
      "Peoria",
      "Surprise",
      "Yuma",
      "Avondale",
      "Goodyear",
      "Flagstaff",
      "Buckeye",
      "Lake Havasu City",
      "Casa Grande",
      "Sierra Vista",
      "Maricopa",
      "Oro Valley",
      "Prescott",
      "Bullhead City",
      "Prescott Valley",
      "Marana",
      "Apache Junction"
    ],
    "Florida": [
      "Jacksonville",
      "Miami",
      "Tampa",
      "Orlando",
      "St. Petersburg",
      "Hialeah",
      "Tallahassee",
      "Fort Lauderdale",
      "Port St. Lucie",
      "Cape Coral",
      "Pembroke Pines",
      "Hollywood",
      "Miramar",
      "Gainesville",
      "Coral Springs",
      "Miami Gardens",
      "Clearwater",
      "Palm Bay",
      "Pompano Beach",
      "West Palm Beach",
      "Lakeland",
      "Davie",
      "Miami Beach",
      "Sunrise",
      "Plantation",
      "Boca Raton",
      "Deltona",
      "Largo",
      "Deerfield Beach",
      "Palm Coast",
      "Melbourne",
      "Boynton Beach",
      "Lauderhill",
      "Weston",
      "Fort Myers",
      "Kissimmee",
      "Homestead",
      "Tamarac",
      "Delray Beach",
      "Daytona Beach",
      "North Miami",
      "Wellington",
      "North Port",
      "Jupiter",
      "Ocala",
      "Port Orange",
      "Margate",
      "Coconut Creek",
      "Sanford",
      "Sarasota",
      "Pensacola",
      "Bradenton",
      "Palm Beach Gardens",
      "Pinellas Park",
      "Coral Gables",
      "Doral",
      "Bonita Springs",
      "Apopka",
      "Titusville",
      "North Miami Beach",
      "Oakland Park",
      "Fort Pierce",
      "North Lauderdale",
      "Cutler Bay",
      "Altamonte Springs",
      "St. Cloud",
      "Greenacres",
      "Ormond Beach",
      "Ocoee",
      "Hallandale Beach",
      "Winter Garden",
      "Aventura"
    ],
    "Indiana": [
      "Indianapolis",
      "Fort Wayne",
      "Evansville",
      "South Bend",
      "Carmel",
      "Bloomington",
      "Fishers",
      "Hammond",
      "Gary",
      "Muncie",
      "Lafayette",
      "Terre Haute",
      "Kokomo",
      "Anderson",
      "Noblesville",
      "Greenwood",
      "Elkhart",
      "Mishawaka",
      "Lawrence",
      "Jeffersonville",
      "Columbus",
      "Portage"
    ],
    "Ohio": [
      "Columbus",
      "Cleveland",
      "Cincinnati",
      "Toledo",
      "Akron",
      "Dayton",
      "Parma",
      "Canton",
      "Youngstown",
      "Lorain",
      "Hamilton",
      "Springfield",
      "Kettering",
      "Elyria",
      "Lakewood",
      "Cuyahoga Falls",
      "Middletown",
      "Euclid",
      "Newark",
      "Mansfield",
      "Mentor",
      "Beavercreek",
      "Cleveland Heights",
      "Strongsville",
      "Dublin",
      "Fairfield",
      "Findlay",
      "Warren",
      "Lancaster",
      "Lima",
      "Huber Heights",
      "Westerville",
      "Marion",
      "Grove City"
    ],
    "North Carolina": [
      "Charlotte",
      "Raleigh",
      "Greensboro",
      "Durham",
      "Winston-Salem",
      "Fayetteville",
      "Cary",
      "Wilmington",
      "High Point",
      "Greenville",
      "Asheville",
      "Concord",
      "Gastonia",
      "Jacksonville",
      "Chapel Hill",
      "Rocky Mount",
      "Burlington",
      "Wilson",
      "Huntersville",
      "Kannapolis",
      "Apex",
      "Hickory",
      "Goldsboro"
    ],
    "Michigan": [
      "Detroit",
      "Grand Rapids",
      "Warren",
      "Sterling Heights",
      "Ann Arbor",
      "Lansing",
      "Flint",
      "Dearborn",
      "Livonia",
      "Westland",
      "Troy",
      "Farmington Hills",
      "Kalamazoo",
      "Wyoming",
      "Southfield",
      "Rochester Hills",
      "Taylor",
      "Pontiac",
      "St. Clair Shores",
      "Royal Oak",
      "Novi",
      "Dearborn Heights",
      "Battle Creek",
      "Saginaw",
      "Kentwood",
      "East Lansing",
      "Roseville",
      "Portage",
      "Midland",
      "Lincoln Park",
      "Muskegon"
    ],
    "Tennessee": [
      "Memphis",
      "Nashville-Davidson",
      "Knoxville",
      "Chattanooga",
      "Clarksville",
      "Murfreesboro",
      "Jackson",
      "Franklin",
      "Johnson City",
      "Bartlett",
      "Hendersonville",
      "Kingsport",
      "Collierville",
      "Cleveland",
      "Smyrna",
      "Germantown",
      "Brentwood"
    ],
    "Massachusetts": [
      "Boston",
      "Worcester",
      "Springfield",
      "Lowell",
      "Cambridge",
      "New Bedford",
      "Brockton",
      "Quincy",
      "Lynn",
      "Fall River",
      "Newton",
      "Lawrence",
      "Somerville",
      "Waltham",
      "Haverhill",
      "Malden",
      "Medford",
      "Taunton",
      "Chicopee",
      "Weymouth Town",
      "Revere",
      "Peabody",
      "Methuen",
      "Barnstable Town",
      "Pittsfield",
      "Attleboro",
      "Everett",
      "Salem",
      "Westfield",
      "Leominster",
      "Fitchburg",
      "Beverly",
      "Holyoke",
      "Marlborough",
      "Woburn",
      "Chelsea"
    ],
    "Washington": [
      "Seattle",
      "Spokane",
      "Tacoma",
      "Vancouver",
      "Bellevue",
      "Kent",
      "Everett",
      "Renton",
      "Yakima",
      "Federal Way",
      "Spokane Valley",
      "Bellingham",
      "Kennewick",
      "Auburn",
      "Pasco",
      "Marysville",
      "Lakewood",
      "Redmond",
      "Shoreline",
      "Richland",
      "Kirkland",
      "Burien",
      "Sammamish",
      "Olympia",
      "Lacey",
      "Edmonds",
      "Bremerton",
      "Puyallup"
    ],
    "Colorado": [
      "Denver",
      "Colorado Springs",
      "Aurora",
      "Fort Collins",
      "Lakewood",
      "Thornton",
      "Arvada",
      "Westminster",
      "Pueblo",
      "Centennial",
      "Boulder",
      "Greeley",
      "Longmont",
      "Loveland",
      "Grand Junction",
      "Broomfield",
      "Castle Rock",
      "Commerce City",
      "Parker",
      "Littleton",
      "Northglenn"
    ],
    "District of Columbia": [
      "Washington"
    ],
    "Maryland": [
      "Baltimore",
      "Frederick",
      "Rockville",
      "Gaithersburg",
      "Bowie",
      "Hagerstown",
      "Annapolis"
    ],
    "Kentucky": [
      "Louisville/Jefferson County",
      "Lexington-Fayette",
      "Bowling Green",
      "Owensboro",
      "Covington"
    ],
    "Oregon": [
      "Portland",
      "Eugene",
      "Salem",
      "Gresham",
      "Hillsboro",
      "Beaverton",
      "Bend",
      "Medford",
      "Springfield",
      "Corvallis",
      "Albany",
      "Tigard",
      "Lake Oswego",
      "Keizer"
    ],
    "Oklahoma": [
      "Oklahoma City",
      "Tulsa",
      "Norman",
      "Broken Arrow",
      "Lawton",
      "Edmond",
      "Moore",
      "Midwest City",
      "Enid",
      "Stillwater",
      "Muskogee"
    ],
    "Wisconsin": [
      "Milwaukee",
      "Madison",
      "Green Bay",
      "Kenosha",
      "Racine",
      "Appleton",
      "Waukesha",
      "Eau Claire",
      "Oshkosh",
      "Janesville",
      "West Allis",
      "La Crosse",
      "Sheboygan",
      "Wauwatosa",
      "Fond du Lac",
      "New Berlin",
      "Wausau",
      "Brookfield",
      "Greenfield",
      "Beloit"
    ],
    "Nevada": [
      "Las Vegas",
      "Henderson",
      "Reno",
      "North Las Vegas",
      "Sparks",
      "Carson City"
    ],
    "New Mexico": [
      "Albuquerque",
      "Las Cruces",
      "Rio Rancho",
      "Santa Fe",
      "Roswell",
      "Farmington",
      "Clovis"
    ],
    "Missouri": [
      "Kansas City",
      "St. Louis",
      "Springfield",
      "Independence",
      "Columbia",
      "Lee's Summit",
      "O'Fallon",
      "St. Joseph",
      "St. Charles",
      "St. Peters",
      "Blue Springs",
      "Florissant",
      "Joplin",
      "Chesterfield",
      "Jefferson City",
      "Cape Girardeau"
    ],
    "Virginia": [
      "Virginia Beach",
      "Norfolk",
      "Chesapeake",
      "Richmond",
      "Newport News",
      "Alexandria",
      "Hampton",
      "Roanoke",
      "Portsmouth",
      "Suffolk",
      "Lynchburg",
      "Harrisonburg",
      "Leesburg",
      "Charlottesville",
      "Danville",
      "Blacksburg",
      "Manassas"
    ],
    "Georgia": [
      "Atlanta",
      "Columbus",
      "Augusta-Richmond County",
      "Savannah",
      "Athens-Clarke County",
      "Sandy Springs",
      "Roswell",
      "Macon",
      "Johns Creek",
      "Albany",
      "Warner Robins",
      "Alpharetta",
      "Marietta",
      "Valdosta",
      "Smyrna",
      "Dunwoody"
    ],
    "Nebraska": [
      "Omaha",
      "Lincoln",
      "Bellevue",
      "Grand Island"
    ],
    "Minnesota": [
      "Minneapolis",
      "St. Paul",
      "Rochester",
      "Duluth",
      "Bloomington",
      "Brooklyn Park",
      "Plymouth",
      "St. Cloud",
      "Eagan",
      "Woodbury",
      "Maple Grove",
      "Eden Prairie",
      "Coon Rapids",
      "Burnsville",
      "Blaine",
      "Lakeville",
      "Minnetonka",
      "Apple Valley",
      "Edina",
      "St. Louis Park",
      "Mankato",
      "Maplewood",
      "Moorhead",
      "Shakopee"
    ],
    "Kansas": [
      "Wichita",
      "Overland Park",
      "Kansas City",
      "Olathe",
      "Topeka",
      "Lawrence",
      "Shawnee",
      "Manhattan",
      "Lenexa",
      "Salina",
      "Hutchinson"
    ],
    "Louisiana": [
      "New Orleans",
      "Baton Rouge",
      "Shreveport",
      "Lafayette",
      "Lake Charles",
      "Kenner",
      "Bossier City",
      "Monroe",
      "Alexandria"
    ],
    "Hawaii": [
      "Honolulu"
    ],
    "Alaska": [
      "Anchorage"
    ],
    "New Jersey": [
      "Newark",
      "Jersey City",
      "Paterson",
      "Elizabeth",
      "Clifton",
      "Trenton",
      "Camden",
      "Passaic",
      "Union City",
      "Bayonne",
      "East Orange",
      "Vineland",
      "New Brunswick",
      "Hoboken",
      "Perth Amboy",
      "West New York",
      "Plainfield",
      "Hackensack",
      "Sayreville",
      "Kearny",
      "Linden",
      "Atlantic City"
    ],
    "Idaho": [
      "Boise City",
      "Nampa",
      "Meridian",
      "Idaho Falls",
      "Pocatello",
      "Caldwell",
      "Coeur d'Alene",
      "Twin Falls"
    ],
    "Alabama": [
      "Birmingham",
      "Montgomery",
      "Mobile",
      "Huntsville",
      "Tuscaloosa",
      "Hoover",
      "Dothan",
      "Auburn",
      "Decatur",
      "Madison",
      "Florence",
      "Gadsden"
    ],
    "Iowa": [
      "Des Moines",
      "Cedar Rapids",
      "Davenport",
      "Sioux City",
      "Iowa City",
      "Waterloo",
      "Council Bluffs",
      "Ames",
      "West Des Moines",
      "Dubuque",
      "Ankeny",
      "Urbandale",
      "Cedar Falls"
    ],
    "Arkansas": [
      "Little Rock",
      "Fort Smith",
      "Fayetteville",
      "Springdale",
      "Jonesboro",
      "North Little Rock",
      "Conway",
      "Rogers",
      "Pine Bluff",
      "Bentonville"
    ],
    "Utah": [
      "Salt Lake City",
      "West Valley City",
      "Provo",
      "West Jordan",
      "Orem",
      "Sandy",
      "Ogden",
      "St. George",
      "Layton",
      "Taylorsville",
      "South Jordan",
      "Lehi",
      "Logan",
      "Murray",
      "Draper",
      "Bountiful",
      "Riverton",
      "Roy"
    ],
    "Rhode Island": [
      "Providence",
      "Warwick",
      "Cranston",
      "Pawtucket",
      "East Providence",
      "Woonsocket"
    ],
    "Mississippi": [
      "Jackson",
      "Gulfport",
      "Southaven",
      "Hattiesburg",
      "Biloxi",
      "Meridian"
    ],
    "South Dakota": [
      "Sioux Falls",
      "Rapid City"
    ],
    "Connecticut": [
      "Bridgeport",
      "New Haven",
      "Stamford",
      "Hartford",
      "Waterbury",
      "Norwalk",
      "Danbury",
      "New Britain",
      "Meriden",
      "Bristol",
      "West Haven",
      "Milford",
      "Middletown",
      "Norwich",
      "Shelton"
    ],
    "South Carolina": [
      "Columbia",
      "Charleston",
      "North Charleston",
      "Mount Pleasant",
      "Rock Hill",
      "Greenville",
      "Summerville",
      "Sumter",
      "Goose Creek",
      "Hilton Head Island",
      "Florence",
      "Spartanburg"
    ],
    "New Hampshire": [
      "Manchester",
      "Nashua",
      "Concord"
    ],
    "North Dakota": [
      "Fargo",
      "Bismarck",
      "Grand Forks",
      "Minot"
    ],
    "Montana": [
      "Billings",
      "Missoula",
      "Great Falls",
      "Bozeman"
    ],
    "Delaware": [
      "Wilmington",
      "Dover"
    ],
    "Maine": [
      "Portland"
    ],
    "Wyoming": [
      "Cheyenne",
      "Casper"
    ],
    "West Virginia": [
      "Charleston",
      "Huntington"
    ],
    "Vermont": [
      "Burlington"
    ]
  }
  for(const state in states) {
    const regim = await Tax.create({
      state,
      cities: states[state].map((value) => ({
        name: value,
        taxRate: 6.35,
        serviceFee: 10
      }))
    })
    await regim.save()
  }
  res.json({ done: 'done' })
})
app.use("/uploads", express.static("uploads"));
app.use("/invoices", express.static("invoices"));
app.use("/docs", express.static("docs"));

mongoose.set("strictQuery", false);
const url =
  "mongodb+srv://ashwin:L73LFmAD66yVJkdB@cluster0.bmzbyjh.mongodb.net/Appispot?retryWrites=true&w=majority";
// const url = "mongodb+srv://koustavkanakapd:abcd123@cluster0.cyuge9a.mongodb.net/?retryWrites=true&w=majority"

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: "success",
    message: "Url not found",
  });
});
app.post("*", (req, res) => {
  res.status(404).json({
    status: "success",
    message: "Url not found",
  });
});

server.listen(5000, () => {
  console.log("listening on http://localhost:5000");
});

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("connection succesful");
  })
  .catch((e) => {
    console.log(e);
  });

async function addReview() {
  try {
    const review = "";
    await reviewSchema.create({
      spotId: "64494b75e51ac7214d160a13",
      // clientName: "Koustav Kanak",
      client: "641c5254c9adbd0700c986bc",
      rating: 4,
      review:
        "I recently rented this marriage hall for my daughter's wedding and I have to say, I was thoroughly impressed with the venue. The hall itself was spacious and beautifully decorated, with ample seating for all of our guests. ",
    });
  } catch (error) {
    console.log(error);
  }
}

// addReview()
