  /**********************/
 /**** VIEW BINDINGS ***/ 
/**********************/

let player = document.getElementById("player");
let scoreView = document.getElementById("score");
let gameContainer = document.getElementById("game-container");
let startButton = document.getElementById("start-button");
let gameOverContainer = document.getElementById("game-over-container");
let gameOverScore = document.getElementById("game-over-score");

  /******************/
 /**** VARIABLES ***/ 
/******************/

// Player variables
let isJumping = false;
let playerBottom = 50;
let gravity = 0.5;
let jumpInterval;
let fallInterval;
const groundBottom = 50;

// Enemies variables
let isEnemyActive = false;
let gameSpeed = 4;
let difficultyIncreaseInterval = 5;
let enemyInterval;
const enemyTypes = [
  { width: 30, height: 30 },
  { width: 30, height: 40 },
  { width: 30, height: 50 },
];
let currentEnemy;
let isEnemyAvoided = false;

// Bonus variables
let bonusInterval;
let isBonusActive = false;

// Game variables
const npcStartingPosition = 800;
let score = 0;
let isGameOver = false;
let isGameStarted = false;
let backgroundPosition = 0;
let backgroundInterval;

  /*******************/
 /**** FUNCTIONS ****/
/*******************/

function startGame() {
  // Don't start if game is already playing
  if (isGameStarted) return;

  // Reset variables and show/hide views
  updateScore(0)
  
  isGameStarted = true;
  isGameOver = false;
  
  startButton.style.visibility = 'hidden';
  gameOverContainer.style.visibility = 'hidden';
  scoreView.style.visibility = 'visible';
  
  isEnemyActive = false;
  if(currentEnemy) {
    currentEnemy.remove();
  }

  isJumping = false;
  playerBottom = 50;
  updatePlayerPosition();

  // Move the background
  backgroundInterval = setInterval(updateBackground, 20);

  // Create enemies and bonus
  createEnemy();
  createBonus();

  // Jumb on space button
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      jump();
    }
  });
}

function updateBackground() {
  backgroundPosition -= gameSpeed / 3;
  // Apply position it to the view
  document.getElementById('background').style.backgroundPosition = backgroundPosition + 'px 0';
}

function jump() {
  // Don't jump if the player is already jumping or the game is stopped
  if (isJumping || !isGameStarted) return;
  
  // Jump
  isJumping = true;

  // Prepare new values
  let jumpHeight = 200 + (gameSpeed * 5);
  let jumpSpeed = 16;

  // Define the action
  jumpInterval = setInterval(() => {
    // If the player has reached the top of the jump
    if (playerBottom >= jumpHeight) {
        // Stop the jump
        clearInterval(jumpInterval);
        // Start the fall
        let fallSpeed = jumpSpeed * gravity;
        fallInterval = setInterval(() => {
            // If player has reached the ground
            if (playerBottom <= groundBottom) {
                // Avoid player going to low
                playerBottom = groundBottom;
                // Stop the fall
                clearInterval(fallInterval);
                isJumping = false;
            } else {
                playerBottom -= fallSpeed;
            }
            // Applay the position
            updatePlayerPosition();
        }, 20);
    } else {
        playerBottom += jumpSpeed;
        // Apply the position
        updatePlayerPosition();
    }
  }, 20);
}

