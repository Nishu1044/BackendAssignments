const express = require("express");
const connection = require("./config/db");
const userModel = require("./models/user.model")


const server = express();
const PORT = 3005;

server.use(express.json())

server.get('/', (req,res) => {
    res.send('server is running fine')
})

server.post("/create-user", async (req,res)=>{
   const {name,price,description,category,stock} = req.body;

   try {

     // Check if a user with the same name already exists
     const existingUser = await userModel.findOne({ name });
     if (existingUser) {
         return res.status(409).send("User already exists");
     }

    const user = new userModel({
        name,
        price,
        description,
        category,
        stock
    })

    await user.save()
    res.status(201).send("user created successfully")
    
   } catch (error) {
    res.status(404).send(`error creating user ${error}`)
   }
})

server.get("/get-users" , async (req,res) => {
    try {
        const users = await userModel.find()
        res.status(200).json({"msg":"users fetched successfully", users})
    } catch (error) {
        res.status(404).send(`error fetching users ${error}`)
    }
})

server.patch("/update-user/:id", async (req,res)=>{
    const {id} = req.params;

    try {
        const updateUser = await userModel.findByIdAndUpdate({_id:id}, req.body)
        res.status(200).json({"msg":"updateUser successfully", updateUser})
    } catch (error) {
        res.status(404).send(`error updating users ${error}`) 
    }
})


server.delete("/delete-user/:id", async (req,res)=>{
    const {id} = req.params;

    try {
        const deleteUser = await userModel.findByIdAndDelete({_id:id})
        res.status(200).json({"msg":"deleted successfully", deleteUser})
    } catch (error) {
        res.status(404).send(`error not delet users ${error}`) 
    }
})

server.listen(PORT, async () => {
    try {
       await connection
        console.log(`sever is running on port ${PORT}  and connected to database`);   
       
    } catch (error) {
        
        console.log(`error connecting to the database ${error}`);
    }
   
})
































