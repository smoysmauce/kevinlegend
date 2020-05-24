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
slider.value = 2017;

Plotly.d3.csv("HappinessDataset.csv", HappinessArray);

function HappinessArray(csvData){
    // runs when called
    function setPlot(factor, year) {
        //TAKES ALL THE ROWS OF THAT YEAR
        var yearCsvData = csvData.filter( data => data.Year === year.toString());
        var chosenYear = yearCsvData.map((row) => row.Country);
        const continentColours = yearCsvData.map((row) => row.Continent);
        var chosenFactor;
        console.log("Set plots");
        console.log(yearCsvData);
        console.log(continentColours);

        if (factor === "Rank") {
            chosenFactor = yearCsvData.map((row) => +row.Rank);
            rangeTop = -10;
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

        
        const animateLayout = { layout: {
            yaxis: { 
                range: [rangeBot, rangeTop],
                zeroline: false,
                color: defaultStatus,
            },
            xaxis: {
                color: "#FFFCF6",
                zeroline: false,
            },
        }};

        const animateLine = {
            data: [{ 
                y: chosenFactor,
                x: chosenYear,
            }], 
            color: "rgb(49,49,49)",
            traces: [0],
            marker: { 
                size: 12,
                color: continentColours.map((Continent) => {
                    if (Continent === "Oceania") {
                        return "#72DD98";
                    } else if (Continent === "Europe") {
                        return "#8BE3FF";
                    } else if (Continent === "North America") {
                        return "#FFE36F";
                    } else if (Continent === "South America") {
                        return "#729298";
                    } else if (Continent === "Asia") {
                        return "#C03240";
                    } else if (Continent === "Africa") {
                        return "#5383B5";
                    }
                }),
            }
        };

		const animationOptions = {
			transition: {easing: "cubic-in-out", duration: 500}
		};

		Plotly.animate(datavisEl, animateLayout, animationOptions);
		setTimeout(() => Plotly.animate(datavisEl, animateLine, animationOptions), 1000);
    }

    //SETS FIRST PLOT
    function setInitialPlot (year) {
        var yearCsvData = csvData.filter( data => data.Year === year.toString());
        const continentColours = yearCsvData.map((row) => row.Continent);
        console.log("Initial");
        console.log(yearCsvData);
        console.log(continentColours);
        const trace = {
            x: yearCsvData.map((row) => row.Country),
            y: yearCsvData.map((row) => +row.Rank),
            type: "scatter",
            mode: 'lines+markers',
            marker: {
                size: 12,
                color: continentColours.map((Continent) => {
                    if (Continent === "Oceania") {
                        return "#72DD98";
                    } else if (Continent === "Europe") {
                        return "#8BE3FF";
                    } else if (Continent === "North America") {
                        return "#FFE36F";
                    } else if (Continent === "South America") {
                        return "#729298";
                    } else if (Continent === "Asia") {
                        return "#C03240";
                    } else if (Continent === "Africa") {
                        return "#5383B5";
                    }
                }),
            },
            line: {
                simplify: false,
                color: "#999999",
            },
            
            name: 'Visualisation',
        };

        const data = [trace];
        const layout = { 
            yaxis: {
                range: [150, -10],
                zeroline: false,
                color: "#C1A481",
            },
            xaxis: {
                color: "#FFFCF6",
                zeroline: false,
            },
            paper_bgcolor: "#FFFCF6",
            plot_bgcolor: "#FFFCF6",
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
        var image = document.getElementById('infoBox');
        image.src = "1x/GDP.png";
        var colour = document.getElementById('GDPID');
        color ="$4E4C53";
        setPlot(factor, slider.value);
    });

    LifeB.addEventListener("click", function () {
        factor = "Life";
        var image = document.getElementById('infoBox');
        image.src = "1x/Life.png";
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
    function changeImage() {
        
    }
}
