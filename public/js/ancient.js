// icon actions
let stylechanged = false;
let iconreturn = document.querySelector('.iconreturn');
iconreturn.addEventListener('click', () => {
    location.href = '404.html';
});

let oldgoogle = document.querySelector('#oldgoogle');
oldgoogle.addEventListener('mouseover', () => {
    oldgoogle.style.transform = "translate(-50%, -150%)";
    oldgoogle.style.width = "350px";
    oldgoogle.style.cursor = "none";
});

oldgoogle.addEventListener('click', changetonew);

let iconrefresh = document.querySelector('#iconrefresh');
iconrefresh.addEventListener('click', changetonew);

function changetonew() {
    stylechanged = !stylechanged;
    console.log(stylechanged);
    if (stylechanged == true) {
        oldgoogle.src = "google-logo-new.png";
        let a = document.createElement('a');
        a.setAttribute('target', '_blank');
        a.setAttribute('href', "https://www.google.com/url?q=https://www.google.com/covid19/%3Futm_source%3Dgoogle%26utm_medium%3Dhpp%26utm_campaign%3DUS-EN&source=hpp&id=19016727&ct=3&usg=AFQjCNFaU-MyNQpBlUIXuIyEcSIeeQIg1A&sa=X&ved=0ahUKEwi57beo97PoAhWDknIEHb8rBYgQ8IcBCBA");
        a.innerText = "Coronavirus information and resources (COVID-19)";
        document.getElementById('searchtime').innerText = `\n`;
        document.getElementById('searchtime').appendChild(a);
    } else {
        oldgoogle.src = "google-logo-old.png";
        document.getElementById('searchtime').innerText = `\n©2004 Google - Searching 4,285,199,774 webpages`;
    }
}