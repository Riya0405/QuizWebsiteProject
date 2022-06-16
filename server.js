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

app.patch('/courses', function(req,res){
    console.log("trying to update course");
    database.updatecourse(req.body, function(){
        console.log('updated course');
        res.sendStatus(200);
    });
})

app.delete('/courses', function(req,res){
    console.log("trying to delete course");
    database.deletecourse(req.body, function(){
        console.log('deleted course');
        res.sendStatus(200);
    });
})

app.get('/courses', function(req,res){
    console.log("trying to get list of courses");
    database.getallcourses(function(courses){
        console.log('got list of courses');
        res.send(courses);
    });
})

app.post('/courses/questions', function(req,res){
    console.log("trying to add question for a course");
    database.addquestion(req.body, function(){
        console.log('added question for a course');
        res.sendStatus(200);
    });
})

app.patch('/courses/questions', function(req,res){
    console.log("trying to update question for a course");
    database.updatequestion(req.body, function(){
        console.log('updated question for a course');
        res.sendStatus(200);
    });
})

app.delete('/courses/questions', function(req,res){
    console.log("trying to delete question for a course");
    database.deletequestion(req.body, function(){
        console.log('deleted question for a course');
        res.sendStatus(200);
    });
})

app.get('/courses/questions', function(req,res){
    console.log("trying to get questions for a course");
    database.getcoursequestions(req.body, function(questions){
        console.log('got questions for the course');
        res.send(questions);
    });
})

app.listen(7762,function(){
    console.log('server running on port 7762');
    database.connect();
})