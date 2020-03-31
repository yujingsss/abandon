// let timer = 1000;
// let millisecond = 1 * 1000 * 60;
// let second = 60;
// let minute;
// let milli = 1000;

// window.addEventListener('click', () => {
//     setInterval(() => {
//         second--;
//         console.log(second);
//         milli = second*10;
//         // second = Math.floor(millisecond / 1000);
//         minute = Math.floor(second / 60);
//         console.log(`${minute}:${second}.${milli}`);
//         document.getElementById('timer').innerHTML = `${minute}:${second}.${milli}`;
//     }, timer);
// });

// https://youtu.be/6nvKN_H4e-I

let timeleft = 5000;

let startTime = 0;
let currentTime = 0;

let ding, timing;

function preload() {
    timing = loadSound('./audio/ticking-timer-10-sec.wav');
    // timing = loadSound('https://storagefile.yolasite.com/resources/ticking-timer-10-sec%20.mp3');
    ding = loadSound('./audio/ding.wav');
    // ding = loadSound('https://storagefile.yolasite.com/resources/ding.mp3');
}
window.onload = () => {
    // console.log('window loaded');
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
};

function setup() {
    noCanvas();
    let params = getURLParams();
    if (params.second) {
        let sec = params.second;
        timeleft = sec * 1000;
    }

    startTime = millis();

    timing.play();
    timing.loop();

    let timer = select('#timer');
    timer.html(convertTime(timeleft - currentTime));

    function timeIt() {
        currentTime = floor(millis() - startTime);
        // print(timeleft-currentTime);
        timer.html(convertTime(timeleft - currentTime));
        // print(timeleft - currentTime);
        if (currentTime >= timeleft) {
            // ding.play();
            timer.html(convertTime(0));
            clearInterval(interval);
            timing.stop();
            location.href = '404.html';
        }
    }
    let interval = setInterval(timeIt, 1);
}
function convertTime(s) {
    let min = floor(s / 60000);
    let sec = floor(s / 1000);
    let milli = s % 1000;
    return nf(min, 2) + ':' + nf(sec, 2) + '.' + nf(milli, 3);
}
