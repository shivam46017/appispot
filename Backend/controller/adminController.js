const AdminSchema = require("../schema/adminSchema");
const multer = require("multer");
// import categorySchema from "../schema/categorySchema";
const categorySchema = require("../schema/categorySchema");
// import amenitySchema from "../schema/amenitySchema";
const amenitySchema = require("../schema/amenitySchema");
const path = require("path");

const jwt = require('jsonwebtoken')

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
    const { firstName, lastName, email, password } = req.body;

    const admin = await AdminSchema.create({
      firstName,
      lastName,
      email,
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

  // login using the token if token is there
  const authHeader = req.headers.authorization

  if(authHeader) {
    const token = authHeader.split(' ')[1]

    const isTokenValid = jwt.verify(token, process.env.JWT_SECRET)

    if(isTokenValid) {
      const admin = await AdminSchema.findById(isTokenValid._id)
      return res.json({
        success: true,
        admin,
        token: jwt.sign(admin._doc, process.env.JWT_SECRET, { expiresIn: '1h' }) // generate a new token for admin to set on client side
      })
    }
    
  }
  
  const { email, password } = req.body;

  const admin = await AdminSchema.findOne({ email }).select("+password")
  if (!admin) {
   return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isPasswordMatched = await admin.comparePassword(password);

  if (!isPasswordMatched) {
   return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const jwtToken = jwt.sign(admin._doc, process.env.JWT_SECRET, { expiresIn: '1h' })

  res.status(200).json({
    success: true,
    user: "admin",
    token: jwtToken,
    admin,
  });
};
exports.updateAmenities = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        throw new Error(err);
      }

      const amenities = req.files["amenityIcon"];
      console.log(amenities[0].originalname);
      const basePath = path.join(
        __dirname,
        "../uploads",
        "Amenities_categories"
      );

      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      const amenity = await amenitySchema.create({
        amenityId: req.body.amenityId,
        amenityName: req.body.amenityName,
        amenityIcon:
          `/uploads/Amenities_categories/` + amenities[0].originalname,
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
  try {
    upload(req, res, async (err) => {
      if (err) {
        throw new Error(err);
      }

      const categories = req.files["categoryIcon"];
      console.log(categories[0].originalname);
      const basePath = path.join(
        __dirname,
        "../uploads",
        "Amenities_categories"
      );

      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      const category = await categorySchema.create({
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
        categoryIcon:
          `/uploads/Amenities_categories/` + categories[0].originalname,
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

exports.getAllCategory = async (req, res) => {
  try {
    const category = await categorySchema.find();
    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category found successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllAmenities = async (req, res) => {
  try {
    const amenities = await amenitySchema.find();
    if (!amenities) {
      res.status(404).json({
        success: false,
        message: "Amenities not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Amenities found successfully",
      amenities,
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
};

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
};

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
};

exports.removeReview = async (req, res) => {
  try {
    const review = await reviewSchema.findById(req.params.id);
    if (!review) {
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
};
