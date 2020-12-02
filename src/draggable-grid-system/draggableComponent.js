class Draggable extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: 'open' });
		const DIVIDERWIDTH = 10;

		// wrapper element
		const wrapper = document.createElement("div");
		wrapper.id = "draggable-wrapper";
		wrapper.innerHTML = `
		<div id="draggable-item1"></div>
		<div id="draggable-divider">
			<div id="draggable-divider-button"></div>
		</div>
		<div id="draggable-item2"></div>
		`;
		// child elements
		const item1 = wrapper.querySelector("#draggable-item1");
		const item2 = wrapper.querySelector("#draggable-item2");
		const divider = wrapper.querySelector("#draggable-divider");

		// dragging slider logic
		let startPosX, startWidth, item1Width, item2Width, bodyWidth;
		divider.addEventListener("mousedown", handleMouseDown);
		document.documentElement.addEventListener("mouseup", handleDragStop);

		function handleMouseDown(e) {
			startPosX = e.clientX;
			startWidth = parseInt(document.defaultView.getComputedStyle(divider).left);
			item1Width = parseInt(document.defaultView.getComputedStyle(item1).width);
			item2Width = parseInt(document.defaultView.getComputedStyle(item2).width);
			bodyWidth = parseInt(document.defaultView.getComputedStyle(document.body).width);
			document.documentElement.addEventListener("mousemove", handleDrag);
		}

		function handleDrag(e) {
			divider.style.left = (startWidth + e.clientX - startPosX) + 'px';
			item1.style.width = (startWidth + e.clientX - startPosX) + 'px';
			item2.style.left = (startWidth + e.clientX + DIVIDERWIDTH - startPosX) + 'px';
			item2.style.width = (bodyWidth - parseInt(document.defaultView.getComputedStyle(item1).width) - DIVIDERWIDTH) + 'px';
		}

		function handleDragStop(e) {
			document.documentElement.removeEventListener("mousemove", handleDrag);
		}

		// css styling
		const style = document.createElement("style");
		style.textContent = `
		#draggable-wrapper {
			--divider-width: ${DIVIDERWIDTH}px;
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
			position: absolute;
			left: calc(50% - var(--divider-width)/2 + var(--divider-width));
		}

		#draggable-wrapper #draggable-divider {
			width: var(--divider-width);
			height: 100%;
			background-color: #ffffff;
			cursor: ew-resize;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			left: calc(50% - var(--divider-width)/2);
			z-index: 999;
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
