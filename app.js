const express = require('express');

const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const nodemon = require('nodemon');
var app = express();
const PORT = process.env.PORT || 3000;
dotenv.config({ path: './config/config.env' })

const connectToMongo = async () =>{ await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})};

connectToMongo();
//password config
require('./config/passport')(passport)

//middleware
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
)
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(require("./routes/index"))
app.use('/auth', require('./routes/auth'))

app.listen(PORT, console.log(`listening at ${PORT}`))

console.log("Hey There")
// To run it open the terminal type npm start dev or nodemon
console.log("Hello")
