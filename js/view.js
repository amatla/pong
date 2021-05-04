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
    console.log('setball');
    console.log('ball', ball);
    this.ball.x = ball.x;
    this.ball.y = ball.y;
    this.ball.radius = ball.radius;
    console.log('ballX = ', this.ball.x);
    console.log('ballY = ', this.ball.y);
    console.log('radius = ', this.ball.radius);
  }
  clear() {
    console.log(this.ctx);
    this.ctx.fillstyle = 'black';
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
  }
  drawBall() {
    this.ctx.fillStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.arc(
      this.ball.x,
      this.ball.y,
      this.ball.radius,
      0,
      2 * Math.PI,
      false,
    );
    this.ctx.closePath();
    this.ctx.fill();
  }
  render() {
    this.clear();
    this.drawBall();
  }
}

export default View;
