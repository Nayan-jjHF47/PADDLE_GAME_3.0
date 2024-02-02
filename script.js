const userPaddle = document.getElementById('userPaddle');
const computerPaddle = document.getElementById('computerPaddle');
const ball = document.getElementById('ball');
const gameOverMsg = document.getElementById('gameOverModal');
const newGameBtn = document.getElementById('newGameBtn');
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const simpleBtn = document.getElementById('simpleBtn');
const mediumBtn = document.getElementById('mediumBtn');
const advancedBtn = document.getElementById('advancedBtn');
const modeText = document.getElementById('modeText');

let paddleSpeed = 1; // Default paddle speed
let ballSpeed = 4; // Default ball speed

let userPaddleY = 150;
let computerPaddleY = 150;

let ballX = 400;
let ballY = 200;
let ballSpeedX = ballSpeed;
let ballSpeedY = ballSpeed;

let gameActive = false;

function startGame() {
    if (!gameActive) {
        gameActive = true;
        moveBall();
        updateGame();
    }
}

function moveUserPaddleUp() {
    if (userPaddleY > 0) {
        userPaddleY -= 10; // Adjust paddle movement increment
        userPaddle.style.top = `${userPaddleY}px`;
    }
}

function moveUserPaddleDown() {
    if (userPaddleY < 300) {
        userPaddleY += 10; // Adjust paddle movement increment
        userPaddle.style.top = `${userPaddleY}px`;
    }
}

function moveComputerPaddle() {
    if (gameActive) {
        // Improved AI: Adjusts paddle position based on the ball's position and speed
        const targetY = ballY + ballSpeedY * 3; // Predict the future position of the ball
        const errorMargin = 0; // A small margin to make the game more challenging

        if (targetY < computerPaddleY + 50 - errorMargin && computerPaddleY > 0) {
            computerPaddleY -= paddleSpeed;
        } else if (targetY > computerPaddleY + 50 + errorMargin && computerPaddleY < 300) {
            computerPaddleY += paddleSpeed;
        }

        // Ensure the paddle does not go out of bounds
        computerPaddleY = Math.max(0, Math.min(computerPaddleY, 300));

        computerPaddle.style.top = `${computerPaddleY}px`;
    }
}

function moveBall() {
    if (gameActive) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY < 0 || ballY > 380) {
            ballSpeedY = -ballSpeedY;
        }

        if (
            (ballX < 40 && ballY > userPaddleY && ballY < userPaddleY + 100) ||
            (ballX > 740 && ballY > computerPaddleY && ballY < computerPaddleY + 100)
        ) {
            ballSpeedX = -ballSpeedX;
        }

        if (ballX < 0) {
            endGame("Computer");
        } else if (ballX > 800) {
            endGame("You");
        }
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;
    }
}

function resetBall() {
    ballX = 400;
    ballY = 200;
    ballSpeedX = ballSpeed;
    ballSpeedY = ballSpeed;
}

function endGame(winner) {
    gameActive = false;
    let winnerText = document.getElementById('winnerText');
    winnerText.textContent = `Winner: ${winner}`;
    let modal = document.getElementById('gameOverModal');
    modal.style.display = 'block';
    modeText.textContent = `Mode: ${getSelectedMode()}`;
    setTimeout(restartGame, 2000); // Restart game after 2 seconds
}

function restartGame() {
    gameActive = false;
    let modal = document.getElementById('gameOverModal');
    modal.style.display = 'none';
    userPaddleY = 150;
    computerPaddleY = 150;
    userPaddle.style.top = `${userPaddleY}px`;
    computerPaddle.style.top = `${computerPaddleY}px`;
    resetBall();
    startGame(); // Start the game again
}

function updateGame() {
    if (gameActive) {
        moveComputerPaddle();
        moveBall();
        requestAnimationFrame(updateGame);
    }
}

function getSelectedMode() {
    if (paddleSpeed === 2 && ballSpeed === 4) {
        return 'Simple';
    } else if (paddleSpeed === 3 && ballSpeed === 5) {
        return 'Medium';
    } else if (paddleSpeed === 4.5 && ballSpeed === 6) {
        return 'Advanced';
    } else {
        return 'Unknown';
    }
}

// Attach event listeners to the buttons
upButton.addEventListener('click', moveUserPaddleUp);
downButton.addEventListener('click', moveUserPaddleDown);

simpleBtn.addEventListener('click', function() {
    paddleSpeed = 1.5;
    ballSpeed = 4;
});

mediumBtn.addEventListener('click', function() {
    paddleSpeed = 3;
    ballSpeed = 5;
});

advancedBtn.addEventListener('click', function() {
    paddleSpeed = 4.5;
    ballSpeed = 6;
});

// Start the game when the page loads
window.onload = startGame;
