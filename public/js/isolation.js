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

// https://stackoverflow.com/questions/34162200/displaying-cursor-on-every-connected-client-in-socket-io
// https://stackoverflow.com/questions/24050738/javascript-how-to-dynamically-move-div-by-clicking-and-dragging

let wrap = document.getElementById('wrap');
let offset = [0, 0];
let mousePosition;

function getCursorElement(id) {
    let elementId = 'cursor-' + id;
    let element = document.getElementById(elementId);
    // if (element == null) {
        element = document.createElement('div');
        element.id = elementId;
        element.className = 'cursor';
        // Perhaps you want to attach these elements another parent than document
        document.body.appendChild(element);
    // }
    return element;
}

socket.on('draw_cursor', function (data) {
    let el = getCursorElement(data.id);
    el.style.background = `rgba(${data.color[0]},${data.color[1]},${data.color[2]},0.5)`;
    // console.log(data);
    let xpos = data.mousePos[0];
    let ypos = data.mousePos[1];
    el.style.left = `${xpos}px`;
    el.style.top = `${ypos}px`;
});

let r = Math.random()*255;
let g = Math.random()*255;
let b = Math.random()*255;

let div;
div = document.createElement("div");
div.style.position = "absolute";
div.style.left = "0px";
div.style.top = "0px";
div.style.width = "40px";
div.style.height = "40px";
div.style.background = `rgba(${r},${g},${b}, 0.3)`;
div.style.borderRadius = "20px";
div.style.zIndex = "2";
// isolationtext.appendChild(div);
document.body.appendChild(div);

wrap.style.margin = '0';
wrap.style.height = '100%';
wrap.style.width = '100%';
wrap.style.zIndex = '2';

wrap.addEventListener('mousemove', function (event) {
    offset = [
        div.offsetLeft - event.clientX,
        div.offsetTop - event.clientY
    ];
});

document.addEventListener('mousemove', function (event) {
    event.preventDefault();
    // console.log(event);
    mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    div.style.left = (mousePosition.x + offset[0]) + 'px';
    div.style.top = (mousePosition.y + offset[1]) + 'px';
    // console.log(mousePosition);
    socket.emit('cursorPos', {
        mousePos: [mousePosition.x, mousePosition.y],
        color: [r, g, b]
    });
    offset = [0,0];
});
