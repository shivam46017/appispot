const sellerSchema = require("../schema/sellerSchema");
const spotSchema = require("../schema/spotSchema");
const multer = require("multer");
const path = require("path");

const fs = require("fs");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const sellerId = req.params.sellerid;
      const spotImagesPath = path.join(__dirname, "../uploads", "spotImages", sellerId);
     console.log(req)
  
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
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // limit file size to 10MB
  }).fields([
    { name: "video" },
    { name: "spotImages" },
    { name: "coverImage" },
  ]);
// >> Register Admin
exports.createSeller = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            emailId,
            password,
        } = req.body;

        const Seller = await sellerSchema.create({
            firstName,
            lastName,
            emailId,
            password,
        })
        res.status(200).json({
            success: true,
            Seller
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// >> Login Seller
exports.SellerLogin = async (req, res) => {
    const { emailId, password } = req.body;

    const Seller = await sellerSchema.findOne({ emailId }).select("+password");
    console.log(Seller)
    if (!Seller) {
        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const isPasswordMatched = await Seller.comparePassword(password)

    if (!isPasswordMatched) {
        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    res.status(200).json({
        success: true,
        user: "seller",
        Seller
    })
}

//get All Seller
exports.allSeller = async (req, res) => {

    const Seller = await sellerSchema.find({}).select("-password");
    console.log(Seller)
    if (!Seller) {
        res.status(401).json({
            success: false,
            message: "No Seller found"
        })
    }

   
    res.status(200).json({
        success: true,
        user: "Seller",
        Seller
    })
   
}
//update user
exports.updateSeller = async (req, res) => {
    const {
        id,
        isActive
    } = req.body;

    const Seller = sellerSchema.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
        if (err) {
            res.status(401).json({
                success: false,
                message: err.message
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User Updated Successfully!",
                data
            })
        }
    })
}
exports.getAllSpot = async (req, res, next) => {
    try {
      const page = parseInt(req.params.page);
      const limit = 10;
  
      // const startIndex = (page - 1) * limit;
      const spots = await spotSchema.find();
  
  
      if (spots.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No spots found for this seller',
        });
      }
  
      res.status(200).json({
        success: true,
        spots,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server error',
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
        path: 'yourSpots',
        options: { skip: startIndex, limit: limit },
      });
  
      if (!seller) {
        return res.status(404).json({
          success: false,
          message: 'Seller not found',
        });
      }
  
      const spots = seller.yourSpots;
  
      if (spots.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No spots found for this seller',
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
        message: 'Server error',
      });
    }
  };


exports.createSpot = async (request, response) => {
    upload(request, response, async (err) => {
      if (err) {
        response.status(500).json({
          success: false,
          message: 'Internal Server Error!'
        });
      } else {
        const {
            Name,
            Description,
            Amenities,
            Categories,
            Location,
            Type,
            Rules,
            CancelPolicy,
            Price,
            MinGuest,
            Timing,
        } = request.body;
  
        const sellerId = request.params.sellerid;
        const basePath = path.join(__dirname, '../uploads', 'spotImages', sellerId);
  
        if (!fs.existsSync(basePath)) {
          fs.mkdirSync(basePath, { recursive: true });
        }
  
        // const coverImage = request.files[0];
        // const coverImagePath = path.join(basePath, coverImage.originalname);
        // fs.renameSync(coverImage.path, coverImagePath);
  
        // Multipart boundary not found error fix
        // const spotImages = request.files;
        // const spotImagePaths = spotImages.map(spotImage => {
        //   const spotImagePath = path.join(basePath, spotImage.originalname);
        //   fs.renameSync(spotImage.path, spotImagePath);
        //   return `/uploads/spotImages/${sellerId}/${spotImage.originalname}`;
        // });
  
        const spot = new spotSchema({
          // coverImage: `/uploads/spotImages/${sellerId}/${coverImage.originalname}`,
          coverImage: "/uploads/spotImages/643f8fa9f7a4954010835ec4/pawel-czerwinski-NuGjnnOEI-A-unsplash.jpg",
          // Images: spotImagePaths,
          Images: [
            "/uploads/spotImages/643f8fa9f7a4954010835ec4/pawel-czerwinski-NuGjnnOEI-A-unsplash.jpg",
            "/uploads/spotImages/643f8fa9f7a4954010835ec4/rafael-garcin-RTa0K1a-OjE-unsplash.jpg",
          ],
          Name,
          Description,
          Amenities,
          Categories,
          Location,
          Type,
          Rules,
          CancelPolicy,
          Price,
          MinGuest,
          Timing
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
            message: 'Seller spot updated successfully!'
          });
        } catch (err) {
          console.log(err);
          response.status(400).json({
            success: false,
            message: 'Something went wrong!'
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
            categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}