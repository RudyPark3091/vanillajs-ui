class Clock extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: 'open' });

		const wrapper = document.createElement("div");
		wrapper.id = "clock";

		function renderClock() {
			const date = new Date();

			const hour = date.getHours();
			const minute = date.getMinutes();
			const second = date.getSeconds();

			wrapper.innerText = `${
					hour < 10 ? `0${hour}` : hour
				}:${
					minute < 10 ? `0${minute}` : minute
				}:${
					second < 10 ? `0${second}` : second
				}`;
		}
		renderClock();

		const clockInterval = setInterval(() => { renderClock() }, 1000);

		let size;
		if (this.hasAttribute("font-size")) {
			size = this.getAttribute("font-size");
		} else {
			size = "10px";
		}

		const style = document.createElement("style");
		style.textContent = `#clock {
			font-size: ${size};
			font-weight: 700;
			font-family: "Segoe UI";
		}`;

		window.onclose = (e) => {
			clearInterval(clockInterval);
		}

		shadow.appendChild(wrapper);
		shadow.appendChild(style);
		shadow.append(style, wrapper);
	}
}

customElements.define("custom-clock", Clock);
