const express = require("express");
const app= express();
const router= express.Router();
const URL = require('../model/url');

router.get("/", async (req, res)=>{

    const  allUrls= await URL.find({});
    return res.render('home', {
        urls:allUrls,
    })
})



module.exports=router;