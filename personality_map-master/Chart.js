var traitChart = document.getElementById('myChart');
var dataTraits = {
            labels: [
                'Extraverted',
                'Openness',
                'Agreeableness',
                'Conscientiousness',
                'Neuroticism'
            ],
            datasets: [
                {
                    label: 'Afghanistan',
                    backgroundColor: 'rgba(81, 169, 171, 0.4)',
                    borderColor: 'rgba(81, 169, 171, 1)',
                    pointBackgroundColor: 'rgba(81, 169, 171, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(81, 169, 171, 1)',
                    lineTension:1,
                    data: [
                        53.78, 51.14, 49.15, 47.67, 48.06
                    ]
                },
                {
                    label: 'Oman',
                    backgroundColor: 'rgba(220, 105, 80, 0.2)',
                    borderColor: 'rgba(220, 105, 80, 1)',
                    pointBackgroundColor: 'rgba(220, 105, 80, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(220, 105, 80, 1)',
                    lineTension:1,
                    data: [
                        52.7, 47.18, 55.21, 50.45, 52.21
                    ]
                }
            ]
        };

var optionsRadar = {
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    },
                    label: function(tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
                    }
                },
                backgroundColor: 'rgba(192,192,192,0.9)'
            },
            legend: {
                display: false
            },
            scale: {
                ticks: {
                    display: false,
                    min: 0,
                    max: 100
                },
                pointLabels: {
                    fontSize: 14
                }
            }
        };

var myChart = new Chart(traitChart, {
    type: 'radar',
    data: dataTraits,
    options: optionsRadar
});
