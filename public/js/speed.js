// https://www.sitepoint.com/community/t/auto-scrolling-a-div-with-overflow-scroll-auto/2291/3

let speedtext1 = document.getElementById('speedtext1');
let speedtext = document.getElementById('speedtext');

let ScrollRate = 10;
let ReachedMaxScroll1 = false;
let ReachedMaxScroll = false;
let PreviousScrollTop = speedtext.scrollHeight - speedtext.clientHeight;
let PreviousScrollTop1 = speedtext.scrollHeight - speedtext.clientHeight;


let s = 3;
let w = window.innerWidth;
let mouseX;

window.addEventListener('mousemove', (event) => {
    // console.log(event.pageX);
    // console.log(window.innerWidth);
    mouseX = event.pageX;
    s = 5 * (mouseX/w);
    console.log(s);
    // scrollDiv();
    // scrollInit();
});
// function scrollInit() {
//     setInterval('scrollDiv()', ScrollRate);
// }
setInterval('scrollDiv()', ScrollRate);
function scrollDiv() {

    if (!ReachedMaxScroll) {
        speedtext.scrollTop = PreviousScrollTop;
        PreviousScrollTop -= s;
        // console.log(speedtext.scrollTop);
        // console.log(PreviousScrollTop);
        // console.log(speedtext.offsetHeight);
        // console.log(speedtext.scrollHeight-speedtext.offsetHeight);
        // console.log(speedtext.scrollTop >= 0);
        // ReachedMaxScroll = speedtext.scrollTop >= (speedtext.scrollHeight - speedtext.offsetHeight);
        ReachedMaxScroll = PreviousScrollTop <= 0;
    }
    else {
        ReachedMaxScroll = (speedtext.scrollTop >= speedtext.scrollHeight - speedtext.clientHeight) ? false : true;
        speedtext.scrollTop = PreviousScrollTop;
        PreviousScrollTop += s;
    }
    if (!ReachedMaxScroll1) {
        speedtext1.scrollTop = PreviousScrollTop1;
        PreviousScrollTop1 += s*0.75;
        // console.log(speedtext1.scrollTop);
        // console.log(speedtext1.scrollHeight-speedtext1.offsetHeight);
        // console.log(speedtext1.scrollTop >= (speedtext1.scrollHeight - speedtext1.offsetHeight));
        ReachedMaxScroll1 = speedtext1.scrollTop >= (speedtext1.scrollHeight - speedtext1.offsetHeight);
    }
    else {
        ReachedMaxScroll1 = (speedtext1.scrollTop == 0) ? false : true;
        speedtext1.scrollTop = PreviousScrollTop1;
        PreviousScrollTop1 -= s*0.75;
    }
}