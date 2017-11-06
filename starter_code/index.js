const Elevator = require('./elevator.js');
const Person = require('./person.js');

var e = new Elevator();

e.start();
e.call(new Person("James", 6 , 10));
e.call(new Person("Pepe", 2 , 0));
e.call(new Person("Arturo", 2 , 0));
e.call(new Person("Nano", 2 , 0));
e.call(new Person("Alex", 9 , 0));

setTimeout(function(){
  e.call(new Person("James", 4 , 10));
}, 26000);
