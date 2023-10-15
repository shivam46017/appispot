const { createBanner,getAllbanner,deleteBannerID} = require("../controller/bannerController");

let router = require("express").Router();


router.post("/add-banner", createBanner);

router.get("/get-allbanner", getAllbanner);


router.delete("/delete-bannerbyId/:id", deleteBannerID);
module.exports = router;