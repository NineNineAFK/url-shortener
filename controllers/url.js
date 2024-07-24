const express = require("express");
const mongoose = require("mongoose");
//const shortid = require('shortid');
const URL = require('../model/url');
//const generate = require('meaningful-string');
const { nanoid } = require('nanoid');
const {restrictToLoggedInUserOnly} = require("../middlewares/auth")
const app = express();

// Middleware to parse JSON-encoded request bodies
app.use(express.json());

const path = require("path");
app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

async function handleGenerateNewUrl(req, res) {
    const shortID = nanoid(8); // Generate a unique short ID of length 8
    const body = req.body;
    if (!body || !body.url) {
        return res.status(400).json({ message: "URL required" });
    }

    try {
        await URL.create({
            shortID: shortID,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.user._id,
        });
        //res.json({ id: shortID });
        res.render("home", {
            id:shortID,
        })
    } catch (error) {
        console.error("Error creating new URL:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


async function handleGetUrl(req, res){
    const shortID =req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {
            shortID
        },
        {
            $push:{
                visitHistory:{
                    timestamp: Date.now()
                }
            }
        }
    )

    res.redirect(entry.redirectURL);

}

async function handleGetAnalytics(req, res){
    const shortID=req.params.shortID;
    const result = await URL.findOne({shortID});
    
    res.json({
        totalClicks:result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

async function handleGetEjs(req, res){

    const allUrl= await URL.find({});
    res.render("home", {
        urls:allUrl,
    })
}

module.exports = {
    handleGenerateNewUrl,
    handleGetUrl,
    handleGetAnalytics,
    handleGetEjs,
}

