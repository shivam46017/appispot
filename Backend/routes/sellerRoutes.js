const { SellerLogin, createSeller, updateSeller, allSeller, createSpot, getSpot, getAllSpot, getAmenitiesAndCategories, getSpotID, getMyBookings } = require("../controller/sellerController");
const multer = require('multer');
let router = require("express").Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const sellerId = req.params.sellerid;
      const basePath = path.join(__dirname, "../uploads", "spotImages", sellerId);
      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }
      cb(null, basePath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  // Set up multer with the storage configuration
  const upload = multer({ storage: storage });

router.post("/seller-login", SellerLogin);
router.post("/seller-signup", createSeller);

router.put("/seller-update/:id", updateSeller);
router.get("/getAllSellers", allSeller);

router.get("getAmenitiesAndCategories", getAmenitiesAndCategories)

router.get("getAmenitiesAndCategories", getAmenitiesAndCategories)

router.get("/getspots/:sellerid/:page", getSpot);
router.get("/getallspots", getAllSpot);
router.get("/getspot/:id", getSpotID);

router.get("/getMySpots/:sellerid", getSpot)
router.get("/getMyBookings/:sellerid", getMyBookings)


router.post("/createspot/:sellerid", upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'spotImages', maxCount: 15 },
  ]), createSpot);

module.exports = router;