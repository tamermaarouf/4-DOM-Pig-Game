/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// window.onload = initAll();

let scores, activePlayer, roundScore;
const btnRoll = document.querySelector(".btn-roll");
const btnNew = document.querySelector(".btn-new");
const btnHold = document.querySelector(".btn-hold");

initAll();

btnNew.addEventListener("click", () => {
    initAll();
});

btnRoll.addEventListener("click", () => {
    // get Random Number
    let dice = Math.floor(Math.random() * 6) + 1;

    // display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = `dice-${dice}.png`;

    // update the round score if the rolled number was not 1
    if (dice !== 1) {
        // add Score
        roundScore += dice;
        document.getElementById(`current-${activePlayer}`).textContent = roundScore;
        // scores[activePlayer] = roundScore;
        // document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    } else {
        // Next Player
        nextPlayer();
    }
});

btnHold.addEventListener("click", () => {
    scores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 20) {
        document.getElementById(`name-${activePlayer}`).textContent = 'Winner';

        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

        document.querySelector(".dice").style.display = "none";
    } else {
        // Next Player
        nextPlayer();

    }
});

function nextPlayer() {
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".dice").style.display = "none";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
}

function initAll(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector(".dice").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');   
}