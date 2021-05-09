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
    this.playerPadding = 10;
    this.player = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      score: 0,
      color: 'orange',
    };
    this.ai = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      score: 0,
      color: 'green',
    };
    this.net = {
      x: this.cvs.width / 2 - 2,
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
  setScore(score) {
    if (score.name == 'AI') this.ai.score += 1;
    if (score.name == 'Player') this.player.score += 1;
    console.log(this.ai.score);
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
  drawScore() {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '72px fira code';
    this.ctx.fillText(
      this.ai.score,
      (3 * this.cvs.width) / 4,
      this.cvs.height / 6,
    );
    this.ctx.fillText(
      this.player.score,
      this.cvs.width / 5,
      this.cvs.height / 6,
    );
    for (let i = 0; i <= this.cvs.height; i += 15) {
      this.ctx.fillRect(this.cvs.width / 2 - 2, i, 4, 10);
    }
  }
  render() {
    this.clear();
    this.drawPlayer(this.player);
    this.drawPlayer(this.ai);
    this.drawBall();
    this.drawScore();
  }
}

export default View;
