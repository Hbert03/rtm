
function fetchData() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'graph_function.php', true); 
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            
            var data = JSON.parse(xhr.responseText);
            updateChart(data); 
        } else {
            console.error('Failed to fetch data: ' + xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('Failed to fetch data');
    };
    xhr.send();
}


function updateChart(data) {
    var labels = data.labels;
    var values = data.values;


    var ctx = document.getElementById('graphchart').getContext('2d');

    if(window.graphchart instanceof Chart) {

        window.graphchart.data.labels = labels;
        window.graphchart.data.datasets[0].data = values;
        window.graphchart.update();
    } else {
        window.graphchart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'MONTHY DATA OF RETIRED PERSONNEL',
                    data: values,
                    backgroundColor: [
                        'rgba(40, 67, 135)',
                    ],
                    borderColor: [
                        'rgba(169, 169, 169, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                tooltips: {
                    enabled: true,
                    callbacks: {
                        title: function(tooltipItem, data) {
                            var label = data.labels[tooltipItem[0].index];
                            if (label === '😄') {
                                return 'Strongly Agree';
                            } else if (label === '😊') {
                                return 'Agree';
                            }
                        },
                        label: function(tooltipItem, data) {
                            var label = data.labels[tooltipItem.index];
                            return label + ': ' + tooltipItem.yLabel;
                        },
                    }
                }
                
            }
            
        });
    }
}

fetchData();

setInterval(fetchData, 3000);





