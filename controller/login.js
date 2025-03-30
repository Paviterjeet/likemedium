import signUp from "../models/signup.mongodb.js"
import bcrypt from "bcrypt"

export const handleLogin = async (req ,res) => {
    const {email , password }  = req.body
    try {
        // Check db response 
        const user = await signUp.findOne({email}).select('+password +fullname +email +mobile');
        if (!user) {
            return res.render('log-in', {
                errorField: 'email',
                error: "Email doesn't exist!",
                userData: { email }
            })
        }

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.render('log-in', {
                errorField: 'password',
                error: 'Incorrect password!',
                userData: { email, password: '' }
            })
        }
        req.session.email = {email}
        req.session.user = user
        //  login access
        res.redirect('/user/');

    } catch (error) {
        console.error("Login error:", error);
        // Set a custom error header (visible in network response headers)
        res.setHeader("X-Error-Message-Login", "Internal Server Error");
        res.status(500).send("Internal Server Error");
    }

} 

