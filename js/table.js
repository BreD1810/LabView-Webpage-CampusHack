
var labName = "Demo";
var numberOfRows = 4;
var computers = new Array();
    computers[0] = "Joel";
    computers[1] = "Sam";
    computers[2] = "Bradley";
    computers[3] = "Ankur";


function createTable(){
    var myTable= "<table class=\"center\"><tr><th style='width: 100px; color: red; text-align: center'>Computer</th>";
    myTable+= "<th style='width: 100px; color: red; text-align: center;'>Status</th>";
    for (let i = 0; i < computers.length; i++) {
        myTable+=  "<tr><td>ID: "+computers[i]+" </td>"
        myTable+=  "<td>OFF</td></tr>"
    }
    myTable+="</table>";
    document.write(myTable);
}

function getLabName(){
    return labName;
}