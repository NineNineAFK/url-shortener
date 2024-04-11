const express = require("express");
const app= express();
app.use(express.json());
const router= express.Router();
const urlRouter= require("./routes/url");
app.use("/url", urlRouter)


const{connectMongoDB}= require('./connect')
connectMongoDB('mongodb://127.0.0.1:27017/newDb')




app.listen(3000);