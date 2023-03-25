const express = require('express');
const session = require('express-session')

const app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('trust proxy', 1);



app.use(session({
    name : 'kksoin',    
    secret : 'f3cfe1ed8fae109f02179dbf',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000000 * 60 * 10
    }
}))

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = {app, urlencodedParser};