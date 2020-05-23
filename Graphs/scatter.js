const datavisEl = document.getElementById("datavis");

//buttons, gotta switch to dropdown probs
const RankB = document.getElementById("RankID");
const GDPB = document.getElementById("GDPID");
const LifeB = document.getElementById("LifeID");
const FreedomB = document.getElementById("FreedomID");
const GenerosityB = document.getElementById("GenerosityID");
const CorruptionB = document.getElementById("CorruptionID");

var SWITCH = 1;
var rangeBOT
var rangeTOP


Plotly.d3.csv("HappinessDataset.csv", HappinessArray);

function HappinessArray(csvData){
    const continentColours = csvData.map((row) => row.Continent);
    //runs when called
    function setPlot(SWITCH, initialPlot) {
        if (SWITCH == 1) {
            selection = csvData.map((row) => +row.Rank);
            rangeTOP = 0;
            rangeBOT = 156;
        }
        else if (SWITCH == 2) {
            selection = csvData.map((row) => +row.GDP);
            rangeTOP = 1.8;
            rangeBOT = 0;
        }
        else if (SWITCH == 3) {
            selection = csvData.map((row) => +row.Life);
            rangeTOP = 1.3;
            rangeBOT = 0;
        }
        else if (SWITCH == 4) {
            selection = csvData.map((row) => +row.Freedom);
            rangeTOP = 0.65;
            rangeBOT = 0;
        }
        else if (SWITCH == 5) {
            selection = csvData.map((row) => +row.Generosity);
            rangeTOP = 0.6;
            rangeBOT = 0;
        }
        else if (SWITCH == 6) {
            selection = csvData.map((row) => +row.Corruption);
            rangeTOP = 0.5;
            rangeBOT = 0;
        }
        const chosenYear = csvData.map((row) => row.Country);
        var chosenFactor = selection;

        //SETS UP THE FIRST GRAPH
        if (initialPlot) {
            const trace = {
                x: chosenYear,
                y: chosenFactor,
                type: "scatter",
                mode: 'lines+markers',
                marker: {
                    size: 12,
                    opacity: 0.5,
                    color: continentColours.map((Continent) => {
                        if (Continent === "Oceania") {
                            return "#335C67";
                        }
                        else if (Continent === "Europe") {
                            return "#ff1654";
                        }
                        else if (Continent === "North America") {
                            return "#e09f3e";
                        }
                        else if (Continent === "South America") {
                            return "#9e2a2b";
                        }
                        else if (Continent === "Asia") {
                            return "#540b0e";
                        }
                        else if (Continent === "Africa") {
                            return "#245501";
                        }
                    }),
                },
                line: {
                    simplify: false,
                    colour: "white",
                },
                name: 'Visualisation',
            };

            const data = [trace];

            const layout = {
                title: 'please work',
            };

            Plotly.newPlot(datavisEl,data,layout);
            return;
        };
        
        const animateLayout = {
			layout: {
                title: `plssss`,
                yaxis: { range: [rangeBOT, rangeTOP]},
            },
		};

		const animateLine = {
			data: [
				{
					x: chosenYear,
					y: chosenFactor,
				},
            ],
            colour: "white",
			traces: [0],
		};

		const animationOptions = {
			transition: {
				easing: "cubic-in-out",
				duration: 500,
			},
		};

		Plotly.animate(datavisEl, animateLayout, animationOptions);

		setTimeout(() => Plotly.animate(datavisEl, animateLine, animationOptions), 550);
    }

    //runs it back here
    RankB.addEventListener("click", function () {
        SWITCH = 1;
        setPlot(SWITCH, false);
        console.log(selection)
    });
    
    GDPB.addEventListener("click", function () {
        SWITCH = 2;
        setPlot(SWITCH, false);
        console.log(selection)
    });

    LifeB.addEventListener("click", function () {
        SWITCH = 3;
        setPlot(SWITCH, false);
        console.log(selection)
    });

    FreedomB.addEventListener("click", function () {
        SWITCH = 4;
        setPlot(SWITCH, false);
        console.log(selection)
    });

    GenerosityB.addEventListener("click", function () {
        SWITCH = 5;
        setPlot(SWITCH, false);
        console.log(selection)
    });

    CorruptionB.addEventListener("click", function () {
        SWITCH = 6;
        setPlot(SWITCH, false);
        console.log(selection)
    });

    setPlot(SWITCH, true);
}

