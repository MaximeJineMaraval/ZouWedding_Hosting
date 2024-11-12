  /**********************/
 /**** VIEW BINDINGS ***/ 
/**********************/

let player = document.getElementById("player");
let scoreView = document.getElementById("score");
let gameContainer = document.getElementById("game-container");
let startButton = document.getElementById("start-button");
let gameOverContainer = document.getElementById("game-over-container");
let gameOverScore = document.getElementById("game-over-score");
let playerChoiceRadioJustine = document.getElementById("player-choice-radio-justine");
let playerChoiceRadioMaxime = document.getElementById("player-choice-radio-maxime");
let playerChoiceContainer = document.getElementById("player-choice-container");
let closeIcon = document.getElementById("close-icon");

  /******************/
 /**** VARIABLES ***/ 
/******************/

// Player variables
let isJumping = false;
let playerBottom = 50;
let gravity = 0.5;
let jumpInterval;
let fallInterval;
let animatePlayerSpriteInterval;
const groundBottom = 50;
const maximeSprites = ["res/ee_max1.svg", "res/ee_max2.svg"];
const justineSprites = ["res/ee_justine1.svg", "res/ee_justine2.svg"];
const maximeBonusSprite = "res/ee_bonus_maxime.svg"
const justineBonusSprite = "res/ee_bonus_justine.svg"
let currentPlayerSprites;
let currentBonusSprite;

// Enemies variables
let isEnemyActive = false;
let gameSpeed = 4;
let difficultyIncreaseInterval = 5;
let enemyInterval;
const enemyTypes = [
  { height: 30, collisionVariableHor: 8, collisionVariableVert: 4, sprite: "res/ee_rock1.svg" },
  { height: 50, collisionVariableHor: 16, collisionVariableVert: 6, sprite: "res/ee_rock2.svg" },
  { height: 40, collisionVariableHor: 8, collisionVariableVert: 8, sprite: "res/ee_rock3.svg" }
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
  playerChoiceContainer.style.visibility = 'hidden';
  scoreView.style.visibility = 'visible';
  
  isEnemyActive = false;
  if(currentEnemy) {
    currentEnemy.remove();
  }

  isJumping = false;
  playerBottom = 50;
  updatePlayerPosition();
  setPlayerInitialSprite();

  // Move the background
  backgroundInterval = setInterval(updateBackground, 20);

  // Animate player sprite
  animatePlayerSprite();

  // Create enemies and bonus
  createEnemy();
  createBonus();

  // Jumb on space button
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      jump();
    }
  });
  document.addEventListener("touchend", () => {
    jump();
  })
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
  let jumpHeight = 240 - (gameSpeed * 4);//* 5);
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
  currentEnemy = document.createElement('img');
  currentEnemy.classList.add('enemy');
  currentEnemy.style.height = randomEnemy.height + "px";
  currentEnemy.style.position = "absolute";
  currentEnemy.style.bottom = groundBottom + "px";
  currentEnemy.style.left = enemyPosition + "px";
  currentEnemy.src = randomEnemy.sprite;

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

    // Detect collision
   if (!isGameOver 
    && getLeftPositionOf(currentEnemy) + randomEnemy.collisionVariableHor < getRightPositionOf(player) // +8 to not count the sprite's blank space
    && getRightPositionOf(currentEnemy) - randomEnemy.collisionVariableHor > getLeftPositionOf(player) // -8 to not count the sprite's blank space
  ) {
      let enemyTop = parseInt(currentEnemy.style.height) + groundBottom - randomEnemy.collisionVariableVert;
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

    let newBonus = document.createElement('img');
    newBonus.classList.add('bonus');
    newBonus.style.bottom = bonusHeight + "px";
    newBonus.style.left = bonusPosition + "px";
    newBonus.src = currentBonusSprite;

    gameContainer.appendChild(newBonus);

    let moveBonusInterval = setInterval(() => {
      // Don't move the bonus if the game is over
      if (isGameOver) return;

      if (getRightPositionOf(newBonus) < 0) { // the bonus left the screen
        newBonus.remove();
        clearInterval(moveBonusInterval);
      }

      // Detect collision with the bonus
      if (getLeftPositionOf(newBonus) + 8 < getRightPositionOf(player) // +8 to not count the sprite's blank space
        && getRightPositionOf(newBonus) - 8 > getLeftPositionOf(player) // -8 to not count the sprite's blank space
        && getBottomPositionOf(newBonus) < getTopPositionOf(player)
        && getTopPositionOf(newBonus) > getBottomPositionOf(player)
      ) {
        // Update the score
        updateScore(score + 10);
        // Show the cloud
        newBonus.src = "res/ee_cloud.svg"
        newBonus.style.opacity = 0;
        setTimeout(function() { newBonus.remove(); }, 500);
        showBonusScore(bonusHeight, bonusPosition);
        // Clear the loop
        clearInterval(moveBonusInterval);
      }
      

      // Move bonus
      bonusPosition -= gameSpeed;
      newBonus.style.left = bonusPosition + "px";
    }, 20);
  }, 8000); // Create bonus every 8 seconds
}

function showBonusScore(bonusHeight, bonusPosition) {
  let label = document.createElement('p');
  label.classList.add('bonus-label');
  label.style.bottom = (bonusHeight + 10) + "px";
  label.style.left = (bonusPosition + 10) + "px";
  label.textContent = "+10";
  gameContainer.appendChild(label);
  setTimeout(function() { label.style.opacity = 0; }, 500);
  setTimeout(function() { label.remove(); }, 1000);
}

function gameOver() {
  isGameOver = true;
  isGameStarted = false;
  clearInterval(enemyInterval);
  clearInterval(bonusInterval);
  clearInterval(backgroundInterval);
  clearInterval(jumpInterval);
  clearInterval(fallInterval);
  clearInterval(animatePlayerSpriteInterval);
  startButton.style.visibility = 'visible';
  gameOverContainer.style.visibility = 'visible';
  playerChoiceContainer.style.visibility = 'visible';
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

function animatePlayerSprite() {
  animatePlayerSpriteInterval = setInterval(() => {
    if(player.getAttribute('src') === currentPlayerSprites[0]) {
      player.src = currentPlayerSprites[1];
    } else {
      player.src = currentPlayerSprites[0];
    }
  },200);
}

function selectJustinePlayer() {
  currentPlayerSprites = justineSprites;
  currentBonusSprite = justineBonusSprite;
  // Update sprites only if we are not on the gameOver page
  if(!isGameOver) {
    setPlayerInitialSprite();
  }
}

function selectMaximePlayer() {
  currentPlayerSprites = maximeSprites;
  currentBonusSprite = maximeBonusSprite;
  // Update sprites only if we are not on the gameOver page
  if(!isGameOver) {
    setPlayerInitialSprite();
  }
}

function setPlayerInitialSprite() {
  player.src = currentPlayerSprites[0];
}

  /**************/
 /**** UTILS ***/ 
/**************/

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

  /*************************/
 /**** CHOOSE CHARACTER ***/ 
/*************************/
playerChoiceRadioJustine.onclick = function() {
  selectJustinePlayer();
}

playerChoiceRadioMaxime.onclick = function() {
  selectMaximePlayer();
}

  /*******************/
 /**** CLOSE ICON ***/ 
/*******************/

closeIcon.onclick = function() {
  window.location.href = "main.html"
}

  /***********************/
 /**** START THE GAME ***/ 
/***********************/
selectJustinePlayer();
setPlayerInitialSprite();
startButton.addEventListener("click", startGame);
