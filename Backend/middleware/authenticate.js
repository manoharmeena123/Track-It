const jwt = require("jsonwebtoken");


//redis===========>
const { client } = require("../service/redis")


const authenticate = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization
  const black_token = await client.LRANGE("blacktoken", 0, -1)
  if (black_token.includes(token)) {
    res.send("Login again")
  } else {
    if (token) {
      const decoded = jwt.verify(token, "masai");
      if (decoded) {
        const userId = decoded.userId
        req.body.userId = userId
        next();
      } else {
        res.send("Please Login");
      }
    } else {
      res.send("Please Login");
    }
  }
};


module.exports = {
  authenticate
};
