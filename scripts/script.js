// ---------- variables ------------
const p1score = document.getElementById("p1-score");
const p1TotalScore = document.getElementById("p1-total-score");
const cpuscore = document.getElementById("p2-score");
const cpuTotalScore = document.getElementById("p2-total-score");
const p1dice = document.getElementById("p1dice");
const cpudice = document.getElementById("p2dice");
const btnroll = document.getElementById("player-roll-btn");
const p1img = document.getElementById("p1-img");
const cpuimg = document.getElementById("p2-img");
const newGameBtn = document.getElementById("newgame-btn");
const gameResult = document.getElementById("game-result");

// {
//       player: {
//         dice1: 0,
//         dice2: 6,
//       },
//       computer: {
//         dice1: 0,
//         dice2: 0,
//       },
//     },
const gameState = {
  rolls: [],
};
const images = [];

const MAX_ROUNDS = 3;

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function playRound() {
  if (gameState.rolls.length === MAX_ROUNDS) {
    console.log("Game is already Over");
    return;
  }
  const round = {
    player: {
      dice1: rollDie(),
      dice2: rollDie(),
    },
    computer: {
      dice1: rollDie(),
      dice2: rollDie(),
    },
  };
  if (gameState.rolls.length < MAX_ROUNDS - 1) {
    gameState.rolls.push(round);
    console.log(gameState.rolls, "round: " + gameState.rolls.length);
    outputRoundResults(round);
  } else if (gameState.rolls.length === MAX_ROUNDS - 1) {
    gameState.rolls.push(round);
    console.log(gameState.rolls, "round: " + gameState.rolls.length);
    outputRoundResults(round);
    btnroll.style.display = "none";
    gameResult.innerHTML = `Game Over. ${
      calculateTotalScore(gameState.rolls, "player") >
      calculateTotalScore(gameState.rolls, "computer")
        ? "Player wins"
        : calculateTotalScore(gameState.rolls, "player") <
          calculateTotalScore(gameState.rolls, "computer")
        ? "Computer wins"
        : `It's a tie`
    }`;
  }
}

function outputRoundResults(round) {
  const roundScore = calculateRoundScore(round);
  p1score.innerHTML = roundScore.player;
  cpuscore.innerHTML = roundScore.computer;
  p1dice.innerHTML = `${renderDieImage(round.player.dice1)}  ${renderDieImage(
    round.player.dice2, 1
  )}`;
  cpudice.innerHTML = `${renderDieImage(round.computer.dice1, 3, true)} ${renderDieImage(
    round.computer.dice2, 2, true
  )}`;
  p1TotalScore.innerHTML = calculateTotalScore(gameState.rolls, "player");
  cpuTotalScore.innerHTML = calculateTotalScore(gameState.rolls, "computer");
}

function calculateTotalScore(rolls, participant) {
  return rolls.reduce(
    (acc, round) =>
      acc +
      calculateDiceScore(round[participant].dice1, round[participant].dice2),
    0
  );
}

function calculateRoundScore(round) {
  return {
    player: calculateDiceScore(round.player.dice1, round.player.dice2),
    computer: calculateDiceScore(round.computer.dice1, round.computer.dice2),
  };
}

function calculateDiceScore(dice1, dice2) {
  if (dice1 === 1 || dice2 === 1) {
    return 0;
  } else if (dice1 === dice2) {
    return (dice1 + dice2) * 2;
  } else {
    return dice1 + dice2;
  }
}

function renderDieImage(diceValue, delay = 0, useKaiba = false) {
  return `<img class="die animate__animated ${useKaiba ? "animate__kaibaRoll" : "animate__rollIn"} ${delay > 0 ? `animate__delay-${delay}s` : ""}" src="images/dice${diceValue}.png" alt="Dice ${diceValue}">`;
}

function resetGame(){
    gameState.rolls = [];
    p1score.innerHTML = 0;
    cpuscore.innerHTML = 0;
    p1dice.innerHTML = "";
    cpudice.innerHTML = "";
    p1TotalScore.innerHTML = 0;
    cpuTotalScore.innerHTML = 0;
    gameResult.innerHTML = "";
    btnroll.style.display = "block";
}

btnroll.addEventListener("click", playRound);

newGameBtn.addEventListener("click", resetGame);

// Sample code for checking win condition
function checkWin(player) {
  if (player.position >= WINNING_POSITION) {
    return true;
  }
  return false;
}

// Sample code for a turn-based game loop
function gameLoop() {
  while (!checkWin(currentPlayer)) {
    // Roll the dice
    const diceResult = rollDice();
    // Move the player
    movePlayer(currentPlayer, diceResult);
    // Check for win condition
    if (checkWin(currentPlayer)) {
      console.log(currentPlayer.name + " wins!");
      break;
    }
    // Switch turns
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }
}
