const container = document.querySelector("#container");

container.addEventListener("mousedown", initDrag);
let dy, ny;

function getDegree(element) {
  const style = element.style.transform;
  const deg = parseInt(style.substr(7).split("deg")[0]);
  return deg;
}

function initDrag(e) {
  dy = e.clientY;
  ny = getDegree(container);
  document.documentElement.addEventListener("mousemove", doDrag);
  document.documentElement.addEventListener("mouseup", stopDrag);
}

function doDrag(e) {
  let degree = getDegree(container);
  degree += ny + (e.clientY - dy) / 5;
  container.style.transform = "rotate(" + (ny - (e.clientY - dy) / 5).toString() + "deg)";
}

function stopDrag(e) {
  document.documentElement.removeEventListener("mousemove", doDrag);
  document.documentElement.removeEventListener("mouseup", stopDrag);
}
