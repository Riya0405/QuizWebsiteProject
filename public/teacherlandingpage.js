$('.editquiz').on('click',function(){
    console.log("editing quiz");
    var coursename = $(this).attr('id');
    $.get({url:`/teachereditingquiz/${coursename}`,success:function(result){
        window.location=`/teachereditingquiz/${coursename}`;
    }
});
});