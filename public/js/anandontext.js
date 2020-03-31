let abandontext = document.getElementById('abandontext');

abandontext.addEventListener('click', goToHomePage);

function goToHomePage() {
    location.href = 'navigation.html';
}

let abandonsynonyms;
let inputword = 'abandon';
let wordnikapi = 'https://api.wordnik.com/v4/word.json/';
let wordrelation = '/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=500&api_key=vw1nl7ehkszm2x0xkmz9axtmczoqoa86mzsdo1zw8hw3jgvz4';
let url = wordnikapi + inputword + wordrelation;

// let abandonUrl = 'https://api.wordnik.com/v4/word.json/abandon/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=380&api_key=vw1nl7ehkszm2x0xkmz9axtmczoqoa86mzsdo1zw8hw3jgvz4';
document.querySelector('#enteraword').addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        inputword = document.getElementsByName('enteraword')[0].value;
        // console.log(inputword);
        document.getElementsByName('enteraword')[0].value = '';
        document.getElementsByName('enteraword')[0].placeholder = inputword;
        url = wordnikapi + inputword + wordrelation;
        // console.log(url);
        catchwords();
    }
});

catchwords().catch(error => {
    console.error(error);
});

async function catchwords() {
    // let response = await fetch(abandonUrl);
    let response = await fetch(url);
    // console.log(response);
    let abandonjson = await response.json();
    console.log(abandonjson);
    abandonsynonyms = abandonjson[0].words;
    console.log(abandonsynonyms);
}

let theword = [];
let newword;

document.getElementById('wrap').addEventListener('mousemove', showsynon);

function showsynon() {
    theword = abandonsynonyms[Math.round(Math.random() * abandonsynonyms.length)];
    abandontext.innerText = theword;
    // console.log(theword);
};

abandontext.addEventListener('mouseenter', (event) => {
    // console.log(event.target);
    document.getElementById('wrap').removeEventListener('mousemove', showsynon);
    newword = `${inputword}.`;
    // console.log(newword);
    abandontext.innerText = newword;
    abandontext.style.cursor = 'none';
});
abandontext.addEventListener('mouseleave', (event) => {
    // console.log(event.target);
    document.getElementById('wrap').addEventListener('mousemove', showsynon);
});



//another expression of JSON api fetch();

// fetch(abandonUrl).then(response => {
//     console.log(response);
//     return response.json();
// }).then(abandonjson => {
//     console.log(abandonjson);
//     abandonsynonyms = abandonjson[0].words;
//     console.log(abandonsynonyms);
//     abandonsynonyms.forEach(innertext => {
//         abandontext.innerHTML = innertext;
//     });
// }).catch(error => {
//     console.error(error);
// });