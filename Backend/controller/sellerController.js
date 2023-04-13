const sellerSchema = require("../schema/sellerSchema");
const spotSchema = require("../schema/spotSchema");
const multer = require("multer");
const Storage = multer.diskStorage({
    destination: "uploads/spotImages/",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  })
  
  const upload = multer({
    storage: Storage
  }).fields([
    { name: "video" },
    { name: "spotImages" },
    { name: "coverImage" }
  ])
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
        Seller.status(401).json({
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

    const Seller = await sellerSchema.find({  })
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
exports.createSpot = async (request, response) => {
    upload(request, response, async (err) => {
      if (err) {
        response.status(500).json({
          success: false,
          message: "Internal Server Error!"
        })
      } else {
        try {
            const {  
                createdAt,
                coverImage,
                spotImages,
                spotName,
                spotDescribtion,
                spotAmenities,
                spotCategory,
                spotLocation,
                spotType,
                spotRules,
                spotCancel,
                spotPrice,
                spotMinGuest,
                spotTiming
             } = request.body;
                
        const bannerImagePath ='/uploads/spotImages/'+ request.body.sellerId+"_"+  request.files.coverImage[0].originalname;
        console.log(request.files.coverImage[0].originalname)
      
        const spot = {
            createdAt,
                coverImage:bannerImagePath,
                spotImages,
                spotName,
                spotDescribtion,
                spotAmenities,
                spotCategory,
                spotLocation,
                spotType,
                spotRules,
                spotCancel,
                spotPrice,
                spotMinGuest,
                spotTiming
      
        }
            console.log({ spot: spot })
            const student = await sellerSchema.findOneAndUpdate(
                { _id: request.body.sellerId },
                { $push: { spotList: spot } },
                { new: true }
            )
            response.status(200).json({
                success: true,
                student,
                message: "seller spot Update successfully!"
            })
        } catch (err) {
            response.status(400).json({
                success: false,
                message: "Something Went Wrong!"
            })
        }  
    }
    })
  };