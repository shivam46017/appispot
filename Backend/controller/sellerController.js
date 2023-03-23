const sellerSchema = require("../schema/sellerSchema");

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
        user: "user",
        Seller
    })
   
}
//update user
exports.updateSeller = async (req, res) => {
    const {
        id,
        isActive
    } = req.body;

    const Seller = userSchema.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
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
