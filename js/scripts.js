$(document).ready(function(){
    function testAjax() {
        $.ajax({
            url: "TestProject/HelloWorld", 
            success: function(){
                alert("IT WORKED");
            }
        });
    }
   
    $.fn.placeName =function(name) {
        $("#ptitle").text("This is the "+name+" lab")
    }
    
});