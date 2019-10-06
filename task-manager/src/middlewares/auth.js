var jwt = require("jsonwebtoken");
var User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, "mr.jonty");
    const user = await User.findById({
      _id: decode._id,
      "tokens.token": token
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Plz Authenticate!");
  }
};

module.exports = auth;
