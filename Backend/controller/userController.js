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
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// >> Login Admin
exports.userLogin = async (req, res) => {
    const { emailId, password } = req.body;

    const user = await userSchema.findOne({ emailId }).select("+password");
    console.log(user)
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

//get All users
exports.allUsers = async (req, res) => {

    const user = await userSchema.find({  })
    console.log(user)
    if (!user) {
        res.status(401).json({
            success: false,
            message: "No users found"
        })
    }

   
    res.status(200).json({
        success: true,
        user: "user",
        user
    })
   
}
//update user
exports.updateUser = async (req, res) => {
    const {
        id,
        isActive
    } = req.body;

    const user = userSchema.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
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
