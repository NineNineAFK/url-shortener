const express = require("express")
const {handleUserSignUP, handleUserlogin,} = require("../controllers/user")
const { route } = require("./staticRouter")
const router= express.Router()

router.post("/",)

router.get("/signup", ( req, res)=>{

    res.render("Signup")
})

router.post("/signup", handleUserSignUP);
router.post("/login", handleUserlogin);
router.get("/login", (req, res)=>{
    res.render("login")
})


module.exports= router;
