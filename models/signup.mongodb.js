import mongoose from 'mongoose'

const signupSchema = mongoose.Schema({
email : {type : String,
    require  : true,
    unique : true
},
fullname :{type : String,
    require : true
},
password: {type : String,
    require : true
},
mobile : {type : String, 
    default : "Not Provided" },

createdAt : {type: Date, 
    default : Date.now}
})

const signUp = mongoose.model("signup" , signupSchema)

export default signUp