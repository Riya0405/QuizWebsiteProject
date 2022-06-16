const express=require('express');
const bodyParser= require ('body-parser');
const app = express();

const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/',express.static('public'));

app.get('/', function(req,res){
    res.send("hello world");
})

app.post('/courses', function(req,res){
    console.log("trying to add course");
    database.addcourse(req.body, function(){
        console.log('added course');
        res.sendStatus(200);
    });
})

app.listen(7762,function(){
    console.log('server running on port 7762');
    database.connect();
})