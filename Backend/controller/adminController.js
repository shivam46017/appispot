const AdminSchema = require("../schema/adminSchema");

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

