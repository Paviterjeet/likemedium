import e from "express"
const router = e.Router()

// router.use((req, res, next) =>{
//     // console.log(req.session.email)
//      if(typeof req.session.email == 'undefined' )
//      {
//          res.redirect('/signup')
//      }
//      console.log("session ke bahar aa gya")
//  next()
//  });
router.get('/',(req,res)=>{
    res.render('profile')
})
router.get('/edit',(req,res)=>{
    const email = req.session.email
    res.render('userProfile',{email})
})
router.get('/changePassword',(req,res)=>{
    res.render('changePassword')
})

export default router