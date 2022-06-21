var ballPosX;
var ballPosY;
var ballSize = 15;
var ballVelY = 0;
var ballVelX = -5 + Math.floor(Math.random() * 10);

var score = 0;
var ai = false;

var paddleX;
var paddleY;
var paddleSize = [150, 25];
var cnv;

function setup() {
    canvas = createCanvas(700, 500);
    canvas.parent('sketch-holder');

    ballPosX = width * 0.5;
    ballPosY = height * 0.15;
    paddleX = width/2 - paddleSize[0]/2;
    paddleY = height - 100;
    frameRate(60);
}

function draw() {
    background("gray");
    noStroke();
    ball();
    paddle();
}

function paddle() {
    strokeWeight(2);
    stroke("black")
    fill("white");
    rect(paddleX, paddleY, paddleSize[0], paddleSize[1])
    paddleX = mouseX - paddleSize[0]/2;

    if (paddleX + paddleSize[0] > mouseX || paddleX < mouseX) {
        paddleVel = 0;
    }
    if (paddleX + paddleSize[0]/2 < mouseX - 15) {
        paddleVel += 12;
    }
    else if (paddleX + paddleSize[0]/2 > mouseX + 15) {
        paddleVel -= 12;
    }

    if (ai) {
        paddleX = ballPosX - paddleSize[0]/2;
    }

    if (paddleX < 0) {
        paddleX = 0;
        paddleVel = 0;
    }
    if (paddleX + paddleSize[0] > width) {
        paddleX = width - paddleSize[0] - 0.5;
        paddleVel = 0;
    }
}

function ball() {
    stroke("cyan")
    strokeWeight(3);
    fill("magenta");
    ellipse(ballPosX, ballPosY, ballSize, ballSize);
    ballPosY += ballVelY;
    ballPosX += ballVelX;

    if (ballPosY + ballSize/2 < height) {
        ballVelY += 0.2;
    }
    if (ballPosY + ballSize/2 > height) {
        restart();
    }

    if (ballPosY - ballSize/2 < 0) {
        ballPosY = 0 + ballSize/2;
        ballVelY = -ballVelY * 1;
    }
    if (ballPosX - ballSize/2 < 0) {
        ballPosX = 0 + ballSize/2;
        ballVelX = -ballVelX * 1.1;
    }
    if (ballPosX + ballSize/2 > width) {
        ballPosX = width - ballSize/2;
        ballVelX = -ballVelX * 1.1;
    }
    
    console.log(ballVelX);
    if (ballVelY > 13) {
        ballVelY = 13;
    }
    if (ballVelY < -13) {
        ballVelY = -13;
    }
    if (ballVelX > 150) {
        ballVelX = 150;
    }
    if (ballVelX < -150) {
        ballVelX = -150;
    }
    

    if (ballPosX + ballSize > paddleX && ballPosX - ballSize < paddleX + paddleSize[0] && ballPosY + ballSize/2 >= paddleY && ballPosY - ballSize <= paddleY + paddleSize[1]) {
        if (ballPosX > paddleX && ballPosX < paddleX + 50 && ballVelX > 0) {
            ballVelX = -ballVelX;
        }
        if (ballPosX > paddleX + 100 && ballPosX < paddleX + paddleSize[0] && ballVelX < 0) {
            ballVelX = -ballVelX;
        }
        ballPosY = paddleY - 5;
        ballVelX += -0.8 + Math.floor(Math.random() * 1.6);
        ballVelY = -ballVelY * 1.001;
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;
    }
}
function mouseClicked() {
    ai = !ai;
}

function restart() {ballVelX = 0;
    ballVelX = -5 + Math.floor(Math.random() * 10);
    ballVelY = 0;
    ballPosX = ballSize + Math.floor(Math.random() * width - ballSize);
    ballPosY = height * 0.15;
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score;
}