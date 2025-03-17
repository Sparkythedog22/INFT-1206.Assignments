// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const para = document.querySelector("p");

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// define classes

class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class Ball extends Shape {
  exists;

  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;

    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    // Check if ball has gone past screen bounds

    // Right
    if ((this.x + this.size) >= width) {
      this.velX = -Math.abs(this.velX);
    }
  
    // Left
    if ((this.x - this.size) <= 0) {
      this.velX = Math.abs(this.velX);
    }
  
    // Bottom
    if ((this.y + this.size) >= height) {
      this.velY = -Math.abs(this.velY);
    }
  
    // Top
    if ((this.y - this.size) <= 0) {
      this.velY = Math.abs(this.velY);
    }
  
    // Move the ball
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    });
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    // Check if ball has gone past screen bounds

    // Right
    if ((this.x + this.size) >= width) {
      this.x -= this.size;
    }
  
    // Left
    if ((this.x - this.size) <= 0) {
      this.x += this.size;
    }
  
    // Bottom
    if ((this.y + this.size) >= height) {
      this.y -= this.size;
    }
  
    // Top
    if ((this.y - this.size) <= 0) {
      this.y += this.size;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          ballCountDecrement();
        }
      }
    }
  }
}

let ballCount = 0;
function ballCountIncrement() {
  ballCount++;
  para.textContent = `Ball count: ${ballCount}`;
}
function ballCountDecrement() {
  ballCount--;
  para.textContent = `Ball count: ${ballCount}`;
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
    size
  );

  balls.push(ball);
  ballCountIncrement();
}

// Spawn the player.
// If the player is spawned offscreen, it will immediately be moved onscreen.
const player = new EvilCircle(
  random(0, width),
  random(0, height)
);

function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if(ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  // Draw the evil circle
  player.draw();
  player.checkBounds();
  player.collisionDetect();

  requestAnimationFrame(loop);
}

loop();
