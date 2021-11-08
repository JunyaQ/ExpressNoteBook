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
    res.send('Hello');
});
//connect to database, will store the input from notes.html to it.
app.get("/my_db", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});
app.listen(PORT,function(){
    console.log(`listening at ${PORT}`);
})