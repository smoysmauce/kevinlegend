const datavisEl = document.getElementById("datavis");

Plotly.d3.csv("2019.csv", HappinessArray);

function HappinessArray(csvData){
    const data = [
        {
            x: csvData.map((row) => row.Country),
            y: csvData.map((row) => +row.GDP),
            mode: "markers",
        },
    ];

    Plotly.newPlot(datavisEl, data);
}
