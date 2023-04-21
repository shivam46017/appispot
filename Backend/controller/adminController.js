const AdminSchema = require("../schema/adminSchema");
const multer = require("multer");
const path = require("path");
const amenitySchema = require("../schema/amenitySchema");
const categorySchema = require("../schema/categorySchema");

const fs = require("fs");
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
}).fields([{ name: "amenities" }, { name: "categories" }]); // >> Register Admin


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
    try {
      const { amenities } = req.body;
      console.log(amenities)
      const basePath = path.join(__dirname, '../uploads', 'Amenities_categories');
  
      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }
  
      const amenityArray = [];
      for (let amenity of amenities) {
        console.log(amenity)
        const { amenityId, amenityName, amenityIcon } = amenity;
        const amenityIconPath = path.join(basePath, amenityIcon.originalname);
        fs.renameSync(amenityIcon.path, amenityIconPath);
  
        const newAmenity = await amenitySchema.create({
          amenityId,
          amenityName,
          amenityIconPath: `/uploads/Amenities_categories/` + amenityIcon.originalname,
        });
  
        amenityArray.push(newAmenity);
      }
  
      res.status(200).json({
        success: true,
        amenities: amenityArray,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// exports.updateCategories = async (req, res) => {
//     try {
//       const { categories } = req.body;
//       console.log(categories)
//       const basePath = path.join(__dirname, '../uploads', 'Amenities_categories');
  
//       if (!fs.existsSync(basePath)) {
//         fs.mkdirSync(basePath, { recursive: true });
//       }
  
//       const categoryArray = [];
//       for (let category of categories) {
//         console.log(category)
//         const { categoryId, categoryName, categoryIcon } = category;
//         const categoryIconPath = path.join(basePath, categoryIcon.originalname);
//         fs.renameSync(categoryIcon.path, categoryIconPath);
  
//         const newCategory = await categorySchema.create({
//           categoryId,
//           categoryName,
//           categoryIconPath: `/uploads/Amenities_categories/` + categoryIcon.originalname,
//         });
  
//         categoryArray.push(newCategory);
//       }
  
//       res.status(200).json({
//         success: true,
//         categories: categoryArray,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };



exports.updateCategories = async (req, res) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          throw new Error(err);
        }
  
        const categories = req.files['categories'];
        const basePath = path.join(__dirname, '../uploads', 'Amenities_categories');
  
        if (!fs.existsSync(basePath)) {
          fs.mkdirSync(basePath, { recursive: true });
        }
  
        const categoryArray = [];
        for (let category of categories) {
            console.log(category)

          const iconPath = path.join(basePath, category.originalname);
          fs.renameSync(category.path, iconPath);
  
          const newCategory = await categorySchema.create({
            categoryId,
            categoryName,
            categoryIconPath: `/uploads/Amenities_categories/${category.originalname}`,
          });
  
          categoryArray.push(newCategory);
        }
  
        res.status(200).json({
          success: true,
          categories: categoryArray,
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  