var rects = [];
var birb;
var bg, birb_img;

class Birb {
  constructor() {
    this.x = 640 / 2;
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

    // rotation
    translate(this.x, this.y);     
    if (this.velocity > 0) {
      rotate(10);
      image(birb_bg, -30, -15, 60, 30);
      rotate(-10);
    } else {
      rotate(-10);
      image(birb_bg, -30, -15, 60, 30);
      rotate(10);
    }
    translate(-this.x,-this.y);

   
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
    fill(this.color);
    this.x = this.x + this.vx;
    rect(this.x, this.y, this.w, this.h);
  }
}



function preload() {
  bg = loadImage('bg.png');
  birb_bg = loadImage('birb.png');
}

function setup() {
  createCanvas(640, 360);
  angleMode(DEGREES);

  birb = new Birb();
}

function draw() {
  image(bg, 0, 0, width, height);


  if (frameCount % 60 == 0) {
    console.log(frameCount);

    let randHeight = random(height / 2);
    let gapHeight = 150;


    let newRectTop = new Pipe(640, 0, 60, randHeight, -5, "green");
    let newRectBot = new Pipe(640, randHeight + gapHeight, 60, height + (randHeight + gapHeight), -5, "green");


    rects.push(newRectBot);
    rects.push(newRectTop);
  }

  birb.draw();

  rects.forEach(r => r.drawRect());

}

function keyPressed() {
  if (keyCode === 32) {
    birb.velocity = -10;
  }
}