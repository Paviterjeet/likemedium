import e from "express"
const router = e.Router()



router.get('/',(req,res)=>{
    res.render('allBlogs')
})
router.get('/add',(req,res)=>{
   // res.render('likeMedium')
    res.render('addBlog')
})

export default router