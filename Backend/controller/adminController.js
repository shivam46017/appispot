const AdminSchema = require("../schema/adminSchema");
const multer = require("multer");
// import categorySchema from "../schema/categorySchema";
const categorySchema = require("../schema/categorySchema");
// import amenitySchema from "../schema/amenitySchema";
const amenitySchema = require("../schema/amenitySchema");
const path = require("path");

const fs = require("fs");
const orderSchema = require("../schema/orderSchema");
const reviewSchema = require("../schema/reviewSchema");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const svgPath = path.join(__dirname, "../uploads", "Amenities_categories");
    console.log(req);

    // Create a folder with UID name if it doesn't exist
    if (!fs.existsSync(svgPath)) {
      fs.mkdirSync(svgPath, { recursive: true });
    }

    cb(null, svgPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).fields([{ name: "amenityIcon" }, { name: "categoryIcon" }]); // >> Register Admin


exports.createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    const admin = await AdminSchema.create({
      firstName,
      lastName,
      emailId,
      password,
    });
    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: error.message,
    });
  }
};

// >> Login Admin
exports.adminLogin = async (req, res) => {
  const { emailId, password } = req.body;

  const admin = await AdminSchema.findOne({ emailId }).select("+password");
  if (!admin) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isPasswordMatched = await admin.comparePassword(password);

  if (!isPasswordMatched) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  res.status(200).json({
    success: true,
    user: "admin",
    admin,
  });
};
exports.updateAmenities = async (req, res) => {
  // const defaultIcon = "/Icons/AmminitiesIcons/Deck.svg"
  try {
    upload(req, res, async (err) => {
      if (err) {
        throw new Error(err);
      }

      const amenities = req.files['amenityIcon'];
      console.log(amenities[0].originalname);
      const basePath = path.join(__dirname, '../uploads', 'Amenities_categories');

      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }
      
      const amenity = await amenitySchema.create({
        amenityId: req.body.amenityId,
        amenityName: req.body.amenityName,
        amenityIcon: `/uploads/Amenities_categories/` + amenities[0].originalname,
        // amenityIcon: defaultIcon,
      });

      res.status(200).json({
        success: true,
        amenities: amenity,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCategories = async (req, res) => {
    console.log(req.body)
    try {
      upload(req, res, async (err) => {
        if (err) {
          throw new Error(err);
        }
  
        const categories = req.files['categoryIcon'];
        const basePath = path.join(__dirname, '../uploads', 'Amenities_categories');
  
        if (!fs.existsSync(basePath)) {
          fs.mkdirSync(basePath, { recursive: true });
        }
        
        const category = await categorySchema.create({
          categoryId: req.body.categoryId,
          categoryName: req.body.categoryName,
          categoryIcon: `/uploads/Amenities_categories/` + categories[0].originalname,
          // categoryIcon: "/Icons/CategoriesIcons/Wedding.svg",
        });

        res.status(200).json({
          success: true,
          categories: category,
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  exports.deleteCategory = async (req, res) => {
    try {
      const category = await categorySchema.findById(req.params.id);
      if (!category) {
        res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
      await category.remove();
      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  exports.deleteAmenities = async (req, res) => {
    try {
      const amenity = await amenitySchema.findById(req.params.id);
      if (!amenity) {
        res.status(404).json({
          success: false,
          message: "Amenity not found",
        });
      }
      await amenity.remove();
      res.status(200).json({
        success: true,
        message: "Amenity deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  exports.getOrders = async (req, res) => {
    try {
      const orders = await orderSchema.find();
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  exports.getReviews = async (req, res) => {
    try {
      const reviews = await reviewSchema.find();
      res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  exports.removeReview = async (req, res) => {
    try{
      const review = await reviewSchema.findById(req.params.id);
      if(!review){
        res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }
      await review.remove();
      res.status(200).json({
        success: true,
        message: "Review deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }

  }