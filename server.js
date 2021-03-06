const express = require("express");
const bodyParser = require("body-parser");

const hbs = require("hbs");
const app = express();

const database = require("./database.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", express.static("public"));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", function (req, res) {
  res.send("hello world");
});

app.post("/courses", function (req, res) {
  console.log("trying to add course");
  database.addcourse(req.body, function () {
    console.log("added course");
    // res.sendStatus(200);
    res.redirect("/teacherlandingpage");
  });
});

app.patch("/courses", function (req, res) {
  console.log("trying to update course");
  database.updatecourse(req.body, function () {
    console.log("updated course");
    res.sendStatus(200);
  });
});

app.get("/courses/:coursename",function(req,res){
    console.log("trying to get course");
  database.getcourse(req.params.coursename, function (result) {
    console.log("got course");
    res.send(result);
  });
})

app.get("/courses/delete/:coursename", function (req, res) {
  console.log("trying to delete course");
  database.deletecourse(req.params.coursename, function () {
    console.log("deleted course");
    res.redirect("/teacherlandingpage");
  });
});

app.get("/courses", function (req, res) {
  console.log("trying to get list of courses");
  database.getallcourses(function (courses) {
    console.log("got list of courses");
    res.send(courses);
  });
});

app.post("/courses/questions", function (req, res) {
  console.log("trying to add question for a course");
  var arr = req.body.answers.split(",");
  const ans = arr.map((str) => {
    return parseInt(str);
  });

  req.body.answers = ans;

  database.addquestion(req.body, function () {
    console.log("added question for a course");
    res.redirect("/teachereditingquiz/" + req.body.coursename);
  });
});

app.patch("/courses/questions", function (req, res) {
  console.log("trying to update question for a course");
  database.updatequestion(req.body, function () {
    console.log("updated question for a course");
    res.sendStatus(200);
  });
});

app.get(
  "/courses/:coursename/deletequestions/:questionname",
  function (req, res) {
    console.log("trying to delete question for a course");
    database.deletequestion(req.params.questionname, function () {
      console.log("deleted question for a course");
      res.redirect("/teachereditingquiz/" + req.params.coursename);
    });
  }
);

app.get("/courses/:coursename/questions", function (req, res) {
  console.log("trying to get questions for a course");
  database.getcoursequestions(req.params.coursename, function (questions) {
    console.log("got questions for the course");
    res.send(questions);
  });
});

app.get("/studentlandingpage", function (req, res, next) {
  console.log("in student landing page");
  console.log("trying to get list of courses");
  database.getallcourses(function (courses) {
    console.log("got list of courses");
    res.render("studentLanding", { data: courses });
  });
});

app.get("/teacherlandingpage", function (req, res, next) {
  console.log("in teacher landing page");
  console.log("trying to get list of courses");
  database.getallcourses(function (courses) {
    console.log("got list of courses");
    res.render("teacherLanding", { data: courses });
  });
});

app.get("/studenttakingquiz/:coursename", function (req, res, next) {
  console.log("in student taking quiz page");
  console.log("trying to get questions for a course");
  console.log(req.params.coursename);
  database.getcoursequestions(req.params.coursename, function (questions) {
    console.log("got questions for the course");
    console.log(questions);
    res.render("quiz", { data: questions, course: req.params.coursename });
  });
});

app.get("/teachereditingquiz/:coursename", function (req, res, next) {
  console.log("in teacher editing quiz page");
  console.log("trying to get questions for a course");
  console.log(req.params.coursename);
  database.getcoursequestions(req.params.coursename, function (questions) {
    console.log("got questions for the course");
    res.render("editquiz", {
      data: questions,
      coursename: req.params.coursename,
    });
  });
});

app.get("/addCourse", function (req, res) {
  res.render("addquiz");
});

app.get("/editcourse/:coursename", function (req, res) {
    database.getcourse(req.params.coursename, function (result) {
        console.log("got course");
        res.render("editcourse",{data: result});
      });
});

app.get("/addQuestion/:coursename", function (req, res) {
  res.render("addquestion", { coursename: req.params.coursename });
});

app.listen(process.env.PORT || 7762, function () {
  console.log("server running on port 7762");
  database.connect();
});
