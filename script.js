"use strict"

import Chart from 'chart.js/auto';

const Chart = require('chart.js');
const ctx = document.getElementById('launchChart').getContext('2d');

const launchChart = new Chart(ctx,  {
            type: "scatter",
            data: {},
            options: {}
        });