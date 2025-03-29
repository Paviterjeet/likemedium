import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {type : String,
        require  : true,
        unique : true
    },
    fullname :{type : String,
        require : true
    },
    mobile : {type : String, 
        default : "Not Provided" },
    profile : {type : String, 
            default : "" },
    cover : {type : String, 
        default : "" },            
    pronouns:{type : String,
        default : ""
    },
    bio:{type : String,
        default : ""
    },
    facebook:{type : String,
        default : "#"
    },
    twitter:{type : String,
        default : "#"
    },
    linkedin:{type : String,
        default : "#"
    },
    instagram:{type : String,
        default : "#"
    },
    createdAt : {type: Date, 
        default : Date.now}
    })

    const user = mongoose.model("user" , userSchema)
    
    export default user