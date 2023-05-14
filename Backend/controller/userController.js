const orderSchema = require("../schema/orderSchema");
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

    let user = [...await userSchema.find()]
    console.log(user)
    if (!user) {
        res.status(401).json({
            success: false,
            message: "No users found"
        })
    }

    // Adding total spots booked and current bbokings to each user object in user list
    for (let i = 0; i < user.length; i++) {
        // const totalSpotsBooked = await orderSchema.find({ client: user[i]._id }).countDocuments()
        // const currentBookings = await orderSchema.find({ client: user[i]._id, status: "Booked" }).countDocuments()
        // Keeping the values random
        user[i].totalBookings = Math.floor(Math.random() * 10)
        user[i].currentBookings = ["Apex Mall", "City Center", "Forum Mall", "Mani Square"][Math.floor(Math.random() * 4)]
    }
    console.log(user)
   
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

exports.getNotifications = async (req, res) => {
    console.log("Notif reqs", req.query)
    const user = await userSchema.findById(req.query.id)
    console.log(user)
    if (!user) {
        res.status(401).json({
            success: false,
            message: "No user found"
        })
    }

    res.status(200).json({
        success: true,
        message: "Notifications fetched successfully",
        notifications: user.notifications
    })
}