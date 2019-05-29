var animals = [];
var food = [];
var poison = [];
var counter = 0;

var debug;

function setup() {
  createCanvas(1000, 562);
  for (var i = 0; i < 60; i++) {
    var x = random(width);
    var y = random(height);
    animals[i] = new Animal(x, y);
  }

  for (var i = 0; i < 750; i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }

  for (var i = 0; i < 75; i++) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }

  debug = createCheckbox();

}

function mouseClick() {
  animals.push(new Animal(mouseX, mouseY));
}

function draw() {
  background(11);

  if (random(1) < 0.12) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }

  if (random(1) < 0.0105) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }


  for (var i = 0; i < food.length; i++) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 4, 4);
  }

  for (var i = 0; i < poison.length; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 5, 5);
  }

  for (var i = animals.length - 1; i >= 0; i--) {
    animals[i].boundaries();
    animals[i].behaviors(food, poison);
    animals[i].update();
    animals[i].display();

    var newAnimal = animals[i].clone();
    if (newAnimal != null) {
      animals.push(newAnimal);
    }

    if (animals[i].dead()) {
      var x = animals[i].position.x;
      var y = animals[i].position.y;
      food.push(createVector(x, y));
      animals.splice(i, 1);
    }

  }
}