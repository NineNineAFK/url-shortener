const express = require("express");
const app= express();
const path = require("path");


const router= express.Router();
const urlRouter= require("./routes/url");
const staticRouter = require("./routes/staticRouter")

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/url", urlRouter)
app.use("/home", staticRouter)


const{handleGenerateNewUrl,
    handleGetUrl,
    handleGetAnalytics,
    handleGetEjs}   =require("./controllers/url")




app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

const{connectMongoDB}= require('./connect')
connectMongoDB('mongodb://127.0.0.1:27017/newDb')





app.listen(3000);