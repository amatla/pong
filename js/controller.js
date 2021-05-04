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
  }

  run() {
    this.model.update();
    this.view.render();
  }
}

export default Controller;
