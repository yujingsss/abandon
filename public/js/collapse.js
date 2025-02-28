let collapsetextdiv = document.getElementById('collapsetext');
collapsetextdiv.style.zIndex = '0';
let collapsetext = `Many of China's 'resource' towns are dying By Emma Graham-Harrison April 17, 2008 YUMEN, China — Dying towns may seem rare in a booming China, but the expanses of rubble and abandoned homes that ring this formerly wealthy oil center identify Yumen as one of them. And although Yumen is home to just a few thousand people in a country of more than 1.3 billion, Beijing's stability-obsessed government is worrying about their future. Officials worry because Yumen's poor, disgruntled inhabitants are the thin end of a wedge of discontent that could engulf hundreds of thousands of people within a decade unless the central government can resolve one of the more obscure but troubling legacies of past socialist policies. The potential troublemakers live in dozens of "resource towns" that were built across China by Mao-era economic planners to exploit energy or mineral deposits regardless of how remote or inhospitable the location. Now, some seams of oil, coal and ore are starting to run out, increasing unemployment and migration while leaving behind shells of towns that are impoverished tinderboxes of unrest. Yumen is in a high-altitude corner of the poor northwestern province of Gansu. A single oil field is its gushing but fragile economic base. Phillips Andrews-Speed, a professor of energy policy at Dundee University, in Scotland, has studied the way China's desperate hunt for energy has marginalized some of the people who produce it. "It's a general problem - Yumen is just an example," he said "You have groups of thousands or tens of thousands of people left in the middle of nowhere who will be poor and with nothing to do." He added, "It is a growing problem for the government." Built near what was then an important oil field, Yumen was populated by those with coveted state jobs. But oil production peaked in 1959 and by the start of this century had become so insignificant compared with other discoveries that PetroChina moved its headquarters out of town. Local officials followed suit, setting up a "new Yumen" in a more convenient location. Today, 2,000 yuan, or about $285, can buy an apartment along the main street, among boarded-up shops. Food is expensive because it is mostly trucked in, with too few buyers to push prices down, and there are no hopes of new employment for the men and women who used to work in the oil industry. "I can't eat well, I can't buy clothes, I can't even think of traveling or having fun," said a laid-off worker who gave only his surname, Quan. "All I can do is try to slowly pass my days. We have all been out to protest." Resource towns everywhere shrivel up or suffer when their main source of income fades. Texas is dotted with ghost towns, and industrial centers of northern England struggled for decades after coal and heavy industry slipped into decline. But the future for Yumen, one of the first in China to face this situation, seems particularly grim. In Maoist China, there was little diversification and planners preferred to create whole settlements near mines and pumps rather than ship workers to sites far from their families. The people who built these single-purpose cities relied entirely on a state that promised to provide cradle-to-grave support. Now the central government's energy bureaucrats have moved out of micromanagement, abandoning Yumen to local officials who, like those in other such places, never planned for a future without their main resource. "When the old economy is gone," Andrews-Speed said, "you need to build a new one, but it takes at least a decade. So if you don't start until after the old one is finished, you are stuck. The planned economy didn't anticipate this." With stability a major concern as the gap between rich and poor widens, Beijing knows it has a serious problem on its hands. China's finance minister mentioned revamping resource towns at the annual session of Parliament this month. The Asian Development Bank recently produced a report on a project in one city that seeks to retrain miners to work in agriculture, tourism or technology. "China has identified 118 cities that have developed around the mining of natural resources," the report said. "Eighteen are classified as resource-exhausted cities, posing a special challenge." They range from Fuxin, in the northeast, to Baiyin, which is in Gansu. But Beijing's concern has not translated into improvements in Yumen. With little consultation, the local officials moved the seat of government to a distance of about 80 kilometers, or 50 miles, and built a new Yumen, taking with them all those who could afford more expensive houses. "I left for six years, and when I came back, half the town I knew was gone," Cai Xin, taxi driver, said as he gestured to an empty apartment block and an abandoned mosque in the old city. Money that could have paid pensions and medical bills was poured into empty multilane roads, new government buildings and a vast square filled with decorations ranging from crudely carved statues of naked Caucasian women to a faux windmill. Citizens of old Yumen said no cash had been offered to compensate them for the plunging value of their houses, or to help them move. Officials declined repeated requests for statistics on budgets, population and the economy of the new town, though they trailed a journalist who tried to interview residents of the new Yumen. Asked about the effect of the move, Gansu Province's governor, Yu Shoucheng said: "Today's Yumen is glowing and in its prime."`;
let collapsetextarray = collapsetext.split(' ');
// console.log(isolationtextarray);
let collapse;
let collapseid;
// collapsetextdiv.style.position = 'relative';
for (let i = 0; i < collapsetextarray.length; i++) {
    collapseid = 'isotext' + i;
    collapse = document.getElementById(collapseid);
    collapse = document.createElement('div');
    collapse.id = collapseid;
    collapse.style.display = 'inline';
    collapse.style.paddingLeft = '4px';
    collapse.innerText = `${collapsetextarray[i]} `;
    collapse.className = 'collapsing';
    // console.log(collapse);
    collapsetextdiv.appendChild(collapse);
}
let collapsing = document.querySelectorAll('.collapsing');
Array.from(collapsing).forEach(coll => {
    coll.addEventListener('mouseover', movecollapse);
});

let offset = [0,0];
let mousePosition;

let collapsedivid;
let collapsediv;
function movecollapse(event) {
    collapsedivid = event.target.id;
    // console.log(collapsedivid);
    collapsediv = document.getElementById(`${collapsedivid}`);
    collapsediv.style.top = '0';
    collapsediv.style.animationName = 'collapsedrop';
    collapsediv.style.animationDuration = '20s';
    // collapsediv.style.animationIterationCount = '1';
    collapsediv.style.animationFillMode= 'forwards';
}
document.getElementById('collapsetext').addEventListener('mousemove', (event) => {
    offset = [
        collapsediv.offsetLeft - event.clientX,
        collapsediv.offsetTop - event.clientY
    ];
    console.log(offset);
});
document.addEventListener('mousemove', (event) => {
    event.preventDefault();
    mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    collapsediv.style.color = 'rgb(236, 13, 13)';
    collapsediv.style.left = (mousePosition.x + offset[0]) + 'px';
    collapsediv.style.top = (mousePosition.y + offset[1]) + 'px';
    offset = [0,0];
});