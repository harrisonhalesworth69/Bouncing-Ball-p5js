/*
 * This program sketch is copied from Prof. Xiannong Meng's example at
 * https://editor.p5js.org/xmeng/sketches/2d1U_D7rw
 * This is from my own learning.
 * Harrison Halesworth
 * Revisions
 * 1. 2022-11-29 Created a new function that rerandomizes the color for each ball and the box in the display each time the mouse is pressed
 * 2. 2022-11-29 Made it so that every time a ball hits the wall or the box, its speed is doubled, causing the balls to become so fast after a couple of collisions that they fly off the screen. Also every time the mouse is pressed, the balls become a random size as well
 * 3. 2022-11-29 The balls become so fast after a couple of collisions, so a new game comes of this where you see how long you can press the screen and move the balls before they are all gone!
 */

const BOX_WIDTH  = 250;  // textbox dimensions
const BOX_HEIGHT = 100;

var balls = [];
var sound;
var testBall;

function preload() {
  //uncomment once you have audio
  sound = loadSound("Hello Song.mp3");  // preload the sound file
}

function setup() {

//  createCanvas(windowWidth, windowHeight);
  createCanvas(600,400)

  
  noStroke();
  
  //uncomment once you have audio
  //sound.play();    // play the audio file once
  sound.loop();  // play the sound file repeatedly
  
  for (var ballNum = 0; ballNum < 10; ballNum++) {
  	balls[ballNum] = new Ball();  
  }

  let y = height;
  testBall = new Ball();
  testBall.size = 50;
  testBall.ballX = 220;  // if ballX == 225, the ball just slides over the right edge
  testBall.ballY = 300;
  testBall.red = 0;
  testBall.blue = 0;
  testBall.green = 0;
  testBall.speedX = 0;
  testBall.speedY = 1.2;
}

function createBox() {
  // prepare a box first
  strokeWeight(4);
  rect(0, 0, BOX_WIDTH, BOX_HEIGHT);
  
  textSize(32);           // size of the text (pixels)
  fill(0, 102, 153);      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  text('CSCI201 rules!', BOX_WIDTH/2, BOX_HEIGHT/2);   
 
}

function draw() {

  background(255);
  createBox();
  
  testBallMove();  // a special ball to test corner collision
  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    balls[ballNum].checkForHitBox();
    balls[ballNum].moveBall();
    
    if (mouseIsPressed) {
      specialMousePress(balls[ballNum])
      balls[ballNum].randomize()
    }
    }
}

function testBallMove() {
  
  testBall.display();
  testBall.checkForHitWall();
  testBall.checkForHitBox();
  testBall.moveBall();
}

function specialMousePress(ball) { 
  ball.red   = random(255);
  ball.green = random(255);
  ball.blue  = random(255)
  ball.size = random(100)
}

class Ball { // Constructor
  
  constructor() {
    // initial position
    this.ballX = random(100, width)
    this.ballY = random(100, height)
    
    // Dictates velocity + direction
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
    
    this.size = random(100);
    
    // How transparent the ball is
    this.alpha = 100
    
    // RGB values for color
    this.red   = random(255);
    this.green = random(255);
    this.blue  = random(255)
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  randomize() {
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY+radius) > height || (this.ballY-radius) < 0) {
  	  this.speedY *= -2 //this.speedY;  
  	}
    if ((this.ballX+radius) > width  || (this.ballX-radius) < 0) {
      this.speedX *= -2 //this.speedX;  
    }
  }
  
  checkForHitBox() {
    
    let radius = this.size / 2;

//    if (((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT) || d < radius) {
    if (((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT)) {
      // bump into the textbox, need to reverse direction
      this.reverseBall();
    }
  }
  
  reverseBall() {
    
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveBall() {

    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
}