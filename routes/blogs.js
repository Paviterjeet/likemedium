import e from "express"
import multer from "multer"
import {handleBlogCreation} from "../controller/blog.js"
import blogs from "../models/blog.mongodb.js"
const router = e.Router()

const storage = multer.diskStorage({
    destination:"blogCover/",
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
        console.log(file.originalname)
    } 
})
const upload = multer({storage})

router.get('/', async(req,res)=>{
    try {
        const userBlogs = await blogs.find().sort({ createdAt: -1 });       
        res.render('blogs',{userBlogs})
    } catch (error) {
        console.log(error)
    }    
})


router.get('/myBlogs', async(req,res)=>{
    const email = req.session.email
    try {
        const userBlogs = await blogs.find({email : email.email})
        console.log({userBlogs})
        if(!userBlogs){
            res.render('blogs',{email})
        }else{ 
            res.render('blogs',{userBlogs})
        }
    } catch (error) {
       
        console.log(error)
    }

    
})
router.get('/add',(req,res)=>{
   // res.render('likeMedium')
    res.render('addBlog')
})
router.post('/save',upload.fields([
    {name:"blogImage",maxCount:1}
]),handleBlogCreation)

router.get('/:slug', async(req,res)=>{
    try {
     const blogSlug = req.params.slug;
         const blog = await blogs.findOne({blogSlug})
         if(!blog){
             res.status(404).json({error : "Data Not Found"})
         }
        
         res.render('blog',{blog})
    } catch (error) {
         res.status(500).json({error : "Internal Server Error"})
    }
    
 })
export default router