import e from "express"
import { handleLogin } from "../controller/login.js"
const router = e.Router()


router.get('/',(req,res)=>{
    res.render('log-in')
})
router.post('/login',handleLogin)


export default router