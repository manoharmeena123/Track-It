const express = require("express")
const bcrypt = require("bcrypt")
const { UserModel } = require("../models/user.model")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
const cookieparser = require("cookie-parser")
userRouter.use(cookieparser())
const { mail } = require("./generateotpmail")



userRouter.post("/otp", mail, async (req, res) => {
    //   OTP will be send from this endpoint
});



//Register===================================================================>


userRouter.post("/register", async (req, res) => {
    const { email, password, otp } = req.body
    const user = await UserModel.find({ "email": email });

    if (user.length == 1) {
        res.send("Already exist, Please login");
    } else {
        try {
            bcrypt.hash(password, 5, async (err, hash) => {
                const user = new UserModel({ email, password: hash })
                await user.save()
                res.send({ "msg": "User Signup Successful", "response": "ok" })
            })
        } catch (error) {
            res.send("Error in Signup")
        }
    }
});






//Login====================================================================>

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })

        if (user) {
            const hashed_pass = user.password
            bcrypt.compare(password, hashed_pass, (err, result) => {
                if (result) {

                    const token = jwt.sign({ "userId": user._id }, 'masai', { expiresIn: "1d" })
                    const refreshtoken = jwt.sign({ "userId": user._id }, 'kasai', { expiresIn: "7d" })
                    res.cookie("token", token, { httpOnly: true, maxAge: 1000000 }).cookie("refreshtoken", refreshtoken, { httpOnly: true, maxAge: 1000000 })
                    res.send({ "msg": "Login Successful", "token": token, "refreshtoken": refreshtoken })

                } else {
                    res.send({ "msg": "Wrong Credentials" })
                }
            })
        } else {
            res.send({ "msg": "Result Not Correct" })
        }
    } catch (error) {
        res.send({ "msg": "Login failed" })
    }
})



module.exports = { userRouter };