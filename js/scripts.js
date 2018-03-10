var labName = "Demo";

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "http://labview.me:8080/labview/clientlist", 
        success: function(data){
            alert("IT WORKED");
            var computers = data.split("\n");
            console.log(data);
            $("#test").text(computers[1]);
            createTable(computers);
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

function createTable(computers){
    $("#test").text(computers[0]);
    var myTable= "<table class=\"center\"><tr><th style='width: 100px; color: red; text-align: center'>Computer</th>";
    myTable+= "<th style='width: 100px; color: red; text-align: center;'>Status</th>";
    for (let i = 0; i < computers.length-1; i++) {
        var compStats = computers[i].split(",");
        myTable+=  "<tr><td>ID: "+compStats[0]+" </td>"
        myTable+=  "<td>"+compStats[1]+"</td></tr>"      
    }
    myTable+="</table>";
    $("#Table").append(myTable);
}

function openTab(evt, labName){
    var tablinks, tabcontent;
    tablinks = document.getElementsByClassName("tablink");
    tabcontent = document.getElementsByClassName("tabcontent");
  
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
   
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active","");         
    }
    
    document.getElementById(labName).style.display = "block";
   
    evt.currentTarget.className += " active";  
   
}

function getLabName(){
    return labName;
}