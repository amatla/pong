import Event from './event.js';

class Model {
  constructor() {
    this.table = new Table(600, 400);
    this.playerWidth = 15;
    this.playerHeight = 100;
    this.ball = new Ball(
      this.table.width / 2,
      this.table.height / 2,
      6,
    );
    this.player = new Player(
      0,
      this.table.height / 2 - this.playerHeight / 2,
      this.playerWidth,
      this.playerHeight,
      'Player',
    );
    this.ai = new Player(
      this.table.width - this.playerWidth,
      this.table.height / 2 - this.playerHeight / 2,
      this.playerWidth,
      this.playerHeight,
      'AI',
    );
    this.playerEvent = new Event();
    this.aiEvent = new Event();
    this.initialSpeed = 2;
    this.initialDirection = Math.random() * (2 * Math.PI);
    [this.ball.velocity.x, this.ball.velocity.y] = [
      Math.cos(this.initialDirection) * this.initialSpeed,
      Math.sin(this.initialDirection) * this.initialSpeed,
    ];
    this.ballEvent = new Event();
  }

  resetBall() {
    [this.ball.position.x, this.ball.position.y] = [
      this.table.width / 2,
      this.table.height / 2,
    ];
    this.initialDirection = Math.random() * (2 * Math.PI);
    [this.ball.velocity.x, this.ball.velocity.y] = [
      Math.cos(this.initialDirection) * this.initialSpeed,
      Math.sin(this.initialDirection) * this.initialSpeed,
    ];
  }

  wallHit() {
    if (this.ball.bottom > this.table.height || this.ball.top < 0) {
      this.ball.velocity.y *= -1;
    }
  }
  updateAI() {
    if (this.ball.top - this.ai.height / 2 < 0) {
      this.ai.position.y = 0;
    } else if (
      this.ball.bottom + this.ai.height / 2 >
      this.table.height
    ) {
      this.ai.position.y = this.table.height - this.ai.height;
    } else
      this.ai.position.y = this.ball.position.y - this.ai.height / 2;
  }
  collision(ball, player) {
    return (
      player.left < ball.right &&
      player.top < ball.bottom &&
      player.right > ball.left &&
      player.bottom > ball.top
    );
  }

  update() {
    if (this.ball.left <= 0) {
      this.ai.score += 1;
      this.resetBall();
    }
    this.ball.position.x += this.ball.velocity.x;
    this.ball.position.y += this.ball.velocity.y;
    this.updateAI();
    this.wallHit();
    let currentPlayer =
      this.ball.position.x > this.table.width / 2
        ? this.ai
        : this.player;
    if (this.collision(currentPlayer, this.ball)) {
      this.ball.velocity.x *= -1;
    }
    this.ballEvent.trigger({
      x: this.ball.position.x,
      y: this.ball.position.y,
      radius: this.ball.radius,
    });
    this.aiEvent.trigger({
      x: this.ai.position.x,
      y: this.ai.position.y,
      width: this.ai.width,
      height: this.ai.height,
    });
    this.playerEvent.trigger({
      x: this.player.position.x,
      y: this.player.position.y,
      width: this.player.width,
      height: this.player.height,
    });
  }
}
class Table {
  constructor(width = 0, height = 0) {
    this.width = width;
    this.height = height;
    this.position = new Point(0, 0);
  }
}
class Ball {
  constructor(posX = 0, posY = 0, radius = 5) {
    this.position = new Point(posX, posY);
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
class Player {
  constructor(
    posX = 0,
    posY = 0,
    width = 10,
    height = 50,
    name = '',
  ) {
    this.name = name;
    this.score = 0;
    this.position = new Point(posX, posY);
    this.width = width;
    this.height = height;
    this.velocity = new Vector2D(0, 0);
  }
  get top() {
    return this.position.y;
  }
  get bottom() {
    return this.position.y + this.height;
  }
  get left() {
    return this.position.x;
  }
  get right() {
    return this.position.x + this.width;
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
    if (this.x === 0 && this.y === 0) return 0;
    else return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
export default Model;
