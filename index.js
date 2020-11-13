const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, session-token");
  
  next();
});

const directoryPath = path.join(__dirname, 'api');

fs.readdir(directoryPath, (err, files) =>{
  //handling error
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  } 
  //listing all files using forEach
  files.forEach((file) => {
      file_location = '/api/'+file.substring(0, file.length-3);
      app.use(file_location, require('.'+file_location));
  });
});
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true}, ()=> console.log('connected to DB!'));






const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});