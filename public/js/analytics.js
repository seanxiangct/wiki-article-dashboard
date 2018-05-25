google.charts.load('current', {packages: ['corechart']});

var options = {'title':"test",
        'width':400,
        'height':300};

function drawPie(data)
{
    console.log(data);
    graphData = new google.visualization.DataTable();
    // defineing data table columns
    // addColumn(data type, column name)
    graphData.addColumn('string', 'User Type');
    graphData.addColumn('number', 'Proportion');
    
    // inserting data into the data table
    $.each(data, function(key, val) {
        graphData.addRow([key, val]);
    })
    var chart = new google.visualization.PieChart($("#chart")[0]);
    chart.draw(graphData, options);
}

$(document).ready(function() {

    $.getJSON('/userCounts',null, function(result) {
        drawPie(result);
    });

})