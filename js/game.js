const numDivs = 36;
const maxHits = 10;

let hits = 0;
let misses = 0;
let firstHitTime = 0;

function round() {
  let divSelector = randomDivId();
  $(divSelector).addClass("target").text(hits + 1);
  
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field").addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#total-score").text(hits + misses);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  $(".miss").text("").removeClass("miss");

  const eventTarget = $(event.target);
 
  if (eventTarget.hasClass("target")) {
    eventTarget.removeClass("target").text("");
    hits = hits + 1;
    round();
  } else {
    misses = misses - 1;
    eventTarget.addClass("miss").text(misses);
  };
}

function handleReload() {
  $('#button-reload').text("Играть заново");
  $(".game-field").removeClass("d-none miss target").text("");
  $("#win-message").addClass("d-none");
  hits = 0;
  misses = 0; 
  firstHitTime = getTimestamp();
  round();
}

function init() {
  $(".game-field").click(handleClick);
  $("#button-reload").click(handleReload);
}

$(document).ready(init);
