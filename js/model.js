import Event from './event.js';

class Model {
  constructor() {
    this.table = new Table(600, 400);
    this.ball = new Ball(
      this.table.size.x / 2,
      this.table.size.y / 2,
      6,
    );
    this.ball.velocity.x = 1;
    this.ball.velocity.y = 1;
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
    this.position = new Point(positionX, positionY);
    this.radius = radius;
    this.velocity = new Vector2D();
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
