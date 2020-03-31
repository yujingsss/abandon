let iconreturn404 = document.querySelector('#iconreturn404');
let returnNum = 0;
let notfind = document.getElementById('notfind');

iconreturn404.addEventListener('click', () => {
    // console.log(location.href);
    returnNum++;
    returnNum = returnNum % 2;
    console.log('returnclick:' + returnNum);
    if (returnNum == 0) {
        location.href = 'index.html';
    } else {
        notfind.src = 'https://editor.p5js.org/shiy173/embed/PWNM_-Gfc';
        iconreturn404.style.filter = 'invert(80%)';
        document.getElementById('notfindtext').style.filter = 'invert(80%)';
    }
});

