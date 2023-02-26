const express = require("express")
const app = express()
app.use(express.json())
require("dotenv").config()
const cookieParser =  require("cookie-parser");
const session = require('express-session')
app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
const cors = require("cors")
app.use(cors({
 origin:"*"
}))
const {connection} = require("./confige/confige")
const {UserModel} = require("./models/user.model")
const {authenticate} = require("./middleware/authenticate")
const {userRouter} = require("./routes/user.route")
const {authorise} = require("./middleware/authorise")
const {generateOtpRouter} = require("./routes/generateotpmail")
const {newtokenRouter} = require("./routes/newtoken");
const { taskRouter } = require("./routes/tasks");
const { ProjectRouter } = require("./routes/projects");
const { clientRouter } = require("./routes/clients");
app.get("/",(req,res)=>{
  console.log(req.cookies)
  res.json("Welcome")

})

//additional routers for frontendn starts

app.use("/tasks", taskRouter);
app.use("/projects",ProjectRouter);
app.use("/clients",clientRouter);


//additional routers for frontend ends

app.use("/user",userRouter)
//app.use(authenticate)
app.use("/",newtokenRouter)
            












app.listen(process.env.port,async()=>{
   try {
      await connection 
   console.log("Connected to DB")
   } catch (error) {
     console.log(error)
   }
   console.log(`server started @ http://localhost:${process.env.port}`)
})