import Event from './event.js';

class View {
  constructor() {
    this.cvs = document.getElementById('pong');
    this.ctx = this.cvs.getContext('2d');
    this.ball = {
      x: 0,
      y: 0,
      radius: 0,
    };
  }
  setBall(ball) {
    this.ball.x = ball.x;
    this.ball.y = ball.y;
    this.ball.radius = ball.radius;
  }
  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.rect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.fill();
  }

  drawBall() {
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(
      this.ball.x,
      this.ball.y,
      this.ball.radius,
      0,
      2 * Math.PI,
      false,
    );

    this.ctx.fill();
  }
  render() {
    this.clear();
    this.drawBall();
  }
}

export default View;
