var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var courseSchema = new Schema(
  {
    coursename: String,
    coursedescription: String
  }
);

var courses = mongoose.model('coursesdb', courseSchema);

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

module.exports = {connect, addcourse}