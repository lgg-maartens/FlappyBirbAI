var y;
var velocity;
var acceleration;
var gravity;

class Birb {
  constructor() {
    this.x;
    this.y = 100;
    this.velocity = 0;
    this.acceleration = 0.9;
    this.gravity = 0.9;
  }

  draw() {
    if (this.y >= height) {
      this.y = height;

      if (this.velocity < 0) {
        this.y += this.velocity;
      }
    }
    else {
      this.velocity += this.acceleration;
      this.y += this.velocity;
    }

    fill("red");
    ellipse(640 / 2, this.y, 25, 25);
  }
}

class Pipe {
  constructor(x, y, w, h, vx, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = vx;
    this.color = color
  }

  drawRect() {
    fill(this.color)
    rect(this.x, this.y, this.w, this.h);
    this.x = this.x + this.vx;
  }
}

var rects = [];
var birb;

function setup() {
  createCanvas(640, 360);

  birb = new Birb();
}

function draw() {
  background(127);

  if (frameCount % 60 == 0) {
    console.log(frameCount);

    let randHeight = random(height/2);
    let gapHeight = 150;

    
    let newRectTop = new Pipe(640, 0, 30, randHeight, -5, "green");
    let newRectBot = new Pipe(640, randHeight + gapHeight, 30, height + (randHeight + gapHeight), -5, "green");


    rects.push(newRectBot);
    rects.push(newRectTop);
    console.log(rects.length)
  }

  birb.draw();

  rects.forEach(r => r.drawRect());

}

function keyPressed() {
  if (keyCode === 32) {
    birb.velocity = -10;
  }
}