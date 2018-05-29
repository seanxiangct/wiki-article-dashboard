google.charts.load('current', {packages: ['corechart', 'bar']});


google.charts.setOnLoadCallback(load_charts);

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

function drawPie()
{
    $.getJSON('/userCounts',null, function(data) {

        let options = {
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

    });
}

function drawBar()
{
    $.getJSON('/revisionByYear',null, function(data) {

        let options = {
            width: 950,
            height: 300,
            hAxis: {
                title: 'Year',
                minValue: 2001,
                maxValue: 2018
            },
            vAxis: {
                0: {title: 'Revisions'}
            }
        };

        let data_matrix = new Array(18);
        let cols = ['Year', 'Admin', 'Regular User', 'Anonymous', 'Bot'];
        for (let i = 0; i < data_matrix.length; i++)
        {
            data_matrix[i] = new Array(5);
        }
        let row_index = 0;
        let current = 2001;
        // data.forEach( function(element, index) {
        for (let i = 0; i < data.length; i++)
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
        data_matrix.unshift(cols);

        data = new google.visualization.arrayToDataTable(data_matrix);

        var chart = new google.charts.Bar(document.getElementById('bar-chart'));
        chart.draw(data, options);


    });
}

function group_charts()
{
    drawBar();
    drawPie();
}

function drawBarForArticle(data)
{

    let options = {
        width: 950,
        height: 300,
        hAxis: {
            title: 'Year',
            minValue: 2001,
            maxValue: 2018
        },
        vAxis: {
            0: {title: 'Revisions'}
        }
    };

    let data_matrix = new Array(18);
    let cols = ['Year', 'Admin', 'Regular User', 'Anonymous', 'Bot'];
    for (let i = 0; i < data_matrix.length; i++)
    {
        data_matrix[i] = new Array(5);
    }
    let row_index = 0;
    let current = 2001;
    // data.forEach( function(element, index) {
    for (let i = 0; i < data.length; i++)
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
    data_matrix.unshift(cols);

    data = new google.visualization.arrayToDataTable(data_matrix);

    var chart = new google.charts.Bar(document.getElementById('bar-chart'));
    chart.draw(data, options);

}


function individual_charts()
{
    $(document).on('click', '#titleokay', function(){
        var titleInput = {title: $("#titlelist").val()};
        $.getJSON('/revisionByYearForArticle', titleInput, function(data) {
            console.log(data);
            drawBarForArticle(data);

        });
    });
}

function author_charts()
{

}

function show_bar()
{
    console.log('bar')
    // document.getElementById('bar-chart')
    $('#bar-chart').style.display = '';
    $('#pie-chart').style.display = 'none';
}

function show_pie()
{
    console.log('pie')
    $('#bar-chart').style.display = 'none';
    $('#pie-chart').style.display = '';
}