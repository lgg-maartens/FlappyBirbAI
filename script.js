var pipes = [];
var birb;
var bg, birb_img;
var totalPopulation = 500;
let activeBirds = [];
let allBirds = [];
var smartestBird;
var generation = 0;
var score = highscore = 0;

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
  fill(255)
  text('generation:' + generation, 10, 20);
  text('score:' + score, 10, 30);
  text('highscore:' + highscore, 10, 40);
  text('living birds:' + activeBirds.length, 10, 50);

  if (frameCount % 80 == 0) {
    addPipes();

    // remove pipes
    if(pipes.length > 6){
      pipes.splice(0, 2);
    }    

    score++;
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
  let gapHeight = 150;
  let randHeight = random(height - gapHeight);
  

  let newRectTop = new Pipe(640, 0, 60, randHeight, "green");
  let newRectBot = new Pipe(640, randHeight + gapHeight, 60, height + (randHeight + gapHeight), "green");


  pipes.push(newRectBot);
  pipes.push(newRectTop);
}

function reset(){
  pipes = [];
  generation++;

  if(score > highscore)
    highscore=score;

  score = 0;
  
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