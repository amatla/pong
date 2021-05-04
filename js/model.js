import Event from './event.js';

class Model {
  constructor() {
    this.table = new Table(600, 400);
    this.ball = new Ball(
      this.table.size.x / 2,
      this.table.size.y / 2,
      6,
    );
    this.ballEvent = new Event();
  }

  update() {
    console.log('triggering');
    this.ballEvent.trigger({
      x: this.ball.position.x,
      y: this.ball.position.y,
      radius: this.ball.radius,
    });
  }
}

class Vector2D {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  set magnitude(magnitude) {
    let direction = Math.atan2(this.y, this.x);
    this.x = Math.cos(direction) * magnitude;
    this.y + Math.sin(direction) * magnitude;
  }
}

class Table {
  constructor(x = 0, y = 0) {
    this.size = new Vector2D(x, y);
    this.position = new Vector2D(0, 0);
  }
}

class Ball {
  constructor(positionX = 0, positionY = 0, radius = 5) {
    this.position = new Vector2D(positionX, positionY);
    this.radius = radius;
    this.velocity = new Vector2D();
  }
}
export default Model;
