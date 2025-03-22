import e from "express"
const router = e.Router()

router.get('/',(req,res)=>{
    res.render('profile')
})
router.get('/edit',(req,res)=>{
    res.render('userProfile')
})

export default router