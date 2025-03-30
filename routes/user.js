import e from "express"
import multer from "multer";
import user from "../models/userprofile.mongodb.js";
import blogs from "../models/blog.mongodb.js"
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
        const userBlogs = await blogs.find({email : email.email})
   
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
            res.render('userProfile',{email})
        }else{ 
            res.render('userProfile',{userProfile})
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

export default router