var rects = [];
var birb;
var bg, birb_img;

class Birb {
  constructor() {
    this.x = 640 / 3;
    this.y = 100;
    this.h = 30;
    this.w = 60;
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
    // translate(this.x, this.y);
    // if (this.velocity > 0) {
    //   rotate(10);
    //   image(birb_bg, -(this.w / 2), -(this.h / 2), this.w, this.h);
    //   rotate(-10);
    // } else {
    //   rotate(-10);
    //   image(birb_bg, -(this.w / 2), -(this.h / 2), this.w, this.h);
    //   rotate(10);
    // }
    // translate(-this.x, -this.y);

    // without rotation
    image(birb_bg, this.x, this.y, this.w, this.h);
  }
}

class Pipe {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = -5;
    this.color = color
  }

  drawRect() {
    fill(this.color);
    this.x = this.x + this.vx;
    rect(this.x, this.y, this.w, this.h);
  }

  isColliding() {
    // check x axis-collision
    if (birb.x + birb.w > this.x && birb.x < this.x + this.w) {
      // check y-axis collision
      if (birb.y + birb.h > this.y && birb.y < this.y + this.h) {
        return true;
      }      
    }
    return false;
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
    addPipes();
  }

  birb.draw();

  rects.forEach((r) => {
    r.drawRect();
    if(r.isColliding()){
      r.color = "red";
    }
    else{
      r.color = "green";
    }
  });

}

function keyPressed() {
  if (keyCode === 32) {
    birb.velocity = -10;
  }
}

function addPipes() {

  let randHeight = random(height / 2);
  let gapHeight = 150;


  let newRectTop = new Pipe(640, 0, 60, randHeight, "green");
  let newRectBot = new Pipe(640, randHeight + gapHeight, 60, height + (randHeight + gapHeight), "green");


  rects.push(newRectBot);
  rects.push(newRectTop);
}