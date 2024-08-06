const express = require("express");
const MovieModel = require('./model/movie.model');
const connectDB = require('./dbConnection/db');
// const mongoose = require("mongoose") // it is use for connection part


const app = express();
const PORT = 8787;
// const url = "mongodb://localhost:27017/movieStore"; // it is use for connection part


app.use(express.json())  // it is a Middleware for parsing JSON bodies
connectDB(); // Connect to the database



// app.listen(PORT, ()=>{
//     console.log(`Server is running on port ${PORT}`);
// })
app.listen(PORT, async () => {
    try {
       await connectDB()
        console.log(`sever is running on port ${PORT}  and connected to database`);   
    } catch (error) {
        console.log(`error connecting to the database ${error}`);
    }
})




app.get("/movie",(req,res)=>{
    res.send("movieDetails is added")
})


//  start all crud operation
app.post("/create-movie", async (req,res)=>{

    const {name,author,price,yop,category,rating} = req.body;

    try {

        const existingMovie = await MovieModel.findOne({ name });      // condition
        if(existingMovie){
            return res.status(409).send("Movie already exists")
        } 

        const Movie = new MovieModel({
            name,
            author,
            price,
            yop,
            category,
            rating
        })

        await Movie.save()
        res.status(201).send("Movie store created successfully")
        
    } catch (error) {
        res.status(404).send(`error creating Movie Store ${error}`) 
    }

})



app.get("/get-movie" , async (req,res) => {
    try {
       
        // const { title,rating,category } = req.query // Get title and rating filters from query params
        const { title, rating, category, sortBy } = req.query; // Get filters and sort parameters from query params
        const filterQuery = {};


        if(title){
            filterQuery.name = title;
        }

        if (rating) {
            filterQuery.rating = rating; // Filter by exact rating
        }

        if (category) {
            filterQuery.category = new RegExp(category, 'i'); // Case-insensitive search
        }

        console.log(filterQuery);



        // SORTING START
        // let sortQuery = {}; // Default sort query is empty
        // if (sortBy) {
        //     sortQuery[sortBy] = order === 'desc' ? -1 : 1; // Determine sort order
        // }
        // console.log("Sort Query:", sortQuery);


        // done correct code
        let sortQuery = {};
        if (sortBy) {
            const [field, order = 'asc'] = sortBy.split(':'); // Split sortBy to get field and order
            sortQuery[field] = order === 'desc' ? -1 : 1; // Determine sort order
        }
        console.log("Sort Query:", sortQuery);



        const movies = await MovieModel.find(filterQuery).sort(sortQuery);
        res.status(200).json({"msg":"movies fetched successfully", movies})
    } catch (error) {
        res.status(404).send(`error fetching movies ${error}`)
    }
})




app.get("/get-moviepage" , async (req,res) => {
    const { page=1, limit=2 } = req.query; 

    try {
        const options = {
            skip:(Number(page) - 1) * Number(limit),
            limit: Number(limit),
        }
    
      const filteredMovies = await MovieModel.find().skip(options.skip).limit(options.limit);
      res.status(200).send(filteredMovies);
      console.log(`Filtered Movies: ${filteredMovies}`); // Debugging log

    } catch (error) {
        res.status(404).send(`error fetching movies ${error}`)
        console.error(`Error: ${error}`); // Debugging log
    }
})























// app.get("/get-movies" , async (req,res) => {
//     try {
       
//         const users = await MovieModel.find()
//         res.status(200).json({"msg":"users fetched successfully", movies})
//     } catch (error) {
//         res.status(404).send(`error fetching users ${error}`)
//     }
// })



