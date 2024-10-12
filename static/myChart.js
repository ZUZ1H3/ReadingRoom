//온습도 센서의 그래프를 그리는 자바스크립트 
var ctx = null;
var chart = null;
var LABEL_SIZE = 20; // 차트에 그려지는 데이터의 개수 
var tick = 0; // 도착한 데이터의 개수임, tick의 범위는 0에서 99까지만 

var config = {
    type: 'line', // 라인그래프 
    data: {
        labels: [], // labels는 배열로 데이터의 레이블들 
        datasets: [{
            label: '온도',
            backgroundColor: 'pink',
            borderColor: 'pink',
            borderWidth: 3,
            data: [], // 각 레이블에 해당하는 데이터 
            fill: false, // 채우지 않고 그리기 
            yAxisID: 'y_right' // 오른쪽 y축의 값 
        },
        {
            label: '습도',
            backgroundColor: 'pink',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 3,
            data: [], // 각 레이블에 해당하는 데이터 
            fill: false, // 채우지 않고 그리기 
            yAxisID: 'y_left' // 왼쪽 y축의 값 
        }]
    },
    // 차트의 속성 지정 
    options: {
        responsive: false,
        title: {
            display: true,
            text: ''
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: '시간'
                },
            }],
            yAxes: [{ // 2 개의 y 축을 지정한다. 
                id: 'y_left', // 좌측 y 축 
                position: 'right',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: '%'
                },
                ticks: {
                    max: 70,
                    min: 15,
                    fontColor: '#009fff'
                }
            }, {
                id: 'y_right', // 우측 y 축 
                position: 'left',
                display: true,
                gridLines: {
                    drawOnChartArea: false,
                },
                scaleLabel: {
                    display: true,
                    labelString: '℃'
                },
                ticks: {
                    max: 30,
                    min: 15,
                    fontColor: '#ff5500'
                }
            }]
        }
    }
};

function drawChart() {
    ctx = document.getElementById("canvas").getContext('2d');
    chart = new Chart(ctx, config);
    init();
}

// chart의 차트에 labels의 크기를 LABEL_SIZE로 만들고 0~19까지 레이블 붙이기 
function init() {
    for (let i = 0; i < LABEL_SIZE; i++) {
        chart.data.labels[i] = i;
    }
    chart.update();
}

function addEnvironmentChartData(value, i) {
    // i가 0이면 온도 1이면 습도 데이타 
    tick++; // 도착한 데이터의 개수 증가 
    tick %= 100; // tick의 범위는 0에서 99까지만. 100보다 크면 다시 0부터 시작 
    let n = chart.data.datasets[i].data.length; // 현재 데이터의 개수 
    if (n < LABEL_SIZE)
        chart.data.datasets[i].data.push(value);
    else {
        // 새 데이터 value 삽입 
        chart.data.datasets[i].data.push(value);
        chart.data.datasets[i].data.shift();
        // 레이블 삽입 
        chart.data.labels.push(tick);
        chart.data.labels.shift();
    }
    chart.update();
}

function hideshow() { // 캔버스 보이기 숨기기 
    var canvas = document.getElementById('canvas'); // canvas DOM 객체 알아내기 
    if (canvas.style.display == "none") // canvas 객체가 보이지 않는다면 
        canvas.style.display = "inline-block"; // canvas 객체를 보이게 배치 
    else
        canvas.style.display = "none"; // canvas 객체를 보이지 않게 배치 
}
window.addEventListener("load", drawChart); // load 이벤트가 발생하면 drawChart() 호출하도록 
