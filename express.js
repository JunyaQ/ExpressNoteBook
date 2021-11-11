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
//connect to database, will store the input from notes.html to it.
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// put information on the webpage
app.post("/api/notes",(req,res)=>{
    fs.readFile(__dirname + "/db/db.json", function (error, notes) {
        if (error) {
          return console.log("sendfile: "+error)
        }
        notes = JSON.parse(notes)
    
        var id = notes.length+1;
        var newNote = { title: req.body.title, text: req.body.text, id: id }
        var activeNote = notes.concat(newNote)
    
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function (error, data) {
          if (error) {
            return error
          }
          console.log(activeNote)
          res.json(activeNote);
        })
      })
})




app.listen(PORT,function(){
    console.log(`listening at ${PORT}`);
})
