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