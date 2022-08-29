"use strict"


const launchChart = document.getElementById('launchChart');
let successfulLaunches = []
let failedLaunches = [];

/// API Request ///
axios.get('https://api.spacexdata.com/v4/launches').then((res) => {

    const allLaunches = res.data;

    for (let launch of allLaunches) {

        if (launch.success === false) {
            successfulLaunches.push(launch.name);
        } else if (launch.success === true) {
            failedLaunches.push(launch.name);
        }
    }

    console.log(successfulLaunches);
    console.log(failedLaunches);


}).catch((err) => {
    console.log(err);
})
/// END ///


//// PLOTLY ////
const successes = {
    x: [2006, 2009, 2016, 2022],
    y: [10, 15, 13, 17],
    mode: 'markers',
    name: 'successes',
    marker: {size: 6, color: '#0f0'},
    type: 'scatter'
};
  
const failures = {
    x: [2006, 2009, 2016, 2022],
    y: [16, 5, 11, 9],
    mode: 'markers',
    name: 'failures',
    marker: {size: 6, color: '#f00'},
    type: 'scatter'
};

const data = [successes, failures];

const layout = {
    title: 'SpaceX Launches',
    showlegend: true,
    xaxis: {
        range: [2004, 2024]
    },
    yaxis: {
        range: [0, 20]
    },
}

Plotly.newPlot(launchChart, data, layout);
/// END ///