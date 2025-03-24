import signUp from "../models/signup.mongodb.js"
import bcrypt from 'bcrypt'

export const handleSignUp = async (req , res) => {
    
    const {email , fullname , password , mobile}  = req.body
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    try {
        const da = await signUp.create({email , fullname , password: hashPassword , mobile})
        if(!da){
            res.status(400).json({error : "Problem while saving data"})
            res.redirect('/signup')
        }else{
            res.redirect('/login')
        }
        
    } catch (error) {

       
        if(error.code === 11000){
            return res.render('sign-up', { 
                email, 
                fullname, 
                mobile, 
                error: "Email already exists" 
            });
            //return res.status(400).json({error : "Email already Exist"})
        }
       
    }
    
   
 }
