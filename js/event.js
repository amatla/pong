/** Event class that will notify its listeners every time the event is triggered */
class Event {
  constructor() {
    this.listeners = [];
  }
  addListner(listner) {
    this.listeners.push(listner);
  }
  trigger(params) {
    this.listeners.forEach((listner) => listner(params));
  }
}

export default Event;
