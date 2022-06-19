$('.takequiz').on('click',function(){
    console.log("taking quiz");
    var coursename = $(this).attr('id');
    $.get({url:`/studenttakingquiz/${coursename}`,success:function(result){
        window.location=`/studenttakingquiz/${coursename}`;
    }
});
})
