import View from './view.js';
import Model from './model.js';

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.start;
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
  }

  run() {
    this.model.update();
    this.view.render();
  }
}

export default Controller;
