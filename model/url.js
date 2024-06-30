const mongoose= require("mongoose");
const User = require("./user");

//const generate = requie("meaningful string"); // ignore

const urlSchema = new mongoose.Schema(


    {shortID:{
        type:String,
        required: true,
        unique: true,
    },
    redirectURL:{
        type:String,
        required:true,
    },

    visitHistory:
        [{timestamp: 
            {type: Number}}],
    
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

        },
        {timestamps:true}

)

const URL = mongoose.model("url", urlSchema)
module.exports=URL