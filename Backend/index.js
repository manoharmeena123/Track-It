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
const {newtokenRouter} = require("./routes/newtoken")
app.get("/",(req,res)=>{
   console.log(req.cookies)
   res.json("Welcome")

})

app.use("/user",userRouter)

app.use(authenticate)
app.use("/",newtokenRouter)
             


//additional requirements
// app.use(authenticate)
const {clientRouter}=require("./routes/clients");
const {ProjectRouter}=require("./routes/projects");
const { taskRouter } = require("./routes/tasks");
// const {teamRouter}=require('./routes/team')


//additional routers 

app.use("/tasks",taskRouter);
app.use("/projects",ProjectRouter);
app.use("/clients",clientRouter);
// app.use("/team",teamRouter);
    
 app.listen(process.env.port,async()=>{
    try {
       await connection 
    console.log("Connected to DB")
    } catch (error) {
      console.log(error)
    }
    console.log("Server on 4500")
 })