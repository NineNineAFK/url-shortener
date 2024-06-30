
const { findOne } = require("../model/url");
const User = require("../model/user")
const {getUser, setUser, } = require("../service/auth")
const {v4: uuidv4} = require("uuid");



//user signup no hashing here
async function handleUserSignUP(req, res){

   const { name, email, password} = req.body;

   await User.create({
    name,
    email,
    password,

   });
   return res.render("home")
}



//user login

async function handleUserlogin (req, res){
    const { email, password  } = req.body;
    const user = await User.findOne({ email, password})
    if(!user){
        return res.render("login"),{
            Error:"invalid username or password"
        }
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    
    return res.redirect("/home");
}



module.exports={
    handleUserSignUP,
    handleUserlogin,
}