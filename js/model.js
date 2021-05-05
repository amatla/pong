import Event from './event.js';

class Model {
  constructor() {
    this.table = new Table(600, 400);
    this.ball = new Ball(
      this.table.size.x / 2,
      this.table.size.y / 2,
      6,
    );
    this.initialSpeed = 2;
    this.initialDirection = Math.random() * (2 * Math.PI);
    [this.ball.velocity.x, this.ball.velocity.y] = [
      Math.cos(this.initialDirection) * this.initialSpeed,
      Math.sin(this.initialDirection) * this.initialSpeed,
    ];
    this.ballEvent = new Event();
  }

  update() {
    this.ball.position.x += this.ball.velocity.x;
    this.ball.position.y += this.ball.velocity.y;
    this.ballEvent.trigger({
      x: this.ball.position.x,
      y: this.ball.position.y,
      radius: this.ball.radius,
    });
    this.collision();
    console.log(this.ball.speed);
  }

  collision() {
    if (this.ball.bottom >= this.table.size.y || this.ball.top <= 0) {
      this.ball.velocity.y *= -1;
    }
    if (this.ball.right >= this.table.size.x || this.ball.left <= 0)
      this.ball.velocity.x *= -1;
  }
}
class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
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
}

class Table {
  constructor(x = 0, y = 0) {
    this.size = new Vector2D(x, y);
    this.position = new Vector2D(0, 0);
  }
}

class Ball {
  constructor(positionX = 0, positionY = 0, radius = 5) {
    this.position = new Point(positionX, positionY);
    this.radius = radius;
    this.velocity = new Vector2D(1, 1);
  }
  get speed() {
    return this.velocity.magnitude;
  }
  set speed(speed) {
    let norm = [
      this.velocity.x / this.velocity.magnitude,
      this.velocity.y / this.velocity.magnitude,
    ];
    this.velocity.x = norm[0] * speed;
    this.velocity.y = norm[1] * speed;
  }
  get bottom() {
    return this.position.y + this.radius;
  }
  get top() {
    return this.position.y - this.radius;
  }
  get right() {
    return this.position.x + this.radius;
  }
  get left() {
    return this.position.x - this.radius;
  }
}
export default Model;
