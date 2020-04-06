const dates = [];
const totald = [];
const dailyd = [];
async function getData() {
  const response = await fetch('data.csv');
  const data = await response.text();
  // console.log(data);
  const table = data.split(`\n`).slice(1);
  table.forEach(row => {
    const col = row.split(',');
    let date = col[0];
    dates.push(date);
    const totaldeath = col[1];
    totald.push(totaldeath);
    const dailydeath = col[2];
    dailyd.push(dailydeath);
    // console.log(date, totaldeath, dailydeath);
  });
}

let numBalls = 0;
let spring = 0.08;
let gravity = 0.03;
let friction = -0.6;
let balls = [];

async function setup() {
  await getData();
  let p5canvas = createCanvas(windowWidth, windowHeight);
  p5canvas.position(0,0);
  let nums = dates.length;
  // console.log(nums);
  // console.log(totald);
  numBalls = nums;
  let d = [];
  for (n = 0; n < nums; n++) {
    d.push(map(dailyd[n], 0, 6000, 20, 100));
    // d.push(map(totald[n], 0, 65000, 20, 100));
  }
  // console.log(td);
  for (let i = 0; i < numBalls; i++) {
    // console.log( `total death in ${dates[i]}:\n${totald[i]}`);
    balls[i] = new Ball(
      random(width),
      random(height), 
      d[i],
      i,
      balls
    );
  }
}

function draw() {
  background(0, 75);
  balls.forEach(ball => {
    noStroke();
    fill(255, 255, 255, 200);
    ball.collide();
    ball.move();
    ball.display();
    if (mouseX >= ball.x - ball.diameter / 2 && mouseX <= ball.x + ball.diameter / 2
      && mouseY >= ball.y - ball.diameter / 2 && mouseY <= ball.y + ball.diameter / 2) {
      // console.log(ball.id);
      fill(236, 13, 13);
      textSize(25);
      textStyle(NORMAL);
      text(`${dates[ball.id]} ${dailyd[ball.id]}`, ball.x, ball.y);
      textSize(40);
      textStyle(BOLD);
      text(`Total Death: ${totald[ball.id]} in ${dates[ball.id]}`, 300,250);
    }
  });
}

class Ball {
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}


