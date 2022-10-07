function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class Bird {
  constructor(brain) {
    this.x = 640 / 3;
    this.y = 100;
    this.h = 30;
    this.w = 60;
    this.velocity = 0;
    this.gravity = 0.6;
    this.jump = -7;

     // Is this a copy of another Bird or a new one?
    // The Neural Network is the bird's "brain"
    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(5, 50, 2);
    }
  }

  draw() {
    if (this.y + this.h >= height) {
      this.y = height - this.h;

      if (this.velocity < 0) {
        this.y += this.velocity;
      }
    }

    else {
      this.velocity += this.gravity;
      this.y += this.velocity;
    }

    if(this.y < 0){
      this.y = 0;
    }

    // without rotation
    image(birb_bg, this.x, this.y, this.w, this.h);
  }

  up(){
    this.velocity = this.jump;
  }

  hit(){
    let idx = activeBirds.indexOf(this);
    activeBirds.splice(idx, 1);
  }
  
  think(pipes) {
    // First find the closest pipe
    let closestPipeTop = null;
    let closestPipeBot = null;
    let record = Infinity;
    
    for (let i = 0; i < pipes.length; i++) {
      let diff = pipes[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closestPipeTop = pipes[i];
        closestPipeBot = pipes[i];
      }
    }

    if (closestPipeTop != null) {
      let gapTop = closestPipeTop.y + closestPipeTop.h;
      let gapBottom = closestPipeBot.y;
      // Now create the inputs to the neural network
      let inputs = [];
      // x position of closest pipe
      inputs[0] = map(closestPipeTop.x, this.x, width, 0, 1);
      // top of closest pipe opening
      inputs[1] = map(gapTop, 0, height, 0, 1);
      // bottom of closest pipe opening
      inputs[2] = map(gapBottom, 0, height, 0, 1);
      // bird's y position
      inputs[3] = map(this.y, 0, height, 0, 1);
      // bird's y velocity
      inputs[4] = map(this.velocity, -5, 5, 0, 1);

      // Get the outputs from the network
      let action = this.brain.predict(inputs);

      //console.log(action)
      // Decide to jump or not!
      if (action[1] > action[0]) {
        this.up();
      }
    }
  }
}