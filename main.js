import e from "express";
import signupRouter from "./routes/signup.js"
import loginRouter from "./routes/login.js" 
import userRouter from "./routes/user.js"
import blogRouter from "./routes/blogs.js" 
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import session from "express-session";
const app = e()
app.use(session({                                                                                 //Step -2
    secret: "dddsddswf23r344f3f",
    resave: false,
    saveUninitialized: true
}));
// Load environment variables
dotenv.config();
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URI).then(()=> console.log("connected")).catch((err)=>console.log("DB not connected"))

app.use((req, res, next) => {
    res.locals.session = req.session;  // Make session available globally in EJS
    next();
});
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

app.get("/logout", (req, res) => {
    req.session.destroy(err => {                                                                //Step - 4
        if (err) {
            return res.send("Error logging out");
        }
        res.redirect("/login"); // Redirect to home page after logout
    });
});
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})