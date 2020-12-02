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

		// extracting attributes from tag
		let draggablePadding;
		if (this.hasAttribute("padding")) {
			draggablePadding = this.getAttribute("padding");
		} else {
			draggablePadding = "20px";
		}

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
			item1.style.width = (startWidth + e.clientX - startPosX - parseInt(draggablePadding)*2) + 'px';
			item2.style.left = (startWidth + e.clientX + DIVIDERWIDTH - startPosX) + 'px';
			item2.style.width = (bodyWidth - parseInt(document.defaultView.getComputedStyle(item1).width) - DIVIDERWIDTH - parseInt(draggablePadding)*4) + 'px';

			item1.style.userSelect = "none";
			item2.style.userSelect = "none";
		}

		function handleDragStop(e) {
			document.documentElement.removeEventListener("mousemove", handleDrag);
			item1.style.userSelect = "auto";
			item2.style.userSelect = "auto";
		}

		// css styling
		const style = document.createElement("style");
		style.textContent = `
		#draggable-wrapper {
			--divider-width: ${DIVIDERWIDTH}px;
			--draggable-padding: ${draggablePadding};
			width: 100%;
			height: 100%;
			background-color: #bbbbbb;
			display: flex;
			flex-direction: row;
		}

		#draggable-wrapper #draggable-item1,
		#draggable-wrapper #draggable-item2 {
			width: calc(50% - var(--divider-width)/2 - var(--draggable-padding)*2);
			height: calc(100% - var(--draggable-padding)*2);
			padding: var(--draggable-padding);
			overflow: scroll;
			-ms-overflow-style: none;
			scrollbar-width: none;
		}

		#draggable-wrapper #draggable-item1::-webkit-scrollbar,
		#draggable-wrapper #draggable-item2::-webkit-scrollbar {
			display: none;
		}

		#draggable-wrapper #draggable-item1 {
			background-color: #ffffff;
		}

		#draggable-wrapper #draggable-item2 {
			background-color: #ffffff;
			position: absolute;
			left: calc(50% - var(--divider-width)/2 + var(--divider-width));
		}

		#draggable-wrapper #draggable-divider {
			width: var(--divider-width);
			height: 100%;
			background-color: #dddddd;
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

		item1.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus libero non magna accumsan, nec interdum libero rhoncus. Donec et vestibulum neque. Quisque urna ex, volutpat eget elementum at, iaculis sed metus. Duis gravida velit et magna ultricies, in condimentum dolor sodales. Integer porta condimentum suscipit. Suspendisse vitae sodales velit, in elementum orci. Proin molestie nunc ut purus dictum tincidunt non eget purus. Pellentesque quis lacus sit amet elit tincidunt bibendum ut tempus magna.".repeat(30);
		item2.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus libero non magna accumsan, nec interdum libero rhoncus. Donec et vestibulum neque. Quisque urna ex, volutpat eget elementum at, iaculis sed metus. Duis gravida velit et magna ultricies, in condimentum dolor sodales. Integer porta condimentum suscipit. Suspendisse vitae sodales velit, in elementum orci. Proin molestie nunc ut purus dictum tincidunt non eget purus. Pellentesque quis lacus sit amet elit tincidunt bibendum ut tempus magna.".repeat(30);

		shadow.appendChild(wrapper);
		shadow.appendChild(style);
		shadow.append(style, wrapper);
	}
}

customElements.define("custom-draggable", Draggable);
