import Event from './event.js';

class View {
  constructor(
    tableWidth = 600,
    tableHeight = 400,
    paddleWidth = 15,
    paddleHeight = 100,
    playerPadding = 20,
    ballRadius = 6,
  ) {
    this.cvs = document.getElementById('pong');
    this.ctx = this.cvs.getContext('2d');
    this.playerEvent = new Event();
    this.cvs.addEventListener('mousemove', (event) => {
      let bound = this.cvs.getBoundingClientRect();
      this.player.y =
        event.clientY - bound.top - this.player.height / 2;
      this.playerEvent.trigger({ y: this.player.y });
    });
    this.ballColor = 'red';
    this.aiColor = 'orange';
    this.player = {
      x: 0,
      y: 0,
      width: paddleWidth,
      height: paddleHeight,
      score: 0,
    };
  }
  refresh() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
  }
  drawBall(ball) {
    this.refresh();
    this.ctx.fillStyle = this.ballColor;
    this.ctx.beginPath();
    this.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }
  drawPlayer(player) {
    this.ctx.fillStyle = this.aiColor;
    this.ctx.fillRect(
      player.x,
      player.y,
      player.width,
      player.height,
    );
  }
  drawScore(score) {
    console.log('score  ');
    this.ctx.fillStyle = 'white';
    this.ctx.font = '72px fira code';
    this.ctx.fillText(
      score.ai,
      (3 * this.cvs.width) / 4,
      this.cvs.height / 6,
    );
    this.ctx.fillText(
      score.player,
      this.cvs.width / 5,
      this.cvs.height / 6,
    );
    for (let i = 0; i <= this.cvs.height; i += 15) {
      this.ctx.fillRect(this.cvs.width / 2 - 2, i, 4, 10);
    }
  }
}
export default View;
