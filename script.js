var diff = 4;
var startTimer = false;

function changeDifficultyOn4() {
  diff = 4;
}
function changeDifficultyOn6() {
  diff = 6;
}
function changeDifficultyOn8() {
  diff = 8;
}

/**                game starting difficulty and name settings                 */

function startGame() {
  var playerName = document.getElementById("userName").value;
  localStorage["plName"] = playerName;

  console.log(playerName);

  if (playerName == "" || playerName[0] == " ") {
    alert("Input name starts with a-z letter");
  } else {
    if (diff != 0) {
      window.location.href = "game.html";
    } else {
      alert("choose difficulty");
    }
  }
}

var player = document.getElementById("player");

player.innerHTML = localStorage["plName"];

/**                              size                             */

if (diff == 4) {
  document.getElementById("gameField").style.maxWidth = "500px";
}
if (diff == 6) {
  document.getElementById("gameField").style.maxWidth = "1020px";
}
/**                                        random array generation                    */

var coupleArray = [];
var indexArray = [];
var randomIndexArray = [];
var cardsArray = [];

var coupleIndex = 0;

for (let i = 0; i < diff * diff; i += 2) {
  coupleArray[i] = coupleIndex + 1;
  coupleArray[i + 1] = coupleIndex + 1;
  coupleIndex++;
}

for (let i = 0; i < diff * diff; i++) {
  indexArray[i] = i + 1;
}

for (let i = 0; i < diff * diff; i++) {
  let rand = indexArray[Math.floor(Math.random() * indexArray.length)];
  let randIndex;

  for (let e = 0; e < indexArray.length; e++) {
    if (indexArray[e] == rand) {
      randIndex = e;
    }
  }
  cardsArray[i] = coupleArray[rand - 1];
  indexArray.splice(randIndex, 1);
}

/******************************cards generation***************************** */

var idCommonArray = [];
var idSecretArray = [];

for (let i = 0; i < diff * diff; i++) {
  idCommonArray[i] = i + 1;
}
idSecretArray[0] = idCommonArray[diff * diff - 1] + 1;
for (let i = 1; i < diff * diff; i++) {
  idSecretArray[i] = idSecretArray[i - 1] + 1;
}

for (let i = 0; i < diff * diff; i++) {
  generateCards(cardsArray[i], idCommonArray[i], idSecretArray[i]);
}

function generateCards(cardNumber, idFirstValue, idSecondValue) {
  game = document.getElementById("gameField");
  game.insertAdjacentHTML(
    "beforeend",
    `<div class="card">
  <div class="common__side" " onclick="compareCards(` +
      idFirstValue +
      `)" id="` +
      idFirstValue +
      `"></div>
  <div class="secret__side" id="` +
      idSecondValue +
      `">` +
      cardNumber +
      `</div>`
  );
}

/**                    opening and comparing cards            */
var cardsCorrectOpened = 0;
var firstCardOpened = false;
var secondCardOpened = false;
var firstCardValue;
var secondCardValue;
var firstCardId;
var secondCardId;

function openCard(commonSide) {
  let secretSideOpen = commonSide + diff * diff;
  document.getElementById(commonSide).style.display = "none";
  document.getElementById(secretSideOpen).style.display = "flex";
}

function compareCards(cardValue) {
  if (!startTimer) {
    setInterval("timer()", 1000);
    startTimer = true;
  }
  let secretSideCardValue = cardValue + diff * diff;

  if (firstCardOpened == true) {
    secondCardOpened = true;
    secondCardId = cardValue;
    openCard(cardValue);
    secondCardValue = document.getElementById(secretSideCardValue).textContent;

    if (firstCardValue == secondCardValue) {
      firstCardOpened = false;
      secondCardOpened = false;
      cardsCorrectOpened++;
      if (cardsCorrectOpened == (diff * diff) / 2) {
        endGame();
        alert("Congratulations!!! You perfectly finish the game!!!");
        setTimeout((window.location.href = "score.html"), 3000);
      }
    } else {
      firstCardOpened = false;
      secondCardOpened = false;
      setTimeout(closeCards, 300);
    }
  } else {
    firstCardOpened = true;
    firstCardValue = document.getElementById(secretSideCardValue).textContent;
    firstCardId = cardValue;
    openCard(cardValue);
  }
}

