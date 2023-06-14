google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(getSpreadsheetData);

function getSpreadsheetData() {
    var spreadsheetId = '1I0AoQfK3QRzH1_cr715mEE1knCe_nbDTabRF7ZqeR7Y';
    var range = 'SALES_2!A1:C5';

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?gid=0&range=' + range);
    query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
    if (response.isError()) {
        console.error('Error: ' + response.getMessage());
        return;
    }

    var data = response.getDataTable();
    drawCharts(data);
}

function drawCharts(data) {
    var options_east = {
      title: "Grafik Total Harga Kategori Makanan di Negara East",
      width: 450,
      height: 300,
    };
  
    var options_west = {
      title: "Grafik Total Harga Kategori Makanan di Negara West",
      width: 450,
      height: 300,
    };
  
    var options_bar = {
      title: "Grafik Perbandingan Total Harga Makanan Menurut 2 Negara Bagian",
      width: 1000,
      height: 500,
    };
  
    var data_east = google.visualization.data.group(
        data,
        [0],
        [
          {
            column: 1,
            aggregation: google.visualization.data.sum,
            type: "number",
          },
        ]
      );
    
      var data_west = google.visualization.data.group(
        data,
        [0],
        [
          {
            column: 2,
            aggregation: google.visualization.data.sum,
            type: "number",
          },
        ]
      );
    
      var chart1 = new google.visualization.BarChart(
        document.getElementById("chart1")
      );
      chart1.draw(data, options_bar);
    
      var chart2 = new google.visualization.PieChart(
        document.getElementById("chart2")
      );
      chart2.draw(data_east, options_east);
    
      var chart3 = new google.visualization.PieChart(
        document.getElementById("chart3")
      );
      chart3.draw(data_west, options_west);
    
      var numberDisplay1 = document.getElementById("number1");
      var numberDisplay2 = document.getElementById("number2");
    
      function updateNumberDisplay(displayElement, number) {
        displayElement.textContent = number;
      }
    
      var totalEast = 0;
      for (var i = 0; i < data_east.getNumberOfRows(); i++) {
        totalEast += data_east.getValue(i, 1);
      }
      updateNumberDisplay(numberDisplay1, totalEast);
      updateProgressBar("progress1", totalEast, data_east.getNumberOfRows());
    
      var totalWest = 0;
      for (var i = 0; i < data_west.getNumberOfRows(); i++) {
        totalWest += data_west.getValue(i, 1);
      }
      updateNumberDisplay(numberDisplay2, totalWest);
      updateProgressBar("progress2", totalWest, data_west.getNumberOfRows());
    
      function updateProgressBar(progressId, value) {
        var progressElement = document.getElementById(progressId);
        progressElement.value = value;
        progressElement.max = 50000;
      }
}
