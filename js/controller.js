import View from './view.js';
import Model from './model.js';

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.model.ballEvent.addListner((ball) =>
      this.view.setBall(ball),
    );
    this.model.playerEvent.addListner((player) =>
      this.view.setPlayer(player),
    );
    this.model.aiEvent.addListner((ai) => this.view.setAi(ai));
    this.model.scoreEvent.addListner((score) =>
      this.view.setScore(score),
    );
    this.view.updatePlayerEvent.addListner((playerPosition) =>
      this.model.updatePlayer(playerPosition),
    );
    this.model.playerEvent.trigger({
      x: this.model.player.position.x,
      y: this.model.player.position.y,
      width: this.model.player.width,
      height: this.model.player.height,
    });
    this.model.resetBall();
  }

  run() {
    this.model.update();
    this.view.render();
  }
}

export default Controller;
