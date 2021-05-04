import Controller from './controller.js';
let start;
const pong = new Controller();
function play(current) {
  if (start === undefined) start = current;
  const elapsed = current - start;
  pong.run();
  requestAnimationFrame(play);
}
requestAnimationFrame(play);
