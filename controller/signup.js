import signUp from "../models/signup.mongodb.js"

export const handleSignUp = async (req , res) => {
    const {email , fullname , password , mobile}  =req.body
    try {
        const da = await signUp.create({email , fullname , password , mobile})
        if(!da){
            res.status(400).json({error : "Problem while saving data"})
        }
        res.redirect('/login')
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({error : "Email already Exist"})
        }
       
    }
    
   
 }
