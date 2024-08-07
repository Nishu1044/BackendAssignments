const express = require("express")
const fs = require("fs")

const app = express()

app.get("/home",(req,res)=>{
    res.send("wlcome to home page")
})

app.post("/signup",(req,res)=>{
    let data = fs.readFileSync("./db.json", "utf-8")
    console.log(data);
    
    res.send("wlcome to home page with post request")
})


app.listen(8181,()=>{
    console.log("server start");
})