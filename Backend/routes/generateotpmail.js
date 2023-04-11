const nodemailer = require("nodemailer")
const { UserModel } = require("../models/user.model")



function generate() {
    return Math.floor(1000 + Math.random() * 9000)
}

const mail = async (req, res, next) => {
    try {

        const users = await UserModel.find({ email: req.body.email });
        if (users.length == 1) {
            res.json({ "msg": "User already present" });
            return;
        }

        const OTP = generate();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'manoharmeena245@gmail.com',
                pass: 'wwqvftbyxzotbchw'
            }
        });


        await transporter.sendMail({
            to: req.body.email,
            from: "manoharmeena245@gmail.com",
            subject: "One-Time_Password Verification !",
            text: `OTP Vefification ${OTP}`
        });

        res.json(OTP);
        next();
    } catch (error) {
        res.json("OTP Not Generated!");
    }
};


module.exports = {
    mail
}
