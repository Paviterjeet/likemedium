import e from "express";
import signupRouter from "./routes/signup.js"
import loginRouter from "./routes/login.js" 
import userRouter from "./routes/user.js"
import blogRouter from "./routes/blogs.js" 
import logoutRouter from "./routes/logout.js"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import session from "express-session";
import methodOverride from "method-override"
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = e()

// Middlewares 
// Serve static files
app.use('/uploads', e.static('uploads'));
app.use('/blogCover', e.static('blogCover'));
// Set EJS as view engine
app.set('view engine', 'ejs')
app.use(e.static('public'))
app.use(methodOverride('_method')); // Allows method overriding using `_method` query parameter

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({                                                                                 //Step -2
    secret: "dddsddswf23r344f3f",
    resave: false,
    saveUninitialized: true
}));

// Load environment variables
dotenv.config();

// Connection
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URI).then(()=> console.log("connected")).catch((err)=>console.log("DB not connected"))

app.use((req, res, next) => {
    res.locals.session = req.session;  // Make session available globally in EJS
    console.log(typeof res.locals.profileImage)
    res.locals.profileImage = req.session.profileImage // Default image if not set
    console.log(typeof res.locals.profileImage)
    next();
});
app.use((req, res, next) => {
    console.log(`🟡 ${req.method} request to ${req.url}`);
    next();
});

// routes
app.use("/signup",signupRouter)
app.use("/login",loginRouter)
app.use("/user",authMiddleware,userRouter)
app.use("/blogs",authMiddleware,blogRouter)
app.use("/logout",logoutRouter)


app.get("/",(req, res)=>{
    res.render('index')
})


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})