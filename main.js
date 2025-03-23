import e from "express";
import signupRouter from "./routes/signup.js"
import loginRouter from "./routes/login.js" 
import userRouter from "./routes/user.js"
import blogRouter from "./routes/blogs.js" 
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"

// Load environment variables
dotenv.config();
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URI).then(()=> console.log("connected")).catch((err)=>console.log("DB not connected"))
const app = e()

// Set EJS as view engine
app.set('view engine', 'ejs')
app.use(e.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/signup",signupRouter)
app.use("/login",loginRouter)
app.use("/user",userRouter)
app.use("/blogs",blogRouter)

app.get("/",(req, res)=>{
    res.render('index')
})


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})