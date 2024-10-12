//초음파센서의 그래프를 그리는 자바스크립트
let useChartCtx = null;
let useChart = null;
let useChart_LABEL_SIZE = 20;
let useChart_tick = 0;
let useChartCanvas = null
let useChartConfig = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '초음파 측정',
            backgroundColor: 'pink',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 3,
            data: [],
            fill: false,
        }]
    },
    options: {
        responsive: false,
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: { display: true, labelString: '시간' },
            }],
            yAxes: [{
                display: true,
                scaleLabel: { display: true, labelString: '거리' }
            }]
        }
    }
};
function drawUseChart() {
    useChartCanvas = document.getElementById('useChartCanvas');
    useChartCtx = useChartCanvas.getContext('2d');
    useChart = new Chart(useChartCtx, useChartConfig);
    initUseChart();
}
function initUseChart() {
    for (let i = 0; i < useChart_LABEL_SIZE; i++) {
        useChart.data.labels[i] = i;
    }
    useChart.update();
}
function addUseChartData(value) {
    useChart_tick++;
    useChart_tick %= 100;
    let n = useChart.data.datasets[0].data.length;
    if (n < useChart_LABEL_SIZE)
        useChart.data.datasets[0].data.push(value);
    else {
        useChart.data.datasets[0].data.push(value);
        useChart.data.datasets[0].data.shift();
        useChart.data.labels.push(useChart_tick);
        useChart.data.labels.shift();
    }
    useChart.update();
}
function useChartHideshow() {
    let useChartCanvas = document.getElementById('useChartCanvas');
    if (useChartCanvas.style.display == "none")
        useChartCanvas.style.display = "inline-block";
    else
        useChartCanvas.style.display = "none";
}
window.addEventListener("load", drawUseChart); 