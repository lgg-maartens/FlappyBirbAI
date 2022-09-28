var pipes = [];
var birb;
var bg, birb_img;
var totalPopulation = 50;
let activeBirds = [];
let allBirds = [];
var smartestBird;

function preload() {
  bg = loadImage('bg.png');
  birb_bg = loadImage('birb.png');
}

function setup() {
  createCanvas(640, 360);
  angleMode(DEGREES);

  newBirds();
}

function draw() {
  image(bg, 0, 0, width, height);


  if (frameCount % 60 == 0) {
    addPipes();

    // remove pipes
    if(pipes.length > 6){
      pipes.splice(0, 2);
    }    
  }

  activeBirds.forEach(birb =>{
    birb.draw();
    birb.think(pipes);
  })
  

  pipes.forEach((p) => {
    p.drawRect();

    activeBirds.forEach(birb =>{
      if(p.isColliding(birb)){
        birb.hit();
      }
    });
    
  });

  // one left? Then this is the smartest bird
  if(activeBirds.length == 1){
    smartestBird = activeBirds[0];
  }

  // If we're out of birds go to the next generation
  if (activeBirds.length == 0) {
    reset();
  }
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


  pipes.push(newRectBot);
  pipes.push(newRectTop);
}

function reset(){
  pipes = [];
  newBirds();
}

function newBirds(){
  for (let i = 0; i < totalPopulation; i++) {
    let bird
    if(smartestBird){
      bird = new Bird(smartestBird.brain);
    }
    else{
      bird = new Bird();
    }
    activeBirds[i] = bird;
    allBirds[i] = bird;
  }
}