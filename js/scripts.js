$(document).ready(function(){
    $.ajax({
        url: "text.txt", 
        success: function(){
            alert("IT WORKED");
        },
        error: function(){
            alert("fail");
        }
    });
    
});