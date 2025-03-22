import e from "express";
import signupRouter from "./routes/signup.js"
import loginRouter from "./routes/login.js" 
import userRouter from "./routes/user.js" 

const port = 3000
const app = e()

// Set EJS as view engine
app.set('view engine', 'ejs')
app.use(e.static('public'))

app.use("/signup",signupRouter)
app.use("/login",loginRouter)
app.use("/user",userRouter)

app.get("/",(req, res)=>{
    res.render('userProfile')
})


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})