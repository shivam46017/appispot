const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization)
      return res
        .status(401)
        .json({ success: false, message: "Not authorized to access" });
    const token = authorization.split(' ')[1]
    const { role, id } = jwt.verify(token, process.env.JWT_SECRET);

    req.role = role;
    req.id = id;
    next()
  } catch (err) {
    console.log(err);
  }
};

module.exports = auth;
