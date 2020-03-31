// make connection, make a request from backend & keep connection alive
let socket = io();

socket.on('connect', function () {
    console.log('connection established...');
});
//socket.on - listening an disconnect event
socket.on('disconnect', function () {
    console.log('lost connection...');
    // alert('lost connection...');
});
socket.on('connect_error', (error) => {
    console.log('connection error...');
    // alert('connection error...');
});
socket.on('error', (error) => {
    console.log('error occurs...');
    // alert('error occurs...');
});


const entries = Array.from(document.querySelectorAll(".entry"));

//naviagtion entires
let enterentry = document.querySelectorAll('.entry');
Array.from(enterentry).forEach(entry => {
    entry.addEventListener('click', enterpath);
});
function enterpath(event) {
    // console.log(enterentry);
    console.log(event.target);
    let entrynum = entries.findIndex(function (matchentry) {
        return matchentry === event.target;
    });
    // console.log(entrynum);
    // entrynum == 0 ? console.log('0') : 
    // entrynum == 1 ? console.log('1') : 
    // entrynum == 2 ? console.log('2') : 
    // entrynum == 3 ? console.log('3') : 
    // entrynum == 4 ? console.log('4') : 
    // console.log('5');
    entrynum == 0 ? location.href = 'ancient.html' :
    entrynum == 1 ? location.href = 'collapse.html' :
    entrynum == 2 ? location.href = 'isolation.html' :
    entrynum == 3 ? location.href = 'speed.html' :
    entrynum == 4 ? location.href = 'time.html' :
    location.href = 'quantity.html';
}


window.addEventListener('mousemove', (event) => {
    // console.log(event.pageX);
    // console.log(window.innerWidth);
    let w = window.innerWidth;
    let mouseX = event.pageX;
    let posX = mouseX/w;
    // console.log(posX);
    if (posX >= 0 && posX < 0.3) {
        document.getElementById('yumen3').style.display = 'block';
        document.getElementById('yumen1').style.display = 'none';
    }    
    if (posX >= 0.3 && posX < 0.65) {
        document.getElementById('yumen2').style.display = 'block';
        document.getElementById('yumen3').style.display = 'none';
    } if (posX >= 0.65 && posX < 0.9) {
        document.getElementById('yumen1').style.display = 'block';
        document.getElementById('yumen2').style.display = 'none';
    }
});

