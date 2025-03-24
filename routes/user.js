import e from "express"
const router = e.Router()

router.get('/',(req,res)=>{
    res.render('profile')
})
router.get('/edit',(req,res)=>{
    const email = req.session.email
    res.render('userProfile',{email})
})

export default router