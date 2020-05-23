const datavisEl = document.getElementById("datavis");
const buttonEl = document.getElementById("random-country");

Plotly.d3.csv("2019.csv", HappinessArray);

function HappinessArray(csvData) {
    function setPlot(chosenCountry, initialPlot) {

        if (initialPlot) {
            const trace = {
                x: csvData.map((row) => row.Country),
                y: csvData.map((row) => row.GDP),
                mode: "lines+markers",
                marker: {
                    size: 12,
                    opacity: 0.5,
                },
                line: {
                    simplify: false,
                },
            };

            const data = [trace];

            const layout = {
                title: 'pls work',
            };

            Plotly.newPlot(datavisEl, data, layout);
            return;
        }

    }

    buttonEl.addEventListener("click", function(){
        console.log('pls')
    });

    setPlot("")
}