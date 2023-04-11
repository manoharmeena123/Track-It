const express = require("express")
const jwt = require("jsonwebtoken")
const newtokenRouter = express.Router()


//NEWToken =====================================================================================>

newtokenRouter.post("/newtoken", async (req, res) => {
    const refreshtoken = req.cookies.refreshtoken
    if (refreshtoken) {
        const decode = jwt.verify(refreshtoken, 'kasai')
        const token = jwt.sign({ "userID": decode.userID, role: decode.role }, 'kasai', { expiresIn: "1h" })
        res.cookie("token", token, { httpOnly: true, maxAge: 1000000 }).cookie("refreshtoken", refreshtoken, { httpOnly: true, maxAge: 1000000 })
        res.json({ "msg": "New Token Generated", "token": token })
    } else {
        res.json({ "msg": "Invalid refresh Token " })
    }
})

module.exports = {
    newtokenRouter
} 
