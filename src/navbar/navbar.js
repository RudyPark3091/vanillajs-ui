(function () {
  const navbar = document.getElementById("navbar");
  const navbarButton = document.getElementById("navbar-button");

  navbarButton.onclick = (e) => {
    if (navbar.style.display === "none") {
      navbar.style.display = "flex";
    } else {
      navbar.style.display = "none";
    }
  }

  window.onresize = () => {
    navbar.style.display = "flex";
  }
})();

