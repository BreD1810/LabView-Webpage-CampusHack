var labName = "";
var computerIDs =new Array();;

    function getTable(){
        $.ajax({
            type: "GET",
            url: "http://labview.me:8080/LabView/clientlist", 
            success: function(data){
                var computers = data.split("\n");
                console.log(data);           
                createTable(computers);
                setTimeout(function(){ 
                    getTable();
                }, 60000); 
            }, 
            error: function(){
                alert("fail");
                setTimeout(function(){ 
                    getTable();
                }, 15000); 
            }
        });
      
    }
    function getDetailedTable(urlString){
        $.ajax({
            type: "GET",
            url: "http://labview.me:8080/LabView/detailedclientlist", 
            success: function(data){
                var computers = data.split("\n");
                console.log(data);
                createDetailedTable(computers);
                setTimeout(function(){ 
                    getDetailedTable();
                }, 60000); 
            }, 
            error: function(){
                alert("fail");
                setTimeout(function(){ 
                    getDetailedTable();
                }, 15000); 
            }
        });
      
    }
function createTable(computers){
    $("#Lab1Table").html("");
    var myTable= "<table class=\"center\"><tr><th style='width: 150px; color: red; text-align: center'>Computer</th>";
    myTable+= "<th style='width: 50px; color: red; text-align: center;'>Status</th>";
    for (let i = 0; i < computers.length-1; i++) {
        var compStats = computers[i].split(",");
        computerIDs[i] = compStats[0]
        myTable+=  "<tr><td>ID: "+compStats[0]+" </td>";
        if(compStats[1] == "0"){
            myTable+=  "<td style='background-color: red;'>"+compStats[1]+"</td></tr>";
        }else{
            myTable+=  "<td style='background-color: green;'>"+compStats[1]+"</td></tr>";
        }
         
    }
    myTable+="</table>";
    $("#Lab1Table").append(myTable);
}
function createDetailedTable(computers){
    var count=0;
    $("#Lab1Table").html("");
    var myTable= "<table class=\"center\"><tr><th style='width: 100px; color: red; text-align: center'>ID</th>";
    myTable+= "<th style='width: 100px; color: red; text-align: center;'>Name</th>";
    myTable+= "<th style='width: 50px; color: red; text-align: center;'>Status</th>";
    myTable+= "<th style='width: 300px; color: red; text-align: center;'>Date</th>";
    myTable+= "<th style='width: 500px; color: red; text-align: center;'>Log</th>";
    for (let i = 0; i < computers.length-1; i++) {
        var compStats = computers[i].split(",");
        if(compStats[1]!=null){
            computerIDs[count] = compStats[0]
            count++;
            myTable+="<tr><td>"+compStats[0]+" </td>";
            myTable+="<td>"+compStats[1]+"</td>"; 
            if(compStats[2] == "0"){
                myTable+=  "<td style='background-color: red;'>"+compStats[2]+"</td>";     
            }else{
                myTable+=  "<td style='background-color: green;'>"+compStats[2]+"</td>";
            }
            myTable+="<td>"+compStats[3]+"</td>"; 
            myTable+="<td><a href=\"http://labview.me:8080/LabView/logfile?name="+compStats[1]+"\">"+compStats[4]+"</a></td></tr>"; 
        }      
    }
    myTable+="</table>";
    $("#Lab1Table").append(myTable);
}
function openTab(evt, labName){
    var tablinks, tabcontent;
    tablinks = $(".tablink");
    tabcontent =$(".tabcontent");
  
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
   
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active","");         
    }
    
    document.getElementById(labName).style.display = "block";
    this.labName = labName;
    localStorage.setItem("labName", labName);
    evt.currentTarget.className += " active";    
}
function addClient(){
    var clientID =0;
    for(let i=0; i<=computerIDs.length; i++){       
        clientID=i+1;
    }
    var clientName = document.getElementById("clientName").value;
    var labNum = document.getElementById("labNumber").value;
    $.ajax({
        type: "POST",
        url: "http://labview.me:8080/LabView/addclient",
        data: {id:clientID, name:clientName, labNumber: labNum},
        error: function(){
            alert("Failed to connect");
        }
    });
}
function setActiveTab(){
   
    var labName = localStorage.getItem("labName");
    document.getElementById(labName).style.display = "block";
    
}
