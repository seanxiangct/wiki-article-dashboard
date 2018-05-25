google.charts.load('current', {packages: ['corechart']});


function drawPie(data)
{
    var options = {'title':"Revision number distribution by user type",
            'width': 500,
            'height': 400};
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

function drawBar(data)
{
    console.log(data)
    var options = {'title':"Revision number by year and by user type",
            'width': 500,
            'height': 400};

}

$(document).ready(function() {

    // $.getJSON('/userCounts',null, function(result) {
    //     drawPie(result);
    // });

    $.getJSON('/revisionByYear',null, function(result) {
        drawBar(result);
    });

})