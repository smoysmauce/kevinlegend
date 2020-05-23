const datavisEl = document.getElementById("datavis");
const RankB = document.getElementById("RankID");
const GDPB = document.getElementById("GDPID");
const LifeB = document.getElementById("LifeID");
const FreedomB = document.getElementById("FreedomID");
const GenerosityB = document.getElementById("GenerosityID");
const CorruptionB = document.getElementById("CorruptionID");
const slider = document.getElementById("slider");

var factor = "Rank";
var rangeBot;
var rangeTop;
var prevLine;

Plotly.d3.csv("HappinessDataset.csv", HappinessArray);

function HappinessArray(csvData){
    const continentColours = csvData.map((row) => row.Continent);

    // runs when called
    function setPlot(factor, year) {
        var yearCsvData = csvData.filter( data => data.Year === year.toString());
        //const chosenYear = yearCsvData.map((row) => row.Country);
        var chosenFactor;

        if (factor === "Rank") {
            chosenFactor = yearCsvData.map((row) => +row.Rank);
            rangeTop = 0;
            rangeBot = 1.1*Math.max(...chosenFactor);
        } else if (factor === "GDP") {
            chosenFactor = yearCsvData.map((row) => +row.GDP);
            rangeTop = 1.1*Math.max(...chosenFactor);
            rangeBot = 0;
        } else if (factor === "Life") {
            chosenFactor = yearCsvData.map((row) => +row.Life);
            rangeTop = 1.1*Math.max(...chosenFactor);
            rangeBot = 0;
        } else if (factor === "Freedom") {
            chosenFactor = yearCsvData.map((row) => +row.Freedom);
            rangeTop = 1.1*Math.max(...chosenFactor);
            rangeBot = 0;
        } else if (factor === "Generosity") {
            chosenFactor = yearCsvData.map((row) => +row.Generosity);
            rangeTop = 1.1*Math.max(...chosenFactor);
            rangeBot = 0;
        } else if (factor === "Corruption") {
            chosenFactor = yearCsvData.map((row) => +row.Corruption);
            rangeTop = 1.1*Math.max(...chosenFactor);
            rangeBot = 0;
        }
        //console.log(chosenFactor)
        
        const animateLayout = { layout: {
            title: factor,
            yaxis: { range: [rangeBot, rangeTop]}
        }};

        const animateLine = {
            data: [{ y: chosenFactor }], 
            color: "rgb(49,49,49)",
            traces: [0],
        };

		const animationOptions = {
			transition: {easing: "cubic-in-out", duration: 500}
		};

		Plotly.animate(datavisEl, animateLayout, animationOptions);
		setTimeout(() => Plotly.animate(datavisEl, animateLine, animationOptions), 550);
    }

    function setInitialPlot (year) {
        var yearCsvData = csvData.filter( data => 
            data.Year === year.toString());

        const trace = {
            y: yearCsvData.map((row) => +row.Rank),
            type: "scatter",
            mode: 'lines+markers',
            marker: {
                size: 12,
                opacity: 0.5,
                color: continentColours.map((Continent) => {
                    if (Continent === "Oceania") {
                        return "#335C67";
                    } else if (Continent === "Europe") {
                        return "#ff1654";
                    } else if (Continent === "North America") {
                        return "#e09f3e";
                    } else if (Continent === "South America") {
                        return "#9e2a2b";
                    } else if (Continent === "Asia") {
                        return "#540b0e";
                    } else if (Continent === "Africa") {
                        return "#245501";
                    }
                }),
            },
            line: {
                simplify: false,
                color: "rgb(49,49,49)",
            },
            name: 'Visualisation',
        };

        const data = [trace];
        const layout = { 
            yaxis: {range: [150, 0]},
            title: 'Rank' 
        };

        Plotly.newPlot(datavisEl,data,layout);
    }

    //runs it back here
    RankB.addEventListener("click", function () {
        factor = "Rank";
        setPlot(factor, slider.value);
    });
    
    GDPB.addEventListener("click", function () {
        factor = "GDP";
        setPlot(factor, slider.value);
    });

    LifeB.addEventListener("click", function () {
        factor = "Life";
        setPlot(factor, slider.value);
    });

    FreedomB.addEventListener("click", function () {
        factor = "Freedom"
        setPlot(factor, slider.value);
    });

    GenerosityB.addEventListener("click", function () {
        factor = "Generosity";
        setPlot(factor, slider.value);
    });

    CorruptionB.addEventListener("click", function () {
        factor = "Corruption";
        setPlot(factor, slider.value);
    });

    slider.addEventListener("change", function () {
        setPlot(factor, slider.value)
    });

    setInitialPlot(slider.value);
}
