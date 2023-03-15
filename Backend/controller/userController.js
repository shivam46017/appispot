const userSchema = require("../schema/userSchema");

// >> Register Admin
exports.createUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            emailId,
            password,
        } = req.body;

        const user = await userSchema.create({
            firstName,
            lastName,
            emailId,
            password,
        })
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(200).json({
            success: true,
            message: error.message
        })
    }
}

// >> Login Admin
exports.userLogin = async (req, res) => {
    const { emailId, password } = req.body;

    const user = await userSchema.findOne({ emailId }).select("+password");
    if (!user) {
        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    res.status(200).json({
        success: true,
        user: "user",
        user
    })
}

