"use strict"


const launchChart = document.getElementById('launchChart');
let successfulLaunches = []
let failedLaunches = [];
const yearOfSuccessfulLaunch = [];
const yearOfFailedLaunch = [];
const numOfSuccessfulLaunchEachYear = [];
const numOfFailedLaunchEachYear = [];

// [1, 1, 1, 1, 1, 8]

//// PLOTLY ////
const successes = {
    x: yearOfSuccessfulLaunch,
    y: numOfSuccessfulLaunchEachYear,
    mode: 'markers',
    name: 'successes',
    marker: {size: 6, color: '#0f0'},
    type: 'bar'
};
  
const failures = {
    x: yearOfFailedLaunch,
    y: [1, 1, 1, 1, 1, 8],
    mode: 'markers',
    name: 'failures',
    marker: {size: 6, color: '#f00'},
    type: 'bar'
};

const data = [successes, failures];

const layout = {
    barmode: 'stack',
    title: 'SpaceX Launches',
    showlegend: true,
    xaxis: {
        title: 'year of launch',
        titlefont: {size: 16},
        range: [2004, 2024]
    },
    yaxis: {
        title: '# of launches',
        titlefont: {size: 16},
        range: [0, 1500]
    },
}

/// END ///
function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}


/// API Request ///
axios.get('https://api.spacexdata.com/v4/launches').then((res) => {

    const allLaunches = res.data;

    for (let launch of allLaunches) {

        if (launch.success) {

            successfulLaunches.push(launch.name);
            let d = new Date(launch.date_local);
            yearOfSuccessfulLaunch.push(d.getFullYear());

        } else {

            failedLaunches.push(launch.name);
            let d = new Date(launch.date_local);
            yearOfFailedLaunch.push(d.getFullYear());
            
        }
    }
    
    for (const year of yearOfSuccessfulLaunch) {
        const numOfSuccessfulLaunches = getOccurrence(yearOfSuccessfulLaunch, year)
        numOfSuccessfulLaunchEachYear.push(numOfSuccessfulLaunches);
    }

    for (const year of yearOfFailedLaunch) {
        const numOfFailedLaunches = getOccurrence(yearOfFailedLaunch, year)
        numOfFailedLaunchEachYear.push(numOfFailedLaunches);
    }

    console.log('list of num of failed launches: ', numOfFailedLaunchEachYear);
    console.log('successful launches: ', successfulLaunches);
    console.log('failed launches: ', failedLaunches);
    console.log('years of successful launches: ', yearOfSuccessfulLaunch);
    console.log('years of failed launches: ', yearOfFailedLaunch);


}).catch((err) => {
    console.log(err);
}).then(() => {
    Plotly.newPlot(launchChart, data, layout);
})
/// END ///