import View from './view.js';
import Model from './model.js';

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.model.ballEvent.addListner((ball) =>
      this.view.drawBall(ball),
    );
    this.model.scoreEvent.addListner((score) =>
      this.view.drawScore(score),
    );
    this.model.aiEvent.addListner((ai) => this.view.drawPlayer(ai));
    this.model.resetBall();
  }

  run() {
    this.model.updateModel();
  }
}

export default Controller;
