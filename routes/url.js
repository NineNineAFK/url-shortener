const express = require("express");
const router = express.Router();

const{handleGenerateNewUrl,
        handleGetUrl,
        handleGetAnalytics,
        handleGetEjs}   =require("../controllers/url")


router.post("/",handleGenerateNewUrl); //new member

router.get("/:shortID", handleGetUrl ) // member fetch

router.get("/analytics/:shortID", handleGetAnalytics); // admin


module.exports=router;