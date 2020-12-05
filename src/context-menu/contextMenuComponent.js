class ContextMenu extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: "open" });

		// declaration of wrapper
		const wrapper = document.createElement("div");
		wrapper.id = "context-menu";
		wrapper.classList.add("hidden");

		wrapper.innerHTML = `
		<div>Text sample</div>
		<div>Item 2</div>
		<div>This is Item 3</div>
		`;

		// add event listener
		// right click -> open context menu
		document.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			wrapper.classList.remove("hidden");
			wrapper.style.left = `${e.clientX}px`;
			wrapper.style.top = `${e.clientY}px`;
		});

		// left click -> close context menu
		document.addEventListener("click", (e) => {
			wrapper.classList.add("hidden");
		});

		const style = document.createElement("style");
		style.textContent = `
		.hidden {
			display: none;
		}

		#context-menu {
			position: absolute;
			top: 0px;
			left: 0px;
			border-radius: 3px;
			-webkit-backdrop-filter: blur(10px);
			backdrop-filter: blur(10px);
			font-family: "Segoe UI";
			z-index: 9999;
		}

		#context-menu > * {
			border-bottom: #eeeeff55;
			background-color: #ffffff55;
			padding: 5px 20px;
			cursor: pointer;
		}
		`;

		shadow.appendChild(wrapper);
		shadow.appendChild(style);
		shadow.append(style, wrapper);
	}
}

customElements.define("context-menu", ContextMenu);
