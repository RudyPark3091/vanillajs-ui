(function () {
  const clock = document.getElementById("clock2");
  clock.innerHTML = `
    <div id="clock2-hour">
      <div class="clock2-hour"></div>
      <div class="clock2-hour"></div>
    </div>
    <div class="clock2-divider">
      <div class="clock2-pixel"></div>
      <div class="clock2-pixel pixel-on"></div>
      <div class="clock2-pixel"></div>
      <div class="clock2-pixel pixel-on"></div>
      <div class="clock2-pixel"></div>
    </div>
    <div id="clock2-minute">
      <div class="clock2-minute"></div>
      <div class="clock2-minute"></div>
    </div>
    <div class="clock2-divider">
      <div class="clock2-pixel"></div>
      <div class="clock2-pixel pixel-on"></div>
      <div class="clock2-pixel"></div>
      <div class="clock2-pixel pixel-on"></div>
      <div class="clock2-pixel"></div>
    </div>
    <div id="clock2-second">
      <div class="clock2-second"></div>
      <div class="clock2-second"></div>
    </div>
  `;
  const clockHour = document.querySelectorAll(".clock2-hour");
  const clockMinute = document.querySelectorAll(".clock2-minute");
  const clockSecond = document.querySelectorAll(".clock2-second");

  /*
   * clock shape
   * 0 0 0
   * 0 0 0
   * 0 0 0
   * 0 0 0
   * 0 0 0
   */

  const first = [1, 0, 0];
  const mid = [0, 1, 0];
  const last = [0, 0, 1]
  const firstMid = [1, 1, 0];
  const midLast = [0, 1, 1];
  const firstLast = [1, 0, 1];
  const all = [1, 1, 1];

  const numbers = [
    [all, firstLast, firstLast, firstLast, all],
    [last, last, last, last, last],
    [all, last, all, first, all],
    [all, last, all, last, all],
    [firstLast, firstLast, all, last, last],
    [all, first, all, last, all],
    [all, first, all, firstLast, all],
    [all, last, last, last, last],
    [all, firstLast, all, firstLast, all],
    [all, firstLast, all, last, all]
  ];

  function forLoop(index, context, number) {
    const num = parseInt(number);
    if (context === "hour") {
      clockHour[index].innerHTML = "";
      for (let row of numbers[num]) {
        for (let pixel of row) {
          const div = document.createElement("div");
          if (pixel) {
            div.classList.add("pixel-on");
          }
          clockHour[index].appendChild(div);
        }
      }
    } else if (context === "minute") {
      clockMinute[index].innerHTML = "";
      for (let row of numbers[num]) {
        for (let pixel of row) {
          const div = document.createElement("div");
          if (pixel) {
            div.classList.add("pixel-on");
          }
          clockMinute[index].appendChild(div);
        }
      }
    } else if (context === "second") {
      clockSecond[index].innerHTML = "";
      for (let row of numbers[num]) {
        for (let pixel of row) {
          const div = document.createElement("div");
          if (pixel) {
            div.classList.add("pixel-on");
          }
          clockSecond[index].appendChild(div);
        }
      }
    }
  }

  function renderNumber() {
    const date = new Date();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    forLoop(0, "hour", `${hour < 10 ? 0 : hour.toString()[0]}`);
    forLoop(1, "hour", `${hour < 10 ? hour : hour.toString()[1]}`);

    forLoop(0, "minute", `${minute < 10 ? 0 : minute.toString()[0]}`);
    forLoop(1, "minute", `${minute < 10 ? minute : minute.toString()[1]}`);

    forLoop(0, "second", `${second < 10 ? 0 : second.toString()[0]}`);
    forLoop(1, "second", `${second < 10 ? second : second.toString()[1]}`);
  }

  const clockInterval = setInterval(renderNumber, 1000);

  window.onclose = (e) => {
    clearInterval(clockInterval);
  }
})();
