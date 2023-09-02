const sellerSchema = require("../schema/sellerSchema");
const spotSchema = require("../schema/spotSchema");
const multer = require("multer");
const path = require("path");

const fs = require("fs");
const reviewSchema = require("../schema/reviewSchema");
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const sellerId = req.params.sellerid;
    const spotImagesPath = path.join(
      __dirname,
      "../uploads",
      "spotImages",
      sellerId
    );
    //  console.log(req)

    // Create a folder with UID name if it doesn't exist
    if (!fs.existsSync(spotImagesPath)) {
      fs.mkdirSync(spotImagesPath, { recursive: true });
    }

    cb(null, spotImagesPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// const upload = multer({
//   storage: storage,
// }).fields([{ name: "video" }, { name: "spotImages" }, { name: "coverImage" }]);

// const Storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

const upload = multer({
  storage: Storage,
}).fields([{ name: "spotImages" }, { name: "coverImage" }]);

// >> Register Admin
exports.createSeller = async (req, res) => {
  try {
    console.log("Creating seller");
    const { firstName, lastName, emailId, password } = req.body;

    const Seller = await sellerSchema.create({
      firstName,
      lastName,
      emailId,
      password,
    });
    res.status(200).json({
      success: true,
      Seller,
    });
  } catch (error) {
    console.log("Some Error occurred");
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// >> Login Seller
exports.SellerLogin = async (req, res) => {
  console.log("Logging");
  const { emailId, password } = req.body;

  const Seller = await sellerSchema.findOne({ emailId }).select("+password");
  if (!Seller) {
    console.log("No seller exists");
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const isPasswordMatched = await Seller.comparePassword(password);
  if (!isPasswordMatched) {
    console.log("Password didn;t match");
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } else {
    console.log("Successful");
    res.status(200).json({
      success: true,
      user: "seller",
      Seller,
    });
  }
};

//get All Seller
exports.allSeller = async (req, res) => {
  const Seller = await sellerSchema.find({}).select("-password");
  console.log(Seller);
  if (!Seller) {
    res.status(401).json({
      success: false,
      message: "No Seller found",
    });
  }

  res.status(200).json({
    success: true,
    user: "Seller",
    Seller,
  });
};

//update user
exports.updateSeller = async (req, res) => {
  const { id, isActive } = req.body;

  const Seller = sellerSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    function (err, data) {
      if (err) {
        res.status(401).json({
          success: false,
          message: err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "User Updated Successfully!",
          data,
        });
      }
    }
  );
};

exports.getAllSpot = async (req, res, next) => {
  try {
    const { amenity, spotType, category, city, date, guests } = req.query ?? null
    console.log(amenity, spotType, category, city, date, guests)

    if (amenity || category || spotType || city || date || guests) {
      let conditions = []

      if (amenity) conditions.push(Array.isArray(amenity) ? { Amenities: { $elemMatch: { _id: { $in: amenity } } } } : { Amenities: { $elemMatch: { _id: amenity } } })
      if (category) conditions.push(Array.isArray(category) ? { Categories: { $elemMatch: { _id: { $in: category} } } } : { Categories: { $elemMatch: { categoryName: category } } })
      if (spotType) conditions.push(Array.isArray(spotType) ? { Type: { $in: spotType } } : { Type: spotType })
      if (city) conditions.push(Array.isArray(city) ? { Location: { $in: city } } : { Location: city })
      if (date) conditions.push(Array.isArray(date) ? { BlockedTimings: { $not: { $elemMatch: { date: { $in: date } } } } } : { BlockedTimings: { $not: { $elemMatch: { date } } } })
      if (guests) conditions.push({ MinGuest: { $lte: guests } })

      const spots = await spotSchema.find({ $and: conditions })

      return res.status(200).json({
        success: true,
        spots
      })
    } else {

      const spots = await spotSchema.find()

      if (spots.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No spots found",
        });
      }

      res.status(200).json({
        success: true,
        spots,
      });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getSpot = async (req, res, next) => {
  try {
    const sellerId = req.params.sellerid;
    const page = parseInt(req.params.page);
    const limit = 10;

    const startIndex = (page - 1) * limit;
    const seller = await sellerSchema.findById(sellerId).populate({
      path: "yourSpots",
      options: { skip: startIndex, limit: limit },
    });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    const spots = seller.yourSpots;

    if (spots.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No spots found for this seller",
      });
    }

    res.status(200).json({
      success: true,
      yourSpots: spots,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.createSpot = async (request, response) => {
  console.log("REQ: ", request.body);
  upload(request, response, async (err) => {
    if (err) {
      console.log(err);
      console.log("REQ: ", request.body);
      console.log(request.files);
      response.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    } else {
      const {
        Name,
        Description,
        Amenities,
        Categories,
        Location,
        Type,
        SpotRules,
        CancelPolicy,
        Price,
        MinGuest,
        Timing,
        lister,
      } = request.body;

      const sellerId = request.params.sellerid;
      const basePath = path.join(
        __dirname,
        "../uploads",
        "spotImages",
        sellerId
      );

      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }
      console.log("REQ: ", request.files);
      const coverImage = request.files["coverImage"][0];
      const coverImagePath = path.join(basePath, coverImage.originalname);
      fs.renameSync(coverImage.path, coverImagePath);

      const spotImages = request.files["spotImages"];
      const spotImagePaths = spotImages.map((spotImage) => {
        const spotImagePath = path.join(basePath, spotImage.originalname);
        return `/uploads/spotImages/${sellerId}/${spotImage.originalname}`;
      });

      const spot = new spotSchema({
        coverImage: `/uploads/spotImages/${sellerId}/${coverImage.originalname}`,
        Images: spotImagePaths,
        Name,
        Description,
        Amenities: JSON.parse(Amenities),
        Categories: JSON.parse(Categories),
        Location,
        Type,
        Rules: SpotRules,
        CancelPolicy,
        Price,
        MinGuest,
        Timing: JSON.parse(Timing),
        lister,
      });

      try {
        const savedSpot = await spot.save();
        const seller = await sellerSchema.findOneAndUpdate(
          { _id: sellerId },
          { $push: { yourSpots: savedSpot._id } },
          { new: true }
        );

        response.status(200).json({
          success: true,
          seller,
          message: "Seller spot updated successfully!",
        });
      } catch (err) {
        console.log(err);
        response.status(400).json({
          success: false,
          message: "Something went wrong!",
        });
      }
    }
  });
};

exports.getAmenitiesAndCategories = async (req, res) => {
  try {
    const amenities = await amenitySchema.find({});
    const categories = await categorySchema.find({});
    res.status(200).json({
      success: true,
      amenities,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSpotID = async (req, res) => {
  try {
    const spot = await spotSchema.findById(req.params.id);
    const reviews = await reviewSchema.find({ spotId: req.params.id });
    res.status(200).json({
      success: true,
      spot,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSellerOrderedSpots = async (req, res) => {
  try {
    const seller = await sellerSchema.findById(req.params.id);

    // const spots = await spotSchema.find({ _id: { $in: seller.yourSpots } });
    // Also checking if the spot booked date is greater than today's date
    // const spots = await spotSchema.fnd({ _id: { $in: seller.yourSpots }, "bookedDates.date": { $gte: new Date() } });
    // Booked spots will be in Orders schema not in spot schema
    // Spot schema has spotId, we'll have to check if the spot id in orders is in sellers yourSpots array and also, if ordered date is greater than today's date
    const spots = await spotSchema.find({ _id: { $in: seller.yourSpots } });
    const orders = await orderSchema.find({
      spotId: { $in: seller.yourSpots },
    });
    const filteredSpots = spots.filter((spot) => {
      const order = orders.find(
        (order) => order.spotId.toString() === spot._id.toString()
      );
      if (order) {
        return order.bookedDates.find((date) => date.date >= new Date());
      } else {
        return false;
      }
    });

    res.status(200).json({
      success: true,
      filteredSpots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMySpots = async (req, res) => {
  try {
    const seller = await sellerSchema.findById(req.params.sellerid);
    const spots = await spotSchema.find({ _id: { $in: seller.yourSpots } });
    res.status(200).json({
      success: true,
      spots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const seller = await sellerSchema.findById(req.params.sellerid);
    const orders = await orderSchema.find({
      spotId: { $in: seller.yourSpots },
    });
    const filteredOrders = orders.filter((order) => {
      return order.bookedDates.find((date) => date.date >= new Date());
    });

    res.status(200).json({
      success: true,
      filteredOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
