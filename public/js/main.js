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
socket.on('newMessage', function (msg) {
    // console.log('newMessage', msg);
    let otherli = document.createElement('li');
    let list = document.querySelector('#answers');
    otherli.style.listStyle = "none";
    otherli.style.fontSize = "18px";
    otherli.style.fontWeight = "600";
    otherli.style.color = "white";
    otherli.innerText = `${msg.text}`;
    if (msg.text === false) {
        // console.log('rm');
        list.removeChild(list.lastChild);
    } else {
        document.querySelector('#answers').appendChild(otherli);
    }
});
socket.on('newLink', function(data){
    // console.log(data.name, data.url);
    let linkdiv = document.createElement('div');
    linkdiv.style.backgroundColor = `rgba(${data.color[0]},${data.color[1]},${data.color[2]}, 0.8)`;
    linkdiv.style.width = '200px';
    linkdiv.style.height = '18px';
    linkdiv.style.margin = '5px';
    linkdiv.style.color = 'white';
    linkdiv.style.padding = '5px';
    linkdiv.style.cursor = 'zoom-in';
    linkdiv.style.textAlign = 'center';
    linkdiv.innerText = `${data.name}`;
    linkdiv.addEventListener('click', () => {
        // location.href = `${data.url}`;
        window.open(`${data.url}`, '_blank');
    });
    document.querySelector('#answers').appendChild(linkdiv);
});

document.querySelector('#abandonanswer').addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        let abandonanswer = document.getElementsByName("abandonanswer")[0].value;
        socket.emit('createMessage', {
            text: `: ${abandonanswer}`
        }, function (msg) {
            console.log(`${msg}`);
        });
        document.getElementsByName("abandonanswer")[0].value = '';
    }
});
let r = Math.random()*255;
let g = Math.random()*255;
let b = Math.random()*255;

document.querySelector('#userlink').addEventListener('keyup', function (event) {
    let pagename = document.getElementsByName("pagename")[0].value;
    let userlink = document.getElementsByName("userlink")[0].value;
    if (event.keyCode === 13 && pagename != '' && userlink != '') {
        // document.querySelector('#answers').innerText = '';
        // console.log(`${pagename}`);
        socket.emit('createLink', {
            name: pagename,
            url: userlink,
            color: [r, g, b]
        }, function (data) {
            console.log(`${data}`);
        });
        document.getElementsByName("pagename")[0].value = '';
        document.getElementsByName("userlink")[0].value = '';
    } 
    if (event.keyCode === 13 && pagename === '') { 
        document.querySelector('#answers').innerText = "Please enter a name"; 
        document.querySelector('#answers').style.color = "white"; 
    }
    if (event.keyCode === 13 && userlink === '') { 
        document.querySelector('#answers').innerText = "Please enter a url"; 
        document.querySelector('#answers').style.color = "white"; 
    }
});

let linkedpageanswer;
function showanswer(event){
    // console.log(event.target.id);
    document.querySelector(`#${event.target.id}`).style.cursor = "none";
    let entrynum = entries.findIndex(function (matchentry) {
        return matchentry === event.target;
    });
    entrynum == 0 ? linkedpageanswer = `" Old fahioned style web page "` :
    entrynum == 1 ? linkedpageanswer =`" Collapsing, not in sudden, slowing falling apart, in pieces... "`:
    entrynum == 2 ? linkedpageanswer =`" Isolated interpersonal relationships "` :
    entrynum == 3 ? linkedpageanswer =`" Feeling backwards, the digitized world is developing so fast "` :
    entrynum == 4 ? linkedpageanswer =`" Time counting down "` :
    linkedpageanswer =`" Dropping down numbers "`;
    socket.emit('createMessage', {
        text: `${linkedpageanswer}`
    }, function (msg) {
        console.log(`${msg}`);
    });
}
function hideanswer(event){
    linkedpageanswer = false;
    socket.emit('createMessage', {
        text: linkedpageanswer
    }, function (msg) {
        console.log(`${msg}`);
    });
}

const entries = Array.from(document.querySelectorAll(".entry"));
//naviagtion entires
let enterentry = document.querySelectorAll('.entry');
Array.from(enterentry).forEach(entry => {
    entry.addEventListener('click', enterpath);
    entry.addEventListener('mouseover', showanswer);
    entry.addEventListener('mouseleave', hideanswer);
});

function enterpath(event) {
    // console.log(enterentry);
    console.log(event.target);
    let entrynum = entries.findIndex(function (matchentry) {
        return matchentry === event.target;
    });
    // console.log(entrynum);
    entrynum == 0 ? location.href = 'ancient.html' :
    entrynum == 1 ? location.href = 'collapse.html' :
    entrynum == 2 ? location.href = 'isolation.html' :
    entrynum == 3 ? location.href = 'speed.html' :
    entrynum == 4 ? location.href = 'time.html' :
    location.href = 'quantity.html';
}

document.body.style.backgroundImage = "url('yumen2.jpg')";
window.addEventListener('mousemove', (event) => {
    // console.log(event.pageX);
    // console.log(window.innerWidth);
    let w = window.innerWidth;
    let mouseX = event.pageX;
    let posX = mouseX/w;
    // console.log(posX);
    if (posX >= 0 && posX < 0.3) {
        document.body.style.backgroundImage = "url('yumen3.jpg')";
        document.body.style.backgroundSize = "cover";
    }    
    if (posX >= 0.3 && posX < 0.65) {
        document.body.style.backgroundImage = "url('yumen2.jpg')";
        document.body.style.backgroundSize = "cover";
    } if (posX >= 0.65 && posX < 0.9) {
        document.body.style.backgroundImage = "url('yumen1.jpg')";
        document.body.style.backgroundSize = "cover";
    }
});

