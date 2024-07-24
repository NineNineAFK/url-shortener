const express = require("express");
const mongoose = require("mongoose");
const shortid = require('shortid');
const URL = require('../model/url');
//const generate = require('meaningful-string');

const app = express();

// Middleware to parse JSON-encoded request bodies.   parsing is the way to send texts from front to the back.
app.use(express.json());
async function handleGenerateNewUrl(req, res) {
    let shortID = shortid();
    const body = req.body;
    if (!body || !body.url) {
        return res.status(400).json({ message: "URL required" });
    }
    
    // Regenerate shortID if it's null or invalid
    while (!shortID) {
        shortID = shortid();
    }

    try {
        await URL.create({
            shortID: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });
        res.json({ id: shortID });
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

    res.redirect(entry.redirectURL)


}
module.exports = {
    handleGenerateNewUrl,
    handleGetUrl,
}
