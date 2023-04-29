export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
        res.status(401).json({
            success: false,
            message: "You are not authorized to access this route",
        });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userSchema.findById(decoded.id);
        if (!user) {
        res.status(404).json({
            success: false,
            message: "No user found with this id",
        });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
    }