class Elevator {
  constructor() {
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.direction = "up";
    this.requests = [];
    this.waitingList = [];
    this.passengers = [];

  }

  start() {
    this.interval = setInterval(() => {
      this.move();
      this.update();
    }, 1000);
  }
  stop() {
    clearInterval(this.interval);
  }
  update() {
    this.log();
  }
  _passengersEnter() {
    this.waitingList.forEach((e, i) => {
      if (e.originFloor === this.floor) {
        this.passengers.push(e);
        this.waitingList.splice(i, 1);
        this.requests.push(e.destinationFloor);
        console.log(`${e.name} has enter the elevator`);
      }
    });
  }
  _passengersLeave() {
    this.passengers.forEach((e, i) => {
      if (e.destinationFloor === this.floor) {
        this.passengers.splice(i, 1);
        this.requests.splice(this.requests.indexOf(this.floor), 1);
        console.log(`${e.name} has left the elevator`);
      }
    });
  }
  move() {
    this.direction === "up" ? this.floorUp() : this.floorDown();
  }
  floorUp() {
    this.floor++;
    this._passengersLeave();
    this._passengersEnter();
    if (this.floor === this.MAXFLOOR) this.direction = "down";
  }
  floorDown() {
    this.floor--;
    this._passengersLeave();
    this._passengersEnter();
    if (this.floor === 0) this.direction = "up";
  }
  call(person) {
    console.log(person);
    this.requests.push(person.originFloor);
    this.waitingList.push(person);
  }

  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
  }
}

module.exports = Elevator;
