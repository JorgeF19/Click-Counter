let timeActive;
let timer;
let clickCount = 0;
let currentSeconds=0;
let CPS =[];
let secondsArray = [];
function hideButtons(clickedButton) {
  let buttons = document.querySelectorAll(".btn");
  clickCount = 0;
  clearInterval(timer);
  buttons.forEach((button) => {
    if (button !== clickedButton) {
      button.classList.add("vanish");
    } else {
      button.classList.remove("vanish");
      timeActive = button.value;
      localStorage.setItem("time", timeActive);
    }
  });
}

function startTest() {
  if (timeActive > 0) {
    clearInterval(timer);

    let button = document.getElementById("clicksBtn");
    let counterBtn = document.getElementById("counterBtn");

    counterBtn.style.position = "absolute";

    counterBtn.style.display = "flex";
    timer = setInterval(updateDisplay, 1000);
    updateDisplay();
  }
}

function updateDisplay() {
  document.getElementById("clicksBtn").innerText =
    "Time remaining: " + timeActive + " seconds";
  if (timeActive <= 0) {
    document.getElementById("clicksBtn").innerHTML = "TIME OUT!";
    document.getElementById("counterBtn").style.display = "none";
    clearInterval(timer);
    document.getElementById("pantalla-carga").style.display = "flex";
    setTimeout(() => {
      window.location.href = "results.html";
    }, 500);
  }
  timeActive -= 1;
  currentSeconds++;
  saveCountSecond()
}

function countClicks() {
  clickCount++;
  
    
  document.getElementById("counterBtn").innerText = clickCount + " Clicks";
  localStorage.setItem("clickCount", clickCount);
  
}
function saveCountSecond(){
    CPS.push(clickCount)
    secondsArray.push(currentSeconds)

}

// results Script
function mainMenu() {
  window.location.href = "index.html";
  localStorage.clear();
}

document.addEventListener("DOMContentLoaded", function () {
  finalCount = localStorage.getItem("clickCount");

  finalTime = localStorage.getItem("time");
  average = finalCount / finalTime;
  average = average.toLocaleString("es-ES", {
    maximunFractionDigits: 1,
    minimunFractionDigits: 1,
  });
  document.getElementById("averageValue").innerHTML = average;
  document.getElementById(
    "clickMessage"
  ).innerText = `You made ${finalCount} clicks in ${finalTime} seconds!`;
  //Grafico
  const ctx = document.getElementById("clickChart").getContext("2d");
  const chart = new chart(ctx, {
    type: "line",
    data: {
      labels: secondsArray,
      datasets: [
        {
          labels: "Clicks per second",
          data: CPS,
          borderColor: "blue",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
  });
});
