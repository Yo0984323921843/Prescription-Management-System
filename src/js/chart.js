const xValues = ['2015','2016','2017','2018', '2019', '2020', '2021', '2022'];

const sales = document.getElementById('sales');
new Chart("sales", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        data: [26009, 21409, 10609, 40600, 10700],
        borderColor: "#FF005F",
        label:"yo",
        fill: false,
      },
      {
        data: [10060, 24000, 21000, 40000, 45000],
        borderColor: "#B693A8",
        fill: false,
      },
      {
        data: [30000, 24700, 32000, 28000, 16000],
        borderColor: "#312DEA",
        fill: false,
      },
    ],
  },
  options: {
    legend: { display: true,position:'right' },
  },
});

const xValues1 = [2018,2019, 2020,2021,2022];

new Chart("purchases", {
  type: "line",
  data: {
    labels: xValues1,
    datasets: [
      {
        data: [38860, 21140, 31060, 31060, 11070],
        borderColor: "red",
        fill: false,
      },
      {
        data: [31600, 20700, 21700, 31900, 32000],
        borderColor: "green",
        fill: false,
      },
      {
        data: [35000, 27700, 42000, 15000, 36000],
        borderColor: "blue",
        fill: false,
      },
    ],
  },
  options: {
    legend: { display: false },
  },
});

var demand = ["Lybrel", "Keppra", "Gaunfacine", "Topiramate", "Valsartan"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["#FF005F", "#98D33B", "#FFCA02", "#e8c3b9", "#1e7145"];

new Chart("demand", {
  type: "pie",
  data: {
    // labels: demand,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    title: {
      display: true,
      // text: "Demand"
    },
  },
});
var demand = ["Lybrel", "Keppra", "Gaunfacine", "Topiramate", "Valsartan"];
var supyValues = [5, 47, 44, 84, 65];
var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

new Chart("supply", {
  type: "pie",
  data: {
    // labels: demand,
    datasets: [
      {
        backgroundColor: barColors,
        data: supyValues,
      },
    ],
  },
  options: {
    title: {
      display: true,
      // text: "Demand"
    },
  },
});
// Revenuw chart
var demand = ["Lybrel", "Keppra", "Gaunfacine", "Topiramate", "Valsartan"];
const revyValues = [25, 89, 24, 24, 35];
var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

new Chart("revenue", {
  type: "pie",
  data: {
    // labels: demand,
    datasets: [
      {
        backgroundColor: barColors,
        data: revyValues,
      },
    ],
  },
  options: {
    title: {
      display: true,
      // text: "Demand"
    },
  },
});

// revenue chart end
//profit chart
var demand = ["Lybrel", "Keppra", "Gaunfacine", "Topiramate", "Valsartan"];
const profityValues = [5, 49, 44, 24, 75];
var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

new Chart("profit", {
  type: "pie",
  data: {
    // labels: demand,
    datasets: [
      {
        backgroundColor: barColors,
        data: profityValues,
      },
    ],
  },
  options: {
    title: {
      display: true,
      // text: "Demand"
    },
  },
});

// profit chart end