const express = require("express")
const fs = require("fs")


const server = express();
server.use(express.json());// middleware
const PORT = 4041;



// end point start

const readJson = () =>{
  const data = fs.readFileSync("db.json")
  console.log(data);
  console.log(JSON.parse(data));
  return JSON.parse(data) // in form of object
}


const writeJson =(data) =>{
    fs.writeFileSync("db.json", JSON.stringify(data))  // for update the db.json data
}




server.get("/todos", (req,res)=>{
    const data = readJson();
    res.send(data)
})


server.post("/todos", (req,res)=>{
    const data = readJson()

    const newTask = {
        id: data.todos.length + 1,
        task: req.body.task,
        status : false
    }

    data.todos.push(newTask);
    writeJson(data)
    // console.log(newTask);  
    res.json(newTask) // res.status(201).send(newTask)
})


server.put("/todos/update",(req,res)=>{
    const data = readJson();
    data.todos.forEach(todo =>{
        if(todo.id % 2 == 0 && todo.status == false){
            todo.status = true
        }
    })
    writeJson(data);
    res.json(data.todos)
})


server.delete("/todos/delete-true",(req,res)=>{
 const data = readJson();
  data.todos =  data.todos.filter((todo)=> !todo.status)
  writeJson(data);
  res.json(data.todos);
})


server.listen(PORT,()=>{
    console.log(`server is running correct ${PORT}`); 
})
