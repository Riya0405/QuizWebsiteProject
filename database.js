var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var courseSchema = new Schema(
  {
    coursename: String,
    coursedescription: String,
    passingmarks: Number
  }
);

var questionSchema = new Schema(
    {
        coursename: String,
        questionname: String,
        questiondescription: String,
        option1: String,
        option2: String,
        option3: String,
        option4: String,
        answers: Array,
        marks: Number
    }  
);

var courses = mongoose.model('courses', courseSchema);
var questions = mongoose.model('questions', questionSchema);

var mongoDB = 'mongodb+srv://riyabajaj:riyabajaj@cluster0.ivoyaac.mongodb.net/quiz?retryWrites=true&w=majority';

function connect(){
    mongoose.connect(mongoDB, function(err){
        if(err) throw err;
        console.log("connected");
    })
}

function addcourse(course, callback){
    var courseInstance = new courses({
        coursename: course.coursename,
        coursedescription: course.coursedescription,
        passingmarks: course.passingmarks
    });
    courseInstance.save(function(err){
        if(err) throw err;
        callback();
    });
}

function updatecourse(course, callback){
    courses.updateOne({'coursename': course.coursename}, course, function(err){
        if(err) throw err;
        callback();
    });
}

function deletecourse(course, callback){
    courses.deleteOne({ 'coursename': course.coursename}, function(err){
        if(err) throw err;
        callback();
    })
}

function getallcourses(callback){
    courses.find({ }).exec(function(err, result){
        if(err) throw err;
        callback(result);
    });
}

function addquestion(question, callback){
    var questionInstance = new questions({
        coursename: question.coursename,
        questionname: question.questionname,
        questiondescription: question.questiondescription,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        option4: question.option4,
        answers: question.answers,
        marks: question.marks
    });
    questionInstance.save(function(err){
        if(err) throw err;
        callback();
    });
}

function updatequestion(question, callback){
    questions.updateOne({'questionname': question.questionname}, question, function(err){
        if(err) throw err;
        callback();
    });
}

function deletequestion(question, callback){
    questions.deleteOne({ 'questionname': question.questionname}, function(err){
        if(err) throw err;
        callback();
    })
}

function getcoursequestions(requiredcourse, callback){
    questions.
    find({ 'coursename': requiredcourse.coursename }).
    exec(function(err, result){
        if(err) throw err;
        callback(result);
    });    
}

module.exports = {connect, addcourse, updatecourse, deletecourse, getallcourses, addquestion, updatequestion, deletequestion, getcoursequestions}