
const { findOne } = require("../model/url");
const User = require("../model/user")
const {getUser, setUser, } = require("../service/auth")
const {v4: uuidv4} = require("uuid");
const {restrictToLoggedInUserOnly} = require("../middlewares/auth")


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

async function handleUserlogin(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.render("login", {
                error: "Invalid username or password", // Corrected key to lowercase 'error'
            });
        }

        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uid", sessionId);  // Cookie with name "uid" points to the sessionId

        return res.redirect("/home");
    } catch (error) {
        console.error("Error during user login:", error); // Added error logging
        return res.status(500).json({ message: "Internal server error" });
    }
}




module.exports={
    handleUserSignUP,
    handleUserlogin,
}