function createEnemy() {
  // Don't create enemy twice or if game is stopped
  if (isEnemyActive || isGameOver) return;

  isEnemyAvoided = false;
  isEnemyActive = true;
  let enemyPosition = npcStartingPosition;

  // Get a random enemy to create
  const randomEnemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

  // Create the view
  currentEnemy = document.createElement('div');
  currentEnemy.classList.add('enemy');
  currentEnemy.style.width = randomEnemy.width + "px";
  currentEnemy.style.height = randomEnemy.height + "px";
  currentEnemy.style.position = "absolute";
  currentEnemy.style.bottom = groundBottom + "px";
  currentEnemy.style.left = enemyPosition + "px";
  currentEnemy.style.backgroundColor = "#e74c3c";

  // Add the view
  gameContainer.appendChild(currentEnemy);

  enemyInterval = setInterval(() => {
    if (!isEnemyAvoided && getRightPositionOf(currentEnemy) < getLeftPositionOf(player)) { // If the enemy is at the left of the player
      // Increase and update the score
      isEnemyAvoided = true;
      updateScore(score + 1);
    }
    if (getRightPositionOf(currentEnemy) < 0) { // If the enemy quit the screen
      // Remove it
      currentEnemy.remove();
      enemyPosition = npcStartingPosition;

      // Increase the difficulty (speed) if needed
      if (score % difficultyIncreaseInterval === 0) {
        gameSpeed += 1;
      }

      // Clean the process and a new enemy
      clearInterval(enemyInterval)
      isEnemyActive = false;
      createEnemy();
    } else {
      // Move the enemy
      enemyPosition -= gameSpeed;
      currentEnemy.style.left = enemyPosition + "px";
    }

   if (!isGameOver 
    && getLeftPositionOf(currentEnemy) + 8 < getRightPositionOf(player) // +8 to not count the sprite's blank space
    && getRightPositionOf(currentEnemy) - 8 > getLeftPositionOf(player) // -8 to not count the sprite's blank space
  ) {
      let enemyTop = parseInt(currentEnemy.style.height) + groundBottom - 5;
      if (playerBottom < enemyTop) {
          gameOver();
      }
    }
  }, 20);
}

function createBonus() {
  bonusInterval = setInterval(() => {
    if (isGameOver || isBonusActive) return;

    let bonusPosition = npcStartingPosition;
    let bonusHeight = Math.floor(Math.random() * 150) + 50; // Put bonus between 50 and 200

    let newBonus = document.createElement('div');
    newBonus.classList.add('bonus');
    newBonus.style.width = "30px";
    newBonus.style.height = "30px";
    newBonus.style.position = "absolute";
    newBonus.style.bottom = bonusHeight + "px";
    newBonus.style.left = bonusPosition + "px";
    newBonus.style.backgroundColor = "#f1c40f";

    gameContainer.appendChild(newBonus);

    let moveBonusInterval = setInterval(() => {
      // Don't move the bonus if the game is over
      if (isGameOver) return;

      if (getRightPositionOf(newBonus) < 0) { // the bonus left the screen
        newBonus.remove();
        clearInterval(moveBonusInterval);
      }

      // Detect collision with the bonus
      /*if (bonusPosition > 0 && bonusPosition < 50 && playerBottom + 50 > bonusHeight && playerBottom < bonusHeight + 30) {
        updateScore(score + 10);
        newBonus.remove();
        clearInterval(moveBonusInterval);
      }*/
      if (getLeftPositionOf(newBonus) + 8 < getRightPositionOf(player) // +8 to not count the sprite's blank space
        && getRightPositionOf(newBonus) - 8 > getLeftPositionOf(player) // -8 to not count the sprite's blank space
        && getBottomPositionOf(newBonus) < getTopPositionOf(player)
        && getTopPositionOf(newBonus) > getBottomPositionOf(player)
      ) {
        updateScore(score + 10);
        newBonus.remove();
        clearInterval(moveBonusInterval);
      }
      

      // Move bonus
      bonusPosition -= gameSpeed;
      newBonus.style.left = bonusPosition + "px";
    }, 20);
  }, 8000); // Create bonus every 8 seconds
}

function gameOver() {
  isGameOver = true;
  isGameStarted = false;
  clearInterval(enemyInterval);
  clearInterval(bonusInterval);
  clearInterval(backgroundInterval);
  clearInterval(jumpInterval);
  clearInterval(fallInterval);
  startButton.style.visibility = 'visible';
  gameOverContainer.style.visibility = 'visible';
  scoreView.style.visibility = 'hidden';
  gameOverScore.innerText = "Score: " + score;
  //document.location.reload();
}

function updateScore(newScore) {
  score = newScore;
  scoreView.innerText = "Score: " + score;
}

function updatePlayerPosition() {
  player.style.bottom = playerBottom + "px";
}

function getLeftPositionOf(htmlElement) {
  return htmlElement.offsetLeft
}

function getRightPositionOf(htmlElement) {
  return htmlElement.offsetLeft + htmlElement.offsetWidth
}

function getTopPositionOf(htmlElement) {
  return htmlElement.offsetTop
}

function getBottomPositionOf(htmlElement) {
  return htmlElement.offsetTop - htmlElement.offsetHeight
}

  /***********************/
 /**** START THE GAME ***/ 
/***********************/
startButton.addEventListener("click", startGame);
