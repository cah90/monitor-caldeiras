import {data} from './data.js'
import {makeGauge} from './graphs.js'

const monthSelect = document.getElementById("months")
const yearSelect = document.getElementById("years")
const graphValue = document.getElementById("oee")
const displayMonth = document.querySelector("div.header p")

function updateMonth(month, year) {
  const value = data[year][month]
  document.querySelector(".month-result .result p").innerHTML = `${value}%`
  graphValue.innerHTML = `${value}%`
  
  makeGauge('graph-oee', value)
}

function updateYear(year) {
  const values = data[year]
  let sum = 0

  for(let value in values) {
    sum += values[value]
  }

  let value = sum / 12
  value = Math.round(value)

  document.querySelector(".year-result .result p").innerHTML = `${value}%`
}

function updateDisplayMonth(month, year) {
  const months = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro"
  }

  displayMonth.innerHTML = `${months[month]} / ${year}`
}

monthSelect.addEventListener("change", (event) => {
  let month = event.target.value
  let year = yearSelect.value

  updateMonth(month, year)
  updateDisplayMonth(month, year)
})

yearSelect.addEventListener("change", (event) => {
  let month = monthSelect.value
  let year = event.target.value

  updateMonth(month, year)
  updateYear(year)
  updateDisplayMonth(month, year)
})

updateYear(2020)
updateMonth(1, 2020)

