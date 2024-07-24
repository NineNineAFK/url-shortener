const express = require("express");
const app= express();
const router= express.Router();
const URL = require('../model/url');


router.get("/", async (req, res)=>{

    const  allUrls= await URL.find({createdBy: req.user._id}); // checks _id from URL and matches it with _id of USERS to see who made it and displays them.
    return res.render('home', {
        urls:allUrls,
    })
})

router.get("/signup", ( req, res)=>{

    res.render("Signup")
})

module.exports=router;