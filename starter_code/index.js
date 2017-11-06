const Elevator = require('./elevator.js');
const Person = require('./person.js');

var e = new Elevator();

e.start();
e.call(new Person("James", 6 , 10));

// setTimeout(function(){
//   e.start();
//   e.move();
// }, 5000);
