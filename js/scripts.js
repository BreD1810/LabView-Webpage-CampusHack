var labName = "";
var maxComputerIDs = new Array();
    function getTable(labNum){
        $.ajax({
            type: "GET",
            data: {labNumber: labNum},
            url: "http://labview.me:8080/LabView/clientlist", 
            success: function(data){
                var computers = data.split("\n");
                console.log(data);           
                createTable(computers, labNum);
                if(labNum === labName){
                    setTimeout(function(){
                        getTable(labNum);
                    }, 60000);
                }
            }, 
            error: function(){
                setTimeout(function(){ 
                    getTable();
                }, 15000); 
            }
        });   
    }
    function getDetailedTable(){
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
                setTimeout(function(){ 
                    getDetailedTable();
                }, 15000); 
            }
        });
      
    }
function createTable(computers, labNum){
    $("#"+labNum+"Table").html("");
    var myTable= "<table class=\"center\"><tr><th style='width: 150px; color: red; text-align: center'>Computer</th>";
    myTable+= "<th style='width: 50px; color: red; text-align: center;'>Status</th>";
    for (let i = 0; i < computers.length-1; i++) {
        var compStats = computers[i].split(",");
        myTable+=  "<tr><td>ID: "+compStats[0]+" </td>";
        if(compStats[1] == "0"){
            myTable+=  "<td style='background-color: red;'>"+compStats[1]+"</td></tr>";
        }else{
            myTable+=  "<td style='background-color: green;'>"+compStats[1]+"</td></tr>";
        }
         
    }
    myTable+="</table>";
    $("#"+labNum+"Table").append(myTable);
}
function createDetailedTable(computers){
    var count=1, currentID=0, distanceFromLastPC=0, currentLab=1;
    $("#Lab1Table").html("");
    var myTable= "<table class=\"center\"><tr><th style='width: 100px; color: red; text-align: center'>Lab Number</th>";
    myTable+= "<th style='width: 100px; color: red; text-align: center;'> Client ID</th>";
    myTable+= "<th style='width: 100px; color: red; text-align: center;'>Name</th>";
    myTable+= "<th style='width: 50px; color: red; text-align: center;'>Status</th>";
    myTable+= "<th style='width: 300px; color: red; text-align: center;'>Date</th>";
    myTable+= "<th style='width: 500px; color: red; text-align: center;'>Log</th>"; 
    for (let i = 0; i < computers.length-1; i++) {
        var compStats = computers[i].split(",");
        if(compStats[1]>=1 && compStats[1] <= 100000){
            if(currentID>1){
                myTable+="</td></tr>";
            }
            if(currentLab == compStats[0].charAt(3)){
                currentID++;
            }else{
                maxComputerIDs[parseInt(compStats[0].charAt(3))] = currentID;
                currentID=1;
                count++;
                currentLab = compStats[0].charAt(3);
          
            }
    
            distanceFromLastPC=0;

            myTable+="<tr><td>"+compStats[0]+" </td>";
            myTable+="<td>"+compStats[1]+"</td>";
            myTable+="<td>"+compStats[2]+"</td>";
            if(compStats[3] == "0"){
                myTable+=  "<td style='background-color: red;'>"+compStats[3]+"</td>";     
            }else{
                myTable+=  "<td style='background-color: green;'>"+compStats[3]+"</td>";
            }
            myTable+="<td>"+compStats[4]+"</td><td>"; 
                 
        }else if(compStats[0]!=""){
            
            distanceFromLastPC++;
            var log = compStats[0];
            compStats = computers[i-distanceFromLastPC].split(",");
            myTable+="<a href=\"http://labview.me:8080/LabView/logfile?name="+compStats[2]+"\">"+log+"</a><br>";         
        }  
    }
    maxComputerIDs[count]=currentID;
    myTable+="</table>";
    $("#Lab1Table").append(myTable);
}
function openTab(evt, labName){
    this.labName = labName;
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
    evt.currentTarget.className += " active";    
}
function addClient(){
    var clientID;
    var clientName = document.getElementById("clientName").value;
    var labNum = document.getElementById("labNumber").value;
    if(maxComputerIDs[labNum.charAt(3)]>0){
        clientID=maxComputerIDs[labNum.charAt(3)]+1;
    }else{
        clientID = 1;
    }
    $.ajax({
        type: "POST",
        url: "http://labview.me:8080/LabView/addclient", //?id="+clientID.trim()+"&name="+clientName.trim()+"&labNumber="+labNum.trim()+"",
        data: {id: clientID, name: clientName, labNumber: labNum},
        success: function(){
            alert("Client added to server");
        },
        error: function(){
            alert("OH NO");
        }
    });
}

function setActiveTab(){ 
    document.getElementById("Lab1").style.display = "block";
}

/*
function xmlExample(){
    alert("HELLO");
    var template="";
    var fileLocation = "/xmlexample/example.xml";
    $.ajax({
        type: 'GET',
        url: "/xmlexample/example.xml",
        success: function(xml){
            alert(xml);
            var xmlDoc = $.parseXML(xml);
            alert(xmlDoc);
            $xml = $(xmlDoc);
            alert(xmlDoc);
            $xml.find('pc[name="BRADS-LAPTOP"] xLocation').each(function () {
                alert($(this).text)
            })
        }
    });
    
    
    alert(text);
    xmlDoc = $.parseXML(text)
}
    */

