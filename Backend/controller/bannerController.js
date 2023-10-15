const bannerSchema = require("../schema/bannerSchema");
const multer = require("multer");
const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  })
  
  const upload = multer({
    storage: Storage
  }).fields([
    { name: "video" },
    { name: "coverImage" }
  ])
  exports.createBanner = async (request, response) => {
    upload(request, response, (err) => {
      if (err) {
        response.status(500).json({
          success: false,
          message: "Internal Server Error!"
        })
      } else {
        const { 
            createdAt, 
            coverImage,
        } = request.body;
  
        // const bannerImagePath = request.files.coverImage[0].path;
        const bannerImagePath ='/uploads/' +  request.files.coverImage[0].originalname;
        console.log(request.files.coverImage[0].originalname)
      
  
        const data = {
            createdAt,
         coverImage: bannerImagePath,
      
        }
  
        const banner = new bannerSchema(data)
        banner.save()
          .then(() => {
            response.status(200).json({
                banner,
              success: true,
              message: "Quiz created successfully!"
             
            })
            console.log(data);
          })
          .catch((error) => {
            response.status(200).json({
              success: true,
              message: error.message
            })
          })
      }
    })
  };
  exports.getAllbanner = async (req, res) => {

    const banner = await bannerSchema.find({  })
    console.log(banner)
    if (!banner) {
        res.status(401).json({
            success: false,
            message: "No banner found"
        })
    }

    res.status(200).json({
        success: true,
        banner
    })
   
}
exports.deleteBannerID = async (req, res) => {

  const banner = await bannerSchema.deleteOne({ "_id":req.params.id })
  console.log(banner)
  if (!banner) {
      res.status(401).json({
          success: false,
          message: "No banner found"
      })
  }

 
  res.status(200).json({
      success: true,
      
      message: "Banner Deleted"
  })
 
}