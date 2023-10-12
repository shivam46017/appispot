const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Not authorized to access" });

    const { role, id } = jwt.verify(token, process.env.JWT_SECRET);

    req.role = role;
    req.id = id;
    next()
  } catch (err) {
    console.log(err);
  }
};

module.exports = auth;
