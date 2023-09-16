const AdminSchema = require("../schema/adminSchema");
const multer = require("multer");
// import categorySchema from "../schema/categorySchema";
const categorySchema = require("../schema/categorySchema");
// import amenitySchema from "../schema/amenitySchema";
const amenitySchema = require("../schema/amenitySchema");
const spotSchema = require("../schema/spotSchema");
const path = require("path");
const { json } = require("body-parser");
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

const jwt = require("jsonwebtoken");

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
  try {
    // login using the token if token is there
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      const isTokenValid = jwt.verify(token, process.env.JWT_SECRET);

      if (isTokenValid) {
        const admin = await AdminSchema.findById(isTokenValid._id);
        return res.json({
          success: true,
          admin,
          token: jwt.sign(admin._doc, process.env.JWT_SECRET, {
            expiresIn: "1w",
          }), // generate a new token for admin to set on client side
        });
      }
    }

    const { email, password } = req.body;

    const admin = await AdminSchema.findOne({ email }).select("+password");
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

    const jwtToken = jwt.sign(admin._doc, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });

    res.status(200).json({
      success: true,
      user: "admin",
      token: jwtToken,
      admin,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
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

exports.getAllSpot = async (req, res, next) => {
  try {
    let pageSize = 10;
    const { amenity, spotType, category, city, date, guests, area, host, page } =
      req.query ?? null;
    console.log(amenity, spotType, category, city, date, guests, area);

    if (amenity || category || spotType || city || date || guests || area, host) {
      let conditions = [];

      if (amenity)
        conditions.push(
          Array.isArray(amenity)
            ? { Amenities: { $elemMatch: { _id: { $in: amenity } } } }
            : { Amenities: { $elemMatch: { _id: amenity } } }
        );
      if (category)
        conditions.push(
          Array.isArray(category)
            ? {
                Categories: { $elemMatch: { categoryName: { $in: category } } },
              }
            : { Categories: { $elemMatch: { categoryName: category } } }
        );
      if (spotType)
        conditions.push(
          Array.isArray(spotType)
            ? { Type: { $in: spotType } }
            : { Type: spotType }
        );
      if (city)
        conditions.push(
          Array.isArray(city) ? { Location: { $in: city } } : { Location: city }
        );
      if (date)
        conditions.push(
          Array.isArray(date)
            ? {
                BlockedTimings: {
                  $not: { $elemMatch: { date: { $in: date } } },
                },
              }
            : { BlockedTimings: { $not: { $elemMatch: { date } } } }
        );
      if (guests) conditions.push({ guests: { $lte: guests } });
      if (area)
        conditions.push({
          SqFt: { $lt: Number(area[1]), $gt: Number(area[0]) },
        });

      if (host) {
        conditions.push({
          lister: host
        })
      }

      const spots = await spotSchema
        .find({ $and: conditions })
        .populate("Amenities")
        .populate("Categories")
        .exec();

      return res.status(200).json({
        success: true,
        spots,
      });
    } else {
      const spots = await spotSchema
        .find()
        .populate("Amenities")
        .populate("Categories")
        .exec();  
      console.log(spots, "$$amenities");

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

exports.updateSpot = async (request, response) => {
  try {
    const { id } = request.params;
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
          type,
          SpotRules,
          CancelPolicy,
          Price,
          guests,
          Timing,
          lister,
          SqFt,
          isApproved
        } = request.body ?? null;

        const spot = await spotSchema.findById(id);
        console.log(spot);
        if (!spot)
          return res.status(404).json({
            success: false,
            message: "There is no spot in our records",
          });

        const basePath = path.join(
          __dirname,
          "../uploads",
          "spotImages",
          spot.lister._id.toString()
        );

        if (!fs.existsSync(basePath)) {
          fs.mkdirSync(basePath, { recursive: true });
        }
        console.log("REQ: ", request.files);

        let coverImage;
        if (request.files) {
          coverImage = request.files["coverImage"][0];
          var coverImagePath = path.join(basePath, coverImage.originalname);
          fs.renameSync(coverImage.path, coverImagePath);

          var spotImages = request.files["spotImages"];
          var spotImagePaths = spotImages.map((spotImage) => {
            var spotImagePath = path.join(basePath, spotImage.originalname);
            return `/uploads/spotImages/${spot.lister._id.toString()}/${
              spotImage.originalname
            }`;
          });
        }

        const participants = {
          coverImage:
            spot.lister._id.toString() && coverImage
              ? `/uploads/spotImages/${spot.lister._id.toString()}/${
                  coverImage.originalname
                }`
              : null,
          Images: spotImagePaths,
          Name,
          Description,
          Amenities,
          Categories,
          Location,
          Type: type,
          Rules: SpotRules,
          CancelPolicy,
          Price,
          guests,
          Timing,
          lister,
          SqFt,
          isApproved
        };

        const eligibleParticipants = () => {
          let filteredObj = {};
          for (const key in participants) {
            if (participants[key] !== null || participants[key] !== undefined) {
              filteredObj[key] = participants[key];
            }
          }
          return filteredObj;
        };

        const updateVars = eligibleParticipants();

        const updatedSpot = await spotSchema.findByIdAndUpdate(id, updateVars, { new: true });

        response.status(200).json({
          success: true,
          message: "Spot updated successfully",
          spot: updatedSpot,
        });
      }
    });
  } catch (err) {
    console.log(err);
    response.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

exports.deleteSpot = async (request, response) => {
  try {

    const { id } = request.params;

    const spot = await spotSchema.findByIdAndDelete(id)

    if (!spot) {
      return response.status(400).json({
        success: false,
        message: "Failed to delete"
      })
    }

    response
    .status(200)
    .json({
      success: true,
      message: "Successfully deleted spot",
      spot
    })

    } catch (err) {
    console.log(err);
    response.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
