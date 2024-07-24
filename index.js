const express = require("express");
const app= express();
const path = require("path");
const cookieParser = require("cookie-parser")
const {restrictToLoggedInUserOnly} = require("./middlewares/auth");




const router= express.Router();


const urlRouter= require("./routes/url");
const staticRouter = require("./routes/staticRouter")
const userRoute = require("./routes/user")

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

app.use("/url",restrictToLoggedInUserOnly, urlRouter)
app.use("/home", restrictToLoggedInUserOnly, staticRouter)
app.use("/user", userRoute)


const{handleGenerateNewUrl,
    handleGetUrl,
    handleGetAnalytics,
    handleGetEjs}   =require("./controllers/url")




app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

const{connectMongoDB}= require('./connect')
connectMongoDB('mongodb://127.0.0.1:27017/newDb')





app.listen(3000);