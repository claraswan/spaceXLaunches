"use strict"

const launchChart = document.getElementById('launchChart');
const yearOfSuccessfulLaunch = [];
const yearOfFailedLaunch = [];
let launchSuccesses = {};
let launchFailures = {};

function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}

//// PLOTLY ////
let data = [];

const layout = {
    barmode: 'stack',
    title: 'SpaceX Launches',
    showlegend: true,
    xaxis: {
        title: 'year of launch',
        titlefont: {size: 16},
        range: [2005, 2023]
    },
    yaxis: {
        title: '# of launches',
        titlefont: {size: 16},
        range: [0, 40]
    }
}
/// ///


/// API Request ///
axios.get('https://api.spacexdata.com/v4/launches').then((res) => {

    const allLaunches = res.data;

    for (let launch of allLaunches) {

        if (launch.success) {
            let d = new Date(launch.date_local);
            yearOfSuccessfulLaunch.push(d.getFullYear());
        } else {
            let d = new Date(launch.date_local);
            yearOfFailedLaunch.push(d.getFullYear());
        }
    }
    
    for (const year of yearOfSuccessfulLaunch) {
        const numOfSuccessfulLaunches = getOccurrence(yearOfSuccessfulLaunch, year)
        launchSuccesses[year] = numOfSuccessfulLaunches;
    }

    for (const year of yearOfFailedLaunch) {
        const numOfFailedLaunches = getOccurrence(yearOfFailedLaunch, year)
        launchFailures[year] = numOfFailedLaunches;
    }

    const successes = {
        x: Object.keys(launchSuccesses),
        y: Object.values(launchSuccesses),
        mode: 'markers',
        name: 'successes',
        marker: {size: 6, color: '#55125A'},
        type: 'bar'
    };
      
    const failures = {
        x: Object.keys(launchFailures),
        y: Object.values(launchFailures),
        mode: 'markers',
        name: 'failures',
        marker: {size: 6, color: '#e06666'},
        type: 'bar'
    };
    
    data = [successes, failures];

}).then(() => {
    Plotly.newPlot(launchChart, data, layout);
}).catch((err) => {
    alert('Please reload the page.')
    console.log(err);
})