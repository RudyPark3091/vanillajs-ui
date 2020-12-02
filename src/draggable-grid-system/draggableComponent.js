class Draggable extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: 'open' });

		const wrapper = document.createElement("div");
		wrapper.id = "draggable-wrapper";
		wrapper.innerHTML = `
		<div id="draggable-item1"></div>
		<div id="draggable-divider">
			<div id="draggable-divider-button"></div>
		</div>
		<div id="draggable-item2"></div>
		`;
		const item1 = wrapper.querySelector("#draggable-item1");
		const item2 = wrapper.querySelector("#draggable-item2");
		const divider = wrapper.querySelector("#draggable-divider");

		let startPosX, startWidth;
		divider.addEventListener("mousedown", handleMouseDown);
		document.documentElement.addEventListener("mouseup", handleDragStop);

		function handleMouseDown(e) {
			startPosX = e.clientX;
			startWidth = parseInt(document.defaultView.getComputedStyle(divider).width);
			document.documentElement.addEventListener("mousemove", handleDrag);
		}

		function handleDrag(e) {
			divider.style.width = (startWidth + e.clientX - startPosX) + 'px';
		}

		function handleDragStop(e) {
			document.documentElement.removeEventListener("mousemove", handleDrag);
		}

		const style = document.createElement("style");
		style.textContent = `
		#draggable-wrapper {
			--divider-width: 10px;
			width: 100%;
			height: 100%;
			background-color: #bbbbbb;
			display: flex;
			flex-direction: row;
		}

		#draggable-wrapper #draggable-item1,
		#draggable-wrapper #draggable-item2 {
			width: calc(50% - var(--divider-width)/2);
			height: 100%;
		}

		#draggable-wrapper #draggable-item1 {
			background-color: #444444;
		}

		#draggable-wrapper #draggable-item2 {
			background-color: #777777;
		}

		#draggable-wrapper #draggable-divider {
			width: 10px;
			height: 100%;
			background-color: #ffffff;
			cursor: ew-resize;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		#draggable-divider > div {
			width: calc(var(--divider-width) / 3);
			height: calc(var(--divider-width) * 5);
			background-color: #bbbbbb;
		}
		`;

		shadow.appendChild(wrapper);
		shadow.appendChild(style);
		shadow.append(style, wrapper);
	}
}

customElements.define("custom-draggable", Draggable);
