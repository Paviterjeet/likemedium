export const authMiddleware = (req,res,next)=>{
   console.log(req.session.email)
    if(!req.session.email){
        return res.redirect('/login')
    }

    next()
}