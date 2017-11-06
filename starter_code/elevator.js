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
      if (this.requests.length > 0) this.move();
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
    for (var i = this.waitingList.length - 1; i >= 0; i--) {
      if (this.waitingList[i].originFloor === this.floor) {
        this.passengers.push(this.waitingList[i]);
        if (this.requests.indexOf(this.waitingList[i].destinationFloor) === -1){
          this.requests.push(this.waitingList[i].destinationFloor);
        }
        console.log(`${this.waitingList[i].name} has enter the elevator`);
        this.waitingList.splice(this.waitingList.indexOf(this.waitingList[i]), 1);
        this.requests.splice(this.requests.indexOf(this.floor), 1);
      }
    }
  }

  _passengersLeave() {
    for (var i = this.passengers.length - 1; i >= 0; i--) {
      if (this.passengers[i].destinationFloor === this.floor) {
        console.log(`${this.passengers[i].name} has left the elevator`);
        this.passengers.splice(this.passengers.indexOf(this.passengers[i]), 1);
        this.requests.splice(this.requests.indexOf(this.floor), 1);
      }
    }
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
    if (this.requests.indexOf(person.originFloor) === -1) this.requests.push(person.originFloor);
    this.requests.sort((a, b) => a - b);
    this.waitingList.push(person);
  }

  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
  }
}

module.exports = Elevator;
