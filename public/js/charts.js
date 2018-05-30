google.charts.load('current', {packages: ['corechart', 'bar']});

google.charts.setOnLoadCallback(load_charts);

// main conditional charts wrapper
function load_charts()
{
    if ($("#analysis").hasClass('group')){
        google.charts.setOnLoadCallback(group_charts);
    }
    else if ($("#analysis").hasClass('individual')){
        google.charts.setOnLoadCallback(individual_charts);
    }
    else if ($("#analysis").hasClass('author')){
        google.charts.setOnLoadCallback(author_charts);
    }
    else{
        google.charts.setOnLoadCallback(group_charts);
    }
}

function group_charts()
{
    group_bar();
    group_pie();
}

function individual_charts()
{
    $(document).on('click', '#titleokay', function(){
        var titleInput = {title: $("#titlelist").val()};
        $.getJSON('/individualBar', titleInput, function(data) {
            draw_bar(data);
        });
        $.getJSON('/individualPie', titleInput, function(data) {
            draw_pie(data);
        });
        $.getJSON('/individualUserBar', titleInput, function(data) {
            draw_bar_user(data);
        });

    });
}

function author_charts()
{

}

function group_pie()
{
    $.getJSON('/groupPie',null, function(data) {

        draw_pie(data);

    });
}

function group_bar()
{
    $.getJSON('/groupBar',null, function(data) {

        draw_bar(data);

    });
}

function draw_pie(data)
{
        var options = {
                width: 400,
                height: 300
            };
        graphData = new google.visualization.DataTable();
        // defineing data table columns
        // addColumn(data type, column name)
        graphData.addColumn('string', 'User Type');
        graphData.addColumn('number', 'Proportion');
        
        // inserting data into the data table
        $.each(data, function(key, val) {
            graphData.addRow([key, val]);
        })
        var chart = new google.visualization.PieChart($("#pie-chart")[0]);
        chart.draw(graphData, options);
}


function draw_bar(data)
{

    // find the year range
    years = [];
    for (var i in data)
        years.push(data[i]._id.year)

    var min = Math.min.apply(null, years),
        max = Math.max.apply(null, years);

    var options = {
        width: 950,
        height: 300,
        hAxis: {
            title: 'Year',
            minValue: 2001
        },
        vAxis: {
            0: {title: 'Revisions'}
        }
    };


    // convert json data into data table
    var data_matrix = new Array(max - min + 1);
    var cols = ['Year', 'Admin', 'Regular User', 'Anonymous', 'Bot'];
    for (var i = 0; i < data_matrix.length; i++)
    {
        data_matrix[i] = new Array(5);
    }

    var row_index = 0;
    var current = min;
    // data.forEach( function(element, index) {
    for (var i = 0; i < data.length; i++)
    {
        if (typeof data_matrix[row_index][0] === 'undefined')
        {
            data_matrix[row_index][0] = data[i]._id.year.toString();
        }

        if (data[i]._id.user_type == 'admin')
            data_matrix[row_index][1] = data[i].count;
        else if (data[i]._id.user_type == 'reg')
            data_matrix[row_index][2] = data[i].count;
        else if (data[i]._id.user_type == 'anon')
            data_matrix[row_index][3] = data[i].count;
        else if (data[i]._id.user_type == 'bot')
            data_matrix[row_index][4] = data[i].count;

        if (typeof data[i+1] != 'undefined' && 
            data[i+1]._id.year == (current+1))
        {
            current++;
            row_index++;
        }
    }

    // adding x axis labels 
    data_matrix.unshift(cols);

    data = new google.visualization.arrayToDataTable(data_matrix);

    var chart = new google.charts.Bar(document.getElementById('bar-chart'));
    chart.draw(data, options);

}

function draw_bar_user(data)
{
    // find the year range
    // find the user with the longest revision history
    var sample;
    var longest = 0;
    for (var i in data)
    {
        var d = data[i][1]
        var len = d.length;
        if (len > longest)
        {
            sample = d;
            longest = len;
        }

    }

    var years = [];
    for (var i in sample)
    {
        years.push(sample[i]._id.year)
    }

    var min = Math.min.apply(null, years),
        max = Math.max.apply(null, years);

    var options = {
        width: 950,
        height: 300,
        hAxis: {
            title: 'Year'
        },
        vAxis: {
            title: 'Count'
        }
    };


    // convert json data into data table
    var data_matrix = new Array(years.length);

    // generate column names
    var cols = ['Year'];
    for (var i = 0; i < data.length; i++)
    {
        cols[i+1] = data[i][0];
    }

    // create data matrix
    for (var i = 0; i < data_matrix.length; i++)
    {
        data_matrix[i] = new Array(cols.length);
        data_matrix[i][0] = years[i].toString();
    }

    for (var i = 0; i < data.length; i++)
    {
        // user is the user name of the selected user
        var user = data[i][0];
        // counts is a list of counts by year
        var counts = data[i][1];

        var col_index = cols.indexOf(user);
        for (var j = 0; j < counts.length; j++)
        {
            data_matrix[j][col_index] = counts[j].count;

        }
    }

    // adding x axis labels 
    data_matrix.unshift(cols);

    data = new google.visualization.arrayToDataTable(data_matrix);

    var chart = new google.charts.Bar(document.getElementById('bar-chart-2'));
    chart.draw(data, options);    
}
