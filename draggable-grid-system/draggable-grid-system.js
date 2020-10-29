(function () {
  const container = document.getElementById("dr-grid-container");
  const items = [];

  const div = document.createElement("div");
  div.innerText = "Hello World";

  items.push(div);

  items.forEach(item => {
    container.appendChild(item);
  });
})();
