var labName = "";

var computerIDs = new Array();

    function getTable(){
        $.ajax({
            type: "GET",
            url: "http://labview.me:8080/LabView/clientlist", 
            success: function(data){
                var computers = data.split("\n");
                console.log(data);
                $("#test").text(computers[1]);
                createTable(computers);
                setTimeout(function(){ 
                    getTable();
                }, 60000); 
            }, 
            error: function(){
                alert("fail");
            }
        });
      
    }
    getTable();    

function createTable(computers){
    $("#Lab1Table").html("");
    var myTable= "<table class=\"center\"><tr><th style='width: 100px; color: red; text-align: center'>Computer</th>";
    myTable+= "<th style='width: 100px; color: red; text-align: center;'>Status</th>";
    for (let i = 0; i < computers.length-1; i++) {
        var compStats = computers[i].split(",");
        computerIDs[i] = compStats[1]
        myTable+=  "<tr><td>ID: "+compStats[0]+" </td>"
        myTable+=  "<td>"+compStats[1]+"</td></tr>"      
    }
    myTable+="</table>";
/*
    for (var i = 0, cell; cell = myTable.cells[i]; i++) {
        alert($this.text)();
        if($(this).text().indexOf("0") != -1){
            alert($this.text());
            $(this).css('background-color','#ff0000')
        } else if($(this).text().indexOf("1") != -1){
            $(this).css('background-color','#00ff00')
        }
    }
    */
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
    var clientID = document.getElementById("clientID").value;
    alert(clientID);
    var clientName = document.getElementById("clientName").value;
    var packet = ""+ clientID + " " + clientName;
    $.ajax({
        type: "POST",
        url: "http://labview.me:8080/LabView/addclient",
        data: packet,
        success: function(){
            alert("Connection successful");
        },
        error: function(){
            alert("Fail");
        }
    });
}
function setActiveTab(){
   
    var labName = localStorage.getItem("labName");
    document.getElementById(labName).style.display = "block";
    localStorage.setItem("labName", "");
}
