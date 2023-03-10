"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");

const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//diceEl.classList.add("hidden");
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  diceEl.classList.add("hidden");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling the dice functionality
btnRoll.addEventListener("click", function () {
  //Generating the random rolled dice number
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display the rolled dice numbered image
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //Check whether the rolled dice is 1.If true,switch to player 2.

    if (dice != 1) {
      //Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to player 2
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //Add the current score to total score of active player.
    scores[activePlayer] += currentScore;

    //Display total score of current active player
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check whether the current score of active player is more then equal to 100.

    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Switching to next player.
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
