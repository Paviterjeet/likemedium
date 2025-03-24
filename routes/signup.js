import e from "express"
const router = e.Router()
import {handleSignUp} from "../controller/signup.js"

router.get('/',(req,res)=>{
     const {email,fullname,mobile, error} = ""

    res.render('sign-up' , {email ,fullname , mobile, error})
})

router.post('/submit',handleSignUp)

export default router