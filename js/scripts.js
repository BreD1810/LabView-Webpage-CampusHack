var computers;
var labName = "Demo";

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "http://labview.me:8080/TestProject/HelloWorld", 
        success: function(data){
            alert("IT WORKED");
            var computers = data.split("\r\n");
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

function createTable(){

    var myTable= "<table class=\"center\"><tr><th style='width: 100px; color: red; text-align: center'>Computer</th>";
    myTable+= "<th style='width: 100px; color: red; text-align: center;'>Status</th>";
    for (var computer in computers) {
        var compParts = computer.split(",");
        myTable+=  "<tr><td>ID: "+compParts[0]+" </td>"
        myTable+=  "<td>"+compParts[1]+"</td></tr>"
    }
    myTable+="</table>";
    document.write(myTable);
}

function getLabName(){
    return labName;
}