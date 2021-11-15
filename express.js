 const express = require("express");
 const path = require("path");
 const fs = require("fs");
 const app = express();
 const PORT = 3001;

 //serving static files 
 app.use(express.static('public'));
 app.use(express.urlencoded({ extended: true }));
 app.use(express.json());

 //get notes.html
 app.get('/notes', function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
    //res.send('/test');
});

 // get index file
 app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


//connect to database, will store the input from notes.html to it.
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// get information on the webpage
app.post("/api/notes",(req,res)=>{
    fs.readFile(__dirname + "/db/db.json", function (error, notes) {
        if (error) {
          return console.log("sendfile: "+error)
        }
        notes = JSON.parse(notes)
    
        var id = notes.length;
        var title = req.body.title;
        var text = req.body.text;

        var newnote = {title:title, text:text,id:id};
        
        var activeNote = notes.concat(newnote)
        notes.concat()
    
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function (error, data) {
          if (error) {
            return error
          }
          console.log(activeNote)
          //individual
         // console.log(activeNote[1].title);
          res.json(activeNote);
        })
      })
})



//get certain information from the json with the id as key
//http://localhost:3001/api/notes/
app.get("/api/notes/:id", (req, res) => {
  // res.sendFile(path.join(__dirname, "/db/db.json"));
  let noteList = JSON.parse(fs.readFileSync("./db/db.json"));
  let noteId = (req.params.id).toString();

});

app.listen(PORT,function(){
    console.log(`listening at ${PORT}`);
})
