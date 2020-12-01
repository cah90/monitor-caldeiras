import {daily} from './data.js'

let opts = {
  angle: -0.2, // The span of the gauge arc
  lineWidth: 0.1, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.6,
    strokeWidth: 0.035, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false, // If false, max value increases automatically if value > maxValue
  limitMin: false, // If true, the min value of the gauge will be fixed
  colorStart: '#6FADCF', // Colors
  colorStop: '#8FC0DA', // just experiment with them
  strokeColor: '#E0E0E0', // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true, // High resolution support
  percentColors: [
    [0.0, "#ff0000"],
    [0.80, "#f9c802"],
    [1.0, "#73f468"]
  ],
  staticLabels: {
    font: "10px sans-serif", // Specifies font
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // Print labels at these values
    color: "#000000", // Optional: Label text color
    fractionDigits: 0 // Optional: Numerical precision. 0=round off.
  },
};

function makeGauge(id, value) {
  let target = document.getElementById(id); // your canvas element
  let gauge = new Gauge(target).setOptions(opts); 
  gauge.maxValue = 100; // set max gauge value
  gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
  gauge.animationSpeed = 22; // set animation speed (32 is default value)
  gauge.set(value); // set actual value  
}

makeGauge('graph-availability', 55)
makeGauge('graph-performance', 78)
makeGauge('graph-quality', 90)


// BAR CHART
function getDaysInMonth(month, year) {
  const lastDayInMonth = new Date(year, month, 0).getDate();
  let daysInMonth = []

  for (let i = 1; i <= lastDayInMonth; i++) {
    daysInMonth.push(i)
  }
  return daysInMonth
}

function repeatNumber() {
  let arr = []

  for (let i = 0; i <= 31; i++) {
    arr.push(80)
  }
  return arr
}


function getBarChart(id, month, year) {
  var ctx = document.getElementById(id).getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getDaysInMonth(month, year),
      datasets: [
        {
        label: 'OOE Mensal',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: Object.values(daily[year][month])
      },
      {
        label: 'Média',
        borderColor: '#B6DF41',
        data: repeatNumber(),
        type: 'line'
      }],
    },
    options: {
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }],

        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            steps: 10,
            stepValue: 5,
            max: 100
          }
        }] /// yAxes
      } /// scales

    } // options
  })
}
  getBarChart("myChart", 1, 2020)

export {makeGauge}