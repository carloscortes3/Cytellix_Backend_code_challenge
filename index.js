const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/api/user', require('./api/user'));
app.use('/api/role', require('./api/role'));
app.use('/api/company', require('./api/company'));
app.use('/api/session', require('./api/session'));
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true}, ()=> console.log('connected to DB!'));






const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});