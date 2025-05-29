let timeActive;
let timer;
let clickCount = 0;
let currentSeconds = 0;
let secondCount = 0;
let CPS = [];
let secondsArray = [];
function hideButtons(clickedButton) {
  let buttons = document.querySelectorAll(".btn");

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
    localStorage.setItem("CPS", JSON.stringify(CPS));
    localStorage.setItem("secondsArray", JSON.stringify(secondsArray));
    setTimeout(() => {
      window.location.href = "results.html";
    }, 500);
  }
  timeActive -= 1;
  currentSeconds++;
  saveCountSecond();
}

function countClicks() {
  clickCount++;
  secondCount++;
  document.getElementById("counterBtn").innerText = clickCount + " Clicks";
  localStorage.setItem("clickCount", clickCount);
}
function saveCountSecond() {
  CPS.push(secondCount);
  secondsArray.push(currentSeconds);
  secondCount = 0; // Reset the second count for the next second
}

// results Script
function mainMenu() {
  window.location.href = "index.html";
  localStorage.clear();
}

document.addEventListener("DOMContentLoaded", function () {
  finalCount = localStorage.getItem("clickCount");
  finalTime = localStorage.getItem("time");
  CPS = JSON.parse(localStorage.getItem("CPS")) || [];
  secondsArray = JSON.parse(localStorage.getItem("secondsArray")) || [];
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
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: secondsArray,
      datasets: [
        {
          label: "Clicks per second",
          data: CPS,
          borderColor: "white",
          borderWidth: 2,
          fill: false,
          pointRadius: 5,
          pointBackgroundColor: "white",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "white", // color del label de la leyenda
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "white",
          },
          grid: {
            color: "white",
          },
        },
        y: {
          ticks: {
            color: "white",
          },
          grid: {
            color: "white",
          },
        },
      },
    },
  });
});
