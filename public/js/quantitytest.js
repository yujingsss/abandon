
const xlabels = [];
const totald = [];
const dailyd = [];
chartIt();
console.log(xlabels);
async function chartIt() {
    await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: 
        {
            labels: xlabels,
            datasets: [
                {
                    label: 'Total Death',
                    data: totald,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Daily Death',
                    data: dailyd,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderColor: 'rgba(0,0,0, 1)',
                    borderWidth: 1
                },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        display: false,
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
async function getData() {
    const response = await fetch('data.csv');
    const data = await response.text();
    // console.log(data);
    const table = data.split(`\n`).slice(1);
    table.forEach(row => {
        const col = row.split(',');
        let date = col[0];
        xlabels.push(date);
        const totaldeath = col[1];
        totald.push(totaldeath);
        const dailydeath = col[2];
        dailyd.push(dailydeath);
        console.log(date, totaldeath, dailydeath);
    });
}