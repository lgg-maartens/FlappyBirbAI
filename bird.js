class Bird {
  constructor(brain) {
    this.x = 640 / 3;
    this.y = 100;
    this.h = 30;
    this.w = 60;
    this.velocity = 0;
    this.acceleration = 0.9;
    this.gravity = 0.9;


     // Is this a copy of another Bird or a new one?
    // The Neural Network is the bird's "brain"
    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
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
      this.velocity += this.acceleration;
      this.y += this.velocity;
    }

    if(this.y < 0){
      this.y = 0;
    }

    // without rotation
    image(birb_bg, this.x, this.y, this.w, this.h);
  }

  up(){
    this.velocity = -10;
  }

  hit(){
    let idx = activeBirds.indexOf(this);
    activeBirds.splice(idx, 1);
  }
  
  think(pipes) {
    // First find the closest pipe
    let closest = null;
    let record = Infinity;
    
    for (let i = 0; i < pipes.length; i++) {
      let diff = pipes[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = pipes[i];
      }
    }

    if (closest != null) {
      // Now create the inputs to the neural network
      let inputs = [];
      // x position of closest pipe
      inputs[0] = map(closest.x, this.x, width, 0, 1);
      // top of closest pipe opening
      inputs[1] = map(closest.y, 0, height, 0, 1);
      // bottom of closest pipe opening
      inputs[2] = map(closest.bottom, 0, height, 0, 1);
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