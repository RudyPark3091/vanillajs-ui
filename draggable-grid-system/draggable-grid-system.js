(function () {
  const container = document.getElementById("dr-grid-container");
  const gridItems = container.childNodes;

  gridItems.forEach(item => {
    let interval;
    item.addEventListener("dragstart", (e) => {
      const dragged = e.target;
      dragged.style.opacity = .5;
    })

    item.ondragexit = (e) => {
      console.log("drag exit on", e.target);
    }
  });

  const items = [];

  items.forEach(item => {
    container.appendChild(item);
  });
})();
