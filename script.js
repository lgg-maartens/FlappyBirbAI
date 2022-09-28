var rects = [];
var birb;
var bg, birb_img;





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

    // remove pipes
    if(rects.length > 6){
      rects.splice(0, 2);
    }    
  }

  birb.draw();

  rects.forEach((r) => {
    r.drawRect();
    
    if(r.isColliding()){
      console.log("hit")
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