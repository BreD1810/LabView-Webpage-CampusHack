var computers;
var labName = "Demo";

//$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "http://labview.me:8080/TestProject/HelloWorld", 
        success: function(data){
            alert("IT WORKED");
            computers = data.split("\n");
            console.log(data);
            $("#test").text(computers[1]);
            createTable();
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

//});

function createTable(){
    $("#test").text(computers[0]);
    var myTable= "<table class=\"center\"><tr><th style='width: 100px; color: red; text-align: center'>Computer</th>";
    myTable+= "<th style='width: 100px; color: red; text-align: center;'>Status</th>";
    for (let i = 0; i < computers.length; i++) {
        var compStats = computers[i].split(",");
        myTable+=  "<tr><td>ID: "+compStats[0]+" </td>"
        myTable+=  "<td>"+compStats[1]+"</td></tr>"      
    }
    myTable+="</table>";
    $("#Table").append(myTable);
}

function getLabName(){
    return labName;
}