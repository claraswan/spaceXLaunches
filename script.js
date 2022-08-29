"use strict"



const launchChart = document.getElementById('launchChart');

//// PLOTLY ////
const successes = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
};
  
const failures = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    mode: 'markers',
    type: 'scatter'
};

const data = [successes, failures];

const layout = {
    title: 'SpaceX Launches',
    showlegend: true,
}

Plotly.newPlot(launchChart, data, layout);
/// END ///