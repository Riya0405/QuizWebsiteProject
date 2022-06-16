var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var courseSchema = new Schema(
  {
    coursename: String,
    coursedescription: String
  }
);

var questionSchema = new Schema(
    {
        coursename: String,
        description: String,
        option1: String,
        option2: String,
        option3: String,
        option4: String,
        answer: Number
    }  
);

var courses = mongoose.model('coursesdb', courseSchema);
var questions = mongoose.model('questionsdb', questionSchema);

var mongoDB = 'mongodb+srv://riyabajaj:riyabajaj@cluster0.ivoyaac.mongodb.net/quiz?retryWrites=true&w=majority';

function connect(){
    mongoose.connect(mongoDB, function(err){
        if(err) throw err;
        console.log("connected");
    })
}

function addcourse(course, callback){
    var courseInstance = new courses({
        coursename: course.name,
        coursedescription: course.description
    });
    courseInstance.save(function(err){
        if(err) throw err;
        callback();
    });
}

function addquestion(question, callback){
    var questionInstance = new questions({
        coursename: question.coursename,
        description: question.description,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        option4: question.option4,
        answer: question.answer
    });
    questionInstance.save(function(err){
        if(err) throw err;
        callback();
    });
}

module.exports = {connect, addcourse, addquestion}