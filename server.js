const http = require('http');
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const dbConfig = require('./config/DbConfig');
let app = express();
const  server = http.createServer(app);
let port = process.env.port || 3000;

const user = require('./controller/userController');

//Mongo DB Connection
mongoose.connect(dbConfig.getLocalDB(),{ useNewUrlParser: true });
let db = mongoose.connection;

//Checks db connection
db.once('open',()=>{
  console.log('Connection established to db');
});

//db on error
db.on('error',(err)=>{
   console.log('Db creates error',err);
});

//Adding all the required middle ware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
  secret : 'thisissecret',
  resave:true,
  saveUninitialized : true,
  store : new MongoStore({mongooseConnection:mongoose.connection})
}));
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session()); 

app.use('/user',user);

//Starting the server
server.listen(port,()=>{
  console.log(`started on port ${port}`);
});