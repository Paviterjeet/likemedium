import e from "express"
const router = e.Router()

router.get('/',(req,res)=>{
    res.render('allBlogs')
})

export default router