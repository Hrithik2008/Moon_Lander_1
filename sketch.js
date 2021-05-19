const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var gameState = 0;

var engine,
  world,
  lander,
  grounds = [];
var font;
var endSpeed;

function preload() {
  font = loadFont("AvenirNext-DemiBold.ttf");
}

function setup() {
  createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 1;
  lander = new Lander(width / 2, 0);
  for (var i = 0; i < terrain.length; i++) {
    grounds[i] = new Ground(i, height - terrain[i] / 4, 1, terrain[i] / 2);
  }
  angleMode(DEGREES);
  //frameRate(5);
}

function draw() {
  Engine.update(engine);
  noStroke();
  background(0, 255, 255);
  if (gameState === 0) {
    textFont(font);
    textSize(128);
    textAlign(CENTER);
    text("Moon Lander", width / 2, 128);
    gameState = 1;
  }
  if (gameState === 1) {
      endSpeed = lander.body.speed;
      if (keyIsDown(LEFT_ARROW)) {
        Matter.Body.applyForce(
          lander.body,
          { x: lander.body.position.x - 50, y: lander.body.position.y },
          { x: -0.00075, y: 0 }
        );
      }
      if (keyIsDown(RIGHT_ARROW)) {
        Matter.Body.applyForce(
          lander.body,
          { x: lander.body.position.x + 50, y: lander.body.position.y },
          { x: 0.00075, y: 0 }
        );
      }
      if (keyIsDown(32)) {
        lander.fire();
      }
    textSize(24);
    text("Fuel Left :", 950, 20);
    rect(900, 30, 250, 20);
    fill(255, 255, 0);
    var lf = map(lander.fuel, 0, 200, 0, 250);
    rect(900, 30, lf, 20);
    fill(255);
    text("Velocity", 1075, 100);
    rect(1050, 120, 75, 200);
    push();
    fill(0, 255, 0);
    rect(1050, 300, 75, 40);
    pop();
    var vel = map(endSpeed, 0, 25, 320, 120);
    push();
    fill("green");
    rect(1050, vel, 75, 1);
    pop();
    for (var i in grounds) {
      grounds[i].display();
      if (detectCollision(lander, grounds[i])){
        gameState = 2;
        //Body.setStatic(lander.body, true);
      }
    }
    lander.display();
    //console.log(lander.body.speed);
  }
  if (gameState === 2) {
    if (endSpeed <= 4) {
      textSize(24);
      text("You have safely landed", width / 2, height / 2);
      text(
        `Your score is ${map(lander.fuel, 0, 200, 0, 1000)}`,
        width / 2,
        height / 2 + 50
      );
    } else {
      textSize(24);
      text("You have crashed", width / 2, height / 2);
    }
    if(keyIsDown(82)){
      reset();
    }
  }
  
}

function detectCollision(bodyA, bodyB) {
  var posA = bodyA.body.position;
  var posB = bodyB.body.position;
  var distance = dist(posA.x, posA.y, posB.x, posB.y);
  if (distance <= 25 + bodyB.h / 2) {
    return true;
  }
}

function reset(){
  gameState = 1;
  Body.setPosition(lander.body,{x : 600,y:0});
  //Body.setStatic(lander.body,false);
  lander.fuel = 200;
}