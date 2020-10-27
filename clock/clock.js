const clock = document.getElementById("clock");

const clockInterval = setInterval(() => {
  const date = new Date();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const clockString = `${hour}:${minute}:${second}`;
  clock.innerText = clockString;
}, 1000);

window.onclose = (e) => {
  clearInterval(clockInterval);
}