function closeCards() {
  let secretCardCloseFirst = firstCardId + diff * diff;
  let secretCardCloseSecond = secondCardId + diff * diff;
  document.getElementById(firstCardId).style.display = "flex";
  document.getElementById(secretCardCloseFirst).style.display = "none";
  document.getElementById(secondCardId).style.display = "flex";
  document.getElementById(secretCardCloseSecond).style.display = "none";
  firstCardId = null;
  secondCardId = null;
}

/**                           timer                               */
var second = 1;
var minute = 0;

function timer() {
  document.getElementById("min").innerHTML = minute;
  document.getElementById("sec").innerHTML = "0" + second;
  if (second <= 9) {
    document.getElementById("sec").innerHTML = "0" + second;
  }
  if (second >= 10) {
    document.getElementById("sec").innerHTML = second;
  }
  if (minute <= 9) {
    document.getElementById("min").innerHTML = "0" + minute;
  }
  if (minute >= 10) {
    document.getElementById("min").innerHTML = minute;
  }
  if (second == 59) {
    second = 0;
    minute++;
  } else {
    second++;
  }
}

/**                                               leaderboard                                    */

var currentTime;
var leaderNameArr = [];
var leaderScoreArr = [];
var leaderPlaces = 0;
var isArraySorted = false;

for (let i = 0; i < 10; i++) {
  if (leaderNameArr[i] == undefined) {
    leaderNameArr[i] = "";
    leaderScoreArr[i] = 0;
  }
}

function endGame() {
  currentTime = minute * 60 + second;
  if (leaderPlaces < 10) {
    for (let i = 0; i < 10; i++) {
      if (leaderScoreArr[i] == 0) {
        leaderScoreArr[i] = currentTime;
        leaderNameArr[i] = localStorage["plName"];
        leaderPlaces++;
        break;
      }
    }
  } else {
    if (!isArraySorted) {
      sortArr(leaderScoreArr, leaderNameArr);
      isArraySorted = true;
    }
    for (let i = 0; i < 10; i++) {
      if (leaderScoreArr[i] > currentTime) {
        leaderScoreArr[i] = currentTime;
        leaderNameArr[i] = localStorage["plName"];
      }
    }
  }
  localStorage.setItem(leaderNameArr, JSON.stringify(leaderNameArr));
  leaderNameArr = JSON.parse(localStorage.getItem(leaderNameArr));
  localStorage.setItem(leaderScoreArr, JSON.stringify(leaderScoreArr));
  leaderScoreArr = JSON.parse(localStorage.getItem(leaderScoreArr));
}

function sortArr(arr, arr2) {
  for (let i = 0; i < 10; i++) {
    for (let n = 0; n < 10; n++) {
      if (arr[i] < arr[n]) {
        let temp1 = arr[i];
        let temp2 = arr2[i];
        arr[i] = arr[n];
        arr[n] = temp1;
        arr2[i] = arr2[n];
        arr2[n] = temp2;
      }
    }
  }
}

/**                    generate    table                           */

function generateTable() {
  var leaderField = document.getElementById("leaderBoard");
  for (let i = 0; i < 10; i++) {
    leaderField.insertAdjacentHTML(
      "beforeend",
      `<div class="leader">
  <div class="leader__name" id="leaderName">` +
        localStorage.getItem(leaderScoreArr) +
        `</div>
  <div class="leader__score" id="scoreValue">` +
        localStorage.getItem(leaderScoreArr) +
        `</div>
</div>`
    );
  }
}
