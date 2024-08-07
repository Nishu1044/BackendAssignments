const path = require("path")
const express = require("express")
const multer  = require('multer')


const app = express()
const PORT = 4141;
// const upload = multer({ dest: 'uploads/' })


const storage = multer.diskStorage({
    destination: function (req, file, cd){
        return cd(null, "./uploads")
    },
    filename: function (req, file, cd){
        return cd(null, `${Date.now()}-${file.originalname}`)
    }
})


const upload = multer({storage})

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))


app.use(express.urlencoded({ extended: false }))


app.get("/",(req,res)=>{
    return res.render("homepage")
})

app.post("/uploadfile", upload.single("profileImage"),(req,res)=>{
  console.log(req.body);
  console.log(req.file);
  

//  return res.redirect("/")
return res.status(200).json({
    message: "File uploaded successfully",
    // imageUrl: req.file.path
});

})

app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`);
    
})