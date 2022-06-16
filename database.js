var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var courseSchema = new Schema(
  {
    coursename: String
  }
);

var questionSchema = new Schema(
    {
        description: String,
        option1: String,
        option2: String,
        option3: String,
        option4: String,
        answer: Number
    }  
);

var mongoDB = 'mongodb+srv://riyabajaj:riyabajaj@cluster0.ivoyaac.mongodb.net/quiz?retryWrites=true&w=majority';

function connect(){
    mongoose.connect(mongoDB, function(err){
        if(err) throw err;
        console.log("connected");
    })
}

module.exports = {connect}