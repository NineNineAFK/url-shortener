const express = require("express");
const app= express();
const path = require("path");
app.use(express.json());
const router= express.Router();
const urlRouter= require("./routes/url");
app.use("/url", urlRouter)

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

const{connectMongoDB}= require('./connect')
connectMongoDB('mongodb://127.0.0.1:27017/newDb')


app.get("/test", (req, res)=>
{
    return res.render('home')

})

app.listen(3000);