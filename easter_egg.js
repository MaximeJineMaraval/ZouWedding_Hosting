  /**********************/
 /**** VIEW BINDINGS ***/ 
/**********************/

let player = document.getElementById("player");
let scoreView = document.getElementById("score");
let gameContainer = document.getElementById("game-container");
let startButton = document.getElementById("start-button");

  /******************/
 /**** VARIABLES ***/ 
/******************/

// Player variables
let isJumping = false;
let playerBottom = 0;
let gravity = 0.5;
let jumpInterval;
let fallInterval;
const groundBottom = 50;

// Enemies variables
let enemyActive = false;
let gameSpeed = 4;
let difficultyIncreaseInterval = 5;
let enemyInterval;
const enemyTypes = [
  { width: 30, height: 30 },
  { width: 30, height: 40 },
  { width: 30, height: 50 },
];
const enemyInitialPosition = 800;

// Bonus variables
let bonusInterval;

// Game variables
let score = 0;
let isGameOver = false;
let isGameStarted = false;
let backgroundPosition = 0;

  /*******************/
 /**** FUNCTIONS ****/
/*******************/

function startGame() {
  // Don't start if game is already playing
  if (isGameStarted) return;

  // Start game and hide button
  isGameStarted = true;
  startButton.style.visibility = 'hidden';

  // Move the background
  setInterval(updateBackground, 20);

  // Create enemies and bonus
  createEnemy();
  generateBonus();

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
            player.style.bottom = playerBottom + "px";
        }, 20);
    } else {
        playerBottom += jumpSpeed;
        // Applay the position
        player.style.bottom = playerBottom + "px";
    }
  }, 20);
}

function createEnemy() {
  // Don't create enemy twice or if game is stopped
  if (enemyActive || isGameOver) return;

  enemyActive = true;
  let enemyPosition = enemyInitialPosition;

  // Get a random enemy to create
  const randomEnemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

  // Create the view
  let newEnemy = document.createElement('div');
  newEnemy.classList.add('enemy');
  newEnemy.style.width = randomEnemy.width + "px";
  newEnemy.style.height = randomEnemy.height + "px";
  newEnemy.style.position = "absolute";
  newEnemy.style.bottom = groundBottom + "px";
  newEnemy.style.left = enemyPosition + "px";
  newEnemy.style.backgroundColor = "#e74c3c";

  // Add the view
  gameContainer.appendChild(newEnemy);

  enemyInterval = setInterval(() => {
    if (enemyPosition === 60) { // If the enemy is at the left of the player
      // Increase and update the score
      score++;
      scoreView.innerText = "Score: " + score;
    }
    if (enemyPosition <= -30) { // If the enemy quit the screen
      // Remove it
      newEnemy.remove();
      enemyPosition = enemyInitialPosition;

      // Increase the difficulty (speed) if needed
      if (score % difficultyIncreaseInterval === 0) {
        gameSpeed += 1;
      }

      // Clean the process and a new enemy
      clearInterval(enemyInterval)
      enemyActive = false;
      createEnemy();
    } else {
      // Move the enemy
      enemyPosition -= gameSpeed;
      newEnemy.style.left = enemyPosition + "px";
    }

   if (enemyPosition < 130 && enemyPosition > 80 && !isGameOver) {
      let enemyBottom = parseInt(newEnemy.style.height);
      if (playerBottom < enemyBottom) {
          gameOver();
      }
    }
  }, 20);
}

// Fonction pour créer des bonus
function generateBonus() {
  bonusInterval = setInterval(() => {
    if (isGameOver) return;

    let bonusPosition = 800;
    let bonusHeight = Math.floor(Math.random() * 150) + 50; // Hauteur aléatoire du bonus

    let newBonus = document.createElement('div');
    newBonus.classList.add('bonus');
    newBonus.style.width = "30px";
    newBonus.style.height = "30px";
    newBonus.style.position = "absolute";
    newBonus.style.bottom = bonusHeight + "px"; // Position aléatoire en hauteur
    newBonus.style.left = bonusPosition + "px";
    newBonus.style.backgroundColor = "#f1c40f"; // Jaune pour le bonus

    gameContainer.appendChild(newBonus);

    let moveBonusInterval = setInterval(() => {
      if (isGameOver) return;

      if (bonusPosition <= -30) {
        newBonus.remove();
        clearInterval(moveBonusInterval);
      }

      // Détecte la collision entre le joueur et le bonus
      if (bonusPosition > 0 && bonusPosition < 50 && playerBottom + 50 > bonusHeight && playerBottom < bonusHeight + 30) {
        score += 10; // Ajoute 10 points pour chaque bonus attrapé
        scoreView.innerText = "Score: " + score;
        newBonus.remove();
        clearInterval(moveBonusInterval);
      }

      bonusPosition -= gameSpeed;
      newBonus.style.left = bonusPosition + "px";
    }, 20);
  }, 8000); // Les bonus apparaissent toutes les 8 secondes
}

// Fonction pour gérer la fin du jeu
function gameOver() {
  isGameOver = true;
  clearInterval(enemyInterval);
  clearInterval(bonusInterval);
  alert("Game Over! Score: " + score);
  document.location.reload();
}

startButton.addEventListener("click", startGame);

document.addEventListener("keydown", (event) => {
  if ((event.code === "Enter" || event.code === "Space") && !isGameStarted) {
    startGame();
  }
});
