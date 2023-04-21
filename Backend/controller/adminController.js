const AdminSchema = require("../schema/adminSchema");
const amenitySchema = require("../schema/amenitySchema");
const categorySchema = require("../schema/categorySchema");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/amenitiesCategoriesSvgs/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage})
// >> Register Admin
exports.createAdmin = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            emailId,
            password,
        } = req.body;

        const admin = await AdminSchema.create({
            firstName,
            lastName,
            emailId,
            password,
        })
        res.status(200).json({
            success: true,
            admin
        })
    } catch (error) {
        res.status(200).json({
            success: true,
            message: error.message
        })
    }
}


// >> Login Admin
exports.adminLogin = async (req, res) => {
    const { emailId, password } = req.body;

    const admin = await AdminSchema.findOne({ emailId }).select("+password");
    if (!admin) {
        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const isPasswordMatched = await admin.comparePassword(password)

    if (!isPasswordMatched) {
        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    res.status(200).json({
        success: true,
        user: "admin",
        admin
    })
}
 
exports.updateAmenities = async (req, res) => {
    try {
        const amenitiesArray = req.body.amenities;
        console.log(req.body);
        console.log(amenitiesArray);
        const amenities = await amenitySchema.insertMany(amenitiesArray);
        res.status(200).json({
            success: true,
            amenities
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateCategories = async (req, res) => {
    try {
        const categoriesArray = req.body.categories;
        const categories = await categorySchema.insertMany(categoriesArray);
        res.status(200).json({
            success: true,
            categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}