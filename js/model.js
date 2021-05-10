import Event from './event.js';

class Model {
  constructor(
    tableWidth = 600,
    tableHeight = 400,
    paddleWidth = 15,
    paddleHeight = 100,
    playerPadding = 20,
    ballRadius = 6,
  ) {
    this.table = { width: tableWidth, height: tableHeight };
    this.ball = new Ball(this.table.width / 2, this.table.height / 2, ballRadius);
    this.player = new Player(0 + playerPadding, (tableHeight- paddleHeight) / 2, paddleWidth, paddleHeight, 'Player');
    this.ai = new Player(tableWidth - paddleWidth - playerPadding, (tableHeight- paddleHeight) / 2, paddleWidth, paddleHeight, 'AI');
    this.initialSpeed = 2;
    this.ballEvent = new Event();
    this.aiEvent = new Event();
    this.scoreEvent = new Event();
  }
  updateScore(){
    if(this.ball.left <= 0){
      this.ai.score += 1;
      this.resetBall();
      this.scoreEvent.trigger({name = this.ai.name, score: this.ai.score});
    }
    if(this.ball.right >= this.table.width){
      this.player.score += 1;
      this.resetBall();
      this.scoreEvent.trigger({name = this.player.name, score: this.player.score});
    }
  }
  resetBall(){
    [this.ball.position.x, this.ball.position.y] = [this.table.width / 2, this.table.height / 2];
    let direction = Math.random() * (2 * Math.PI);
    [this.ball.velocity.x, this.ball.velocity.y] = [Math.cos(direction) * this.initialSpeed, Math.sin(direction) * this.initialSpeed];
  }
  updateBall(){
    this.ball.position.x += this.ball.velocity.x;
    this.ball.position.y += this.ball.velocity.y;
    if(this.ball.top <= 0 || this.ball.bottom >= this.table.height){
      this.ball.velocity.y *= -1;
      this.ball.speed += 0.1;
    }
    this.ballEvent.trigger({x: this.ball.position.x, y: this.ball.position.y})
  }
  updateAI(){
    this.ai.position.y += (this.ball.position.y - (this.ai.position.y + this.ai.height / 2)) * 0.05;
    this.aiEvent.trigger({x: this.ai.position.x, y: this.ai.position.y});
  }
  collision(){
    let currentPlayer = this.ball.position.x > this.table.width / 2 ? this.ai : this.player;
    if(currentPlayer.left < this.ball.right && currentPlayer.right > this.ball.left && currentPlayer.top < this.ball.bottom && currentPlayer.bottom > this.ball.top){
      let collisionPt = this.ball.position.y - (currentPlayer.position.y - currentPlayer.height / 2);
      collisionPt = collisionPt / (currentPlayer.height / 2);
      let angle = (Math.PI / 4) * collisionPt;
      let direction = currentPlayer.name === 'AI' ? -1 : 1;
      [this.ball.velocity.x, this.ball.velocity.y] = [direction * this.ball.speed * Math.cos(angle), direction * this.ball.speed * Math.sin(angle)];
      this.ball.speed += 0.5
      this.ballEvent.trigger({x: this.ball.position.x, y: this.ball.position.y})
    }
  }
  updateModel(){
    this.updateScore();
    this.updateBall();
    this.updateAI();
    this.collision();
  }

}
class Ball {
  constructor(
    posX = 0,
    posY = 0,
    radius = 5,
    velocity = { x: 1, y: 1 },
  ) {
    this.position = { x: posX, y: posY };
    this.radius = radius;
    this.velocity = velocity;
  }
  get speed() {
    if (this.velocity.x === 0 && this.velocity.y === 0) return 0;
    else
      return Math.sqrt(
        this.velocity.x * this.velocity.x +
          this.velocity.y * this.velocity.y,
      );
  }
  set speed(){
    let normal = [this.velocity.x / this.speed, this.velocity.y / this.speed];
    this.velocity.x = normal[0] * this.speed;
    this.velocity.y = normal[1] * this.speed;
  }
  get bottom(){
    return this.position.y + this.radius;
  }
  get top(){
    return this.position.y - this.radius;
  }
  get right(){
    return this.position.x + this.radius;
  }
  get left(){
    return this.position.x - this.radius;
  }
}
class Player{
  constructor(posX = 0, posY = 0, width = 10, height = 50, name = 'Player'){
    this.name  = name;
    this.score = 0;
    this.position = {x: posX, y: posY};
    this.width = width;
    this.height = height;
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

export default Model;