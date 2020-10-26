const clock = document.getElementById("clock");

const clockInterval = setInterval(() => {
  const date = new Date();
  clock.innerText = date.toLocaleTimeString();
}, 1000);

window.onclose = (e) => {
  clearInterval(clockInterval);
}
