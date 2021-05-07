import Event from './event.js';

class View {
  constructor() {
    this.cvs = document.getElementById('pong');
    this.ctx = this.cvs.getContext('2d');
    this.ball = {
      x: 0,
      y: 0,
      radius: 0,
      color: 'red',
    };
    this.playerPadding = 0;
    this.player = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      color: 'orange',
    };
    this.ai = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      color: 'green',
    };
  }
  setPlayer(player) {
    this.player.x = player.x;
    this.player.y = player.y;
    this.player.width = player.width;
    this.player.height = player.height;
  }
  setAi(ai) {
    this.ai.x = ai.x;
    this.ai.y = ai.y;
    this.ai.width = ai.width;
    this.ai.height = ai.height;
  }
  setBall(ball) {
    this.ball.x = ball.x;
    this.ball.y = ball.y;
    this.ball.radius = ball.radius;
  }
  clear() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
  }
  drawPlayer(player) {
    this.ctx.fillStyle = player.color;
    this.ctx.fillRect(
      player.x,
      player.y,
      player.width,
      player.height,
    );
  }
  drawBall() {
    this.ctx.fillStyle = this.ball.color;
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
    this.drawPlayer(this.player);
    this.drawPlayer(this.ai);
    this.drawBall();
  }
}

export default View;
