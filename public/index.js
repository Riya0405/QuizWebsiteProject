var btn1= $('#studentbtn');
var btn2= $('#teacherbtn');

btn1.on('click',function(){
    console.log("i am a student");
    $.get({url:'/studentlandingpage',success:function(result){
        window.location='/studentlandingpage';
    }})
});

btn2.on('click',function(){
    console.log("i am a teacher");
    $.get({url:'/teacherlandingpage',success:function(result){
        window.location='/teacherlandingpage';
    }})
});