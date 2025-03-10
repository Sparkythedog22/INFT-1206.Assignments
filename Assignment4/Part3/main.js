// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// class to represent a ball

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    // Check if ball has gone past the right edge of the screen
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    // Check if ball has gone past the left edge of the screen
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    // Check if ball has gone past the bottom edge of the screen
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    // Check if ball has gone past the top edge of the screen
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    // Move the ball
    this.x += this.velX;
    this.y += this.velY;
  }  
}



const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
  }

  requestAnimationFrame(loop);
}

loop();
