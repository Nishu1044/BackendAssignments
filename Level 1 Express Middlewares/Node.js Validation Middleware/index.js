const express = require("express")

const server = express();
const PORT = 8080;

const stringsInArray = (arr) =>{
    let flag = true
   arr.forEach((el)=>{
    if(typeof el!== "string"){
        flag =  false;
        return flag;
    }
   })
   return flag
}


// create a middleware 
const myMiddlewareValidator = (req,res,next) => {
    let {ID,Name,Rating,Description,Genre,Cast} = req.body;
    let errorMsg = ""
        if(typeof ID!== "number"){
            errorMsg += "ID must be a number"
        }
        if(typeof Name!== "string"){
             errorMsg += "Name must be a string"
        }
        if(typeof Rating!== "number"){
            errorMsg += "Rating must be a number"
       }
       if(typeof Description!== "string"){
        errorMsg += "Description must be a string"
       }
       if(typeof Genre!== "string"){
        errorMsg += "Genre must be a string"
       }
       if(!Array.isArray(Cast) || !stringsInArray(Cast)){
        errorMsg += "Cast must be a array"
       }

       if(errorMsg){
         return res.status(400).json({
            message: "bad request. some data is incorrect.",
            note : errorMsg
         })
       }

    next()
}

// // for use we write here
// server.use(myMiddlewareValidator);

server.use(express.json())

server.post("/",myMiddlewareValidator,(req,res)=>{
    res.status(200).json({message: "data received"})
})

server.listen(PORT,()=>{
    console.log(`listeing to ${PORT}`);
})

