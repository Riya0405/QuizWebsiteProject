$('.editcourse').on('click',function(){
    console.log("editing course");
    var coursename = $(this).attr('id');
    $.get({url:`/editcourse/${coursename}`,success:function(result){
        window.location=`/editcourse/${coursename}`;
    }
});
})
