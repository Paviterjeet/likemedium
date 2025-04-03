import signUp from "../models/signup.mongodb.js"
import bcrypt from "bcrypt"
import user from "../models/userprofile.mongodb.js"

export const handleLogin = async (req ,res) => {
    const {email , password }  = req.body
    try {
        // Check db response 
        const findUser = await signUp.findOne({email}).select('+password +fullname +email +mobile');
        if (!findUser) {
            return res.render('log-in', {
                errorField: 'email',
                error: "Email doesn't exist!",
                userData: { email }
            })
        }

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if (!passwordMatch) {
            return res.render('log-in', {
                errorField: 'password',
                error: 'Incorrect password!',
                userData: { email, password: '' }
            })
        }
        const existingUser = await user.findOne({ email })
        if(!existingUser){
            req.session.profileImage = 'images/profile.png'
        }else{
            req.session.profileImage = existingUser.profile
            console.log(existingUser.profile)
        }
        
        req.session.email = {email}
        req.session.user = user
        //  login access
    
        res.redirect('/user');

    } catch (error) {
        console.error("Login error:", error);
        // Set a custom error header (visible in network response headers)
        res.setHeader("X-Error-Message-Login", "Internal Server Error");
        res.status(500).send("Internal Server Error");
    }

} 

