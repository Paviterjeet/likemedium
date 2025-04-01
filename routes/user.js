import e from "express"
import multer from "multer";
import user from "../models/userprofile.mongodb.js";
import blogs from "../models/blog.mongodb.js"
import signUp from "../models/signup.mongodb.js"
import bcrypt from 'bcrypt'
const router = e.Router()

import {handleUserProfile} from "../controller/user.js"


// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files in 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); // Unique file name
    }
});

// File Upload Configuration
const upload = multer({ storage: storage });

router.get('/',async (req,res)=>{

    const email = req.session.email
    try {
   
        const userProfile = await user.findOne({email : email.email})
        const userBlogs = await blogs.find({email : email.email}).sort({ createdAt: -1 });
   
        if(!userProfile){
          
            res.render('profile',{email,userBlogs})
        }else{ 
           
            res.render('profile',{userProfile,userBlogs})
        }
    } catch (error) {
       
        console.log(error)
    }

   
})
router.get('/edit', async(req,res)=>{
   
    const email = req.session.email
    try {
        
        const userProfile = await user.findOne({email : email.email})
        if(!userProfile){
            res.render('userProfile',{email,userProfile: req.session.user})
        }else{ 
            res.render('userProfile',{email, userProfile})
        }
    } catch (error) {
        console.log(error)
    }
    
})
router.post('/saveProfile',upload.fields([
    { name: 'profile', maxCount: 1 },  // 1 profile image
    { name: 'cover', maxCount: 1 }    // 1 cover image
]), handleUserProfile)

router.get('/changePassword',(req,res)=>{
    res.render('changePassword')
})

router.post('/updatePassword', async (req, res) => {
    try {
        const email = req.session.email;
        const { password, newPass } = req.body;

        if (!password || !newPass) {
            return res.render('changePassword', {
                errorField: 'password',
                errorMessage: 'Both old and new passwords are required!',
            });
        }

        // 🔹 Find user and check old password
        const userP = await signUp.findOne({ email: email.email }).select('+password');
        if (!userP) {
            return res.render('changePassword', {
                errorField: 'email',
                errorMessage: "Email doesn't exist!",
            });
        }

        if (!userP.password) {
            return res.render('changePassword', {
                errorField: 'password',
                errorMessage: 'No password found for this account!',
            });
        }

        const passwordMatch = await bcrypt.compare(password, userP.password);
        if (!passwordMatch) {
            return res.render('changePassword', {
                errorField: 'password',
                errorMessage: 'Incorrect old password!',
            });
        }

        // 🔹 Hash and update new password
        const hashPassword = await bcrypt.hash(newPass, 10);
        const updatedUser = await signUp.findOneAndUpdate(
            { email: email.email },
            { password: hashPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.render('changePassword', { errorMessage: "User data not saved." });
        }

        return res.render('changePassword', { successMessage: "Password updated successfully!" });

    } catch (error) {
        console.error("Error updating password:", error);
        return res.render('changePassword', { errorMessage: "Internal server error." });
    }
});



export default router