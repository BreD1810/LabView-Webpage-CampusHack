$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "http://labview.me:8080/TestProject/HelloWorld", 
        success: function(data){
            alert("IT WORKED");
            $("#test").text(data);
            var lines = data.split("\r\n");
            var myTable= "<table class=\"center\"><tr><th style='width: 100px; color: red; text-align: center'>Computer</th>";
            myTable+= "<th style='width: 100px; color: red; text-align: center;'>Status</th>";
            for (let i = 0; i < lines.length; i++) {
                myTable+=  "<tr><td>ID: "+lines[i]+" </td>"
                myTable+=  "<td>OFF</td></tr>"
            }
            myTable+="</table>";
            document.write(myTable);
        }, 
        error: function(){
            alert("fail");
            $("#test").text("It Failed");
        }
    });
    
    $("#Table td").each(function(){
        if($(this).text()=="OFF"){
            $(this).css('background-color','#ff0000')
        }
    });

});