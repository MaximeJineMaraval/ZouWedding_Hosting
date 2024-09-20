let player = document.getElementById("player");
let scoreElement = document.getElementById("score");
let gameContainer = document.getElementById("game-container");
let startButton = document.getElementById("start-button");

let isJumping = false;
let playerBottom = 0;
let gravity = 0.5; // Diminuez cette valeur pour ralentir la gravité
let gameSpeed = 4;
let score = 0;
let isGameOver = false;
let difficultyIncreaseInterval = 5;
let isGameStarted = false;
let enemyActive = false; // Indicateur pour savoir si un ennemi est actif
let backgroundPosition = 0;
let enemyInterval, jumpInterval, fallInterval, bonusInterval;

const enemyTypes = [
  { width: 30, height: 40 },
  { width: 30, height: 50 },
  { width: 30, height: 60 },
];

// Fonction pour démarrer le jeu
function startGame() {
  if (isGameStarted) return;

  isGameStarted = true;
  startButton.style.visibility = 'hidden';

  setInterval(updateBackground, 20);

  createEnemy();
  generateBonus();

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      jump();
    }
  });
}

function updateBackground() {
  backgroundPosition -= gameSpeed / 5; // Ajuste la vitesse du défilement
  if (backgroundPosition <= -100) { // Réinitialise le fond lorsqu'il est complètement décalé
      backgroundPosition = 0;
  }
  document.getElementById('background').style.backgroundPosition = backgroundPosition + 'px 0';
}

function jump() {
    if (isJumping || !isGameStarted) return;
    isJumping = true;

    let jumpHeight = 150 + (gameSpeed * 5);
    let jumpSpeed = 25 - gameSpeed; // Augmentez cette valeur pour ralentir l'ascension

    jumpInterval = setInterval(() => {
        if (playerBottom >= jumpHeight) {
            clearInterval(jumpInterval);

            let fallSpeed = jumpSpeed * gravity;
            fallInterval = setInterval(() => {
                if (playerBottom <= 0) {
                    playerBottom = 0; // Empêche de s'enfoncer dans le sol
                    clearInterval(fallInterval);
                    isJumping = false;
                } else {
                    playerBottom -= fallSpeed;
                }
                player.style.bottom = playerBottom + "px";
            }, 20);
        } else {
            playerBottom += jumpSpeed;
            player.style.bottom = playerBottom + "px";
        }
    }, 20);
}



// Fonction pour créer les ennemis
function createEnemy() {
  if (enemyActive || isGameOver) return; // Ne crée pas un nouvel ennemi s'il y en a déjà un

  enemyActive = true; // Indique qu'un ennemi est en cours de création
  let enemyPosition = 800;

  const randomEnemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

  let newEnemy = document.createElement('div');
  newEnemy.classList.add('enemy');
  newEnemy.style.width = randomEnemy.width + "px";
  newEnemy.style.height = randomEnemy.height + "px";
  newEnemy.style.position = "absolute";
  newEnemy.style.bottom = "0";
  newEnemy.style.left = enemyPosition + "px";
  newEnemy.style.backgroundColor = "#e74c3c";

  gameContainer.appendChild(newEnemy);

  enemyInterval = setInterval(() => {

    if (enemyPosition <= -30) {
      newEnemy.remove();
      enemyPosition = 800;
      score++;
      scoreElement.innerText = "Score: " + score;

      // Réinitialise l'indicateur une fois que l'ennemi est hors de vue
            enemyActive = false;

      if (score % difficultyIncreaseInterval === 0) {
        gameSpeed += 1;
      }

      createEnemy();
    }

    // Vérification de collision améliorée
      if (enemyPosition < 100 && enemyPosition > 50 && !isGameOver) {
          let enemyBottom = parseInt(newEnemy.style.height);
          if (playerBottom < enemyBottom) {
              gameOver();
          }
      }

    enemyPosition -= gameSpeed;
    newEnemy.style.left = enemyPosition + "px";
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
        scoreElement.innerText = "Score: " + score;
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
  if (event.code === "Enter" && !isGameStarted) {
    startGame();
  }
});
