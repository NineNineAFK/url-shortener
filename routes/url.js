const express = require("express");
const router = express.Router();

const{handleGenerateNewUrl,
        handleGetUrl,
        handleGetAnalytics,
        handleGetEjs}   =require("../controllers/url")


router.post("/",handleGenerateNewUrl);

router.get("/:shortID", handleGetUrl )

router.get("/analytics/:shortID", handleGetAnalytics);


module.exports=router;