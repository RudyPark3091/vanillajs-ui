class Clock2 extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: "open" });

		const wrapper = document.createElement("div");
		wrapper.innerHTML = `
			<div id="clock2-hour">
				<div class="clock2-hour"></div>
				<div class="clock2-hour"></div>
			</div>
			<div class="clock2-divider">
				<div class="clock2-pixel"></div>
				<div class="clock2-pixel pixel-on"></div>
				<div class="clock2-pixel"></div>
				<div class="clock2-pixel pixel-on"></div>
				<div class="clock2-pixel"></div>
			</div>
			<div id="clock2-minute">
				<div class="clock2-minute"></div>
				<div class="clock2-minute"></div>
			</div>
			<div class="clock2-divider">
				<div class="clock2-pixel"></div>
				<div class="clock2-pixel pixel-on"></div>
				<div class="clock2-pixel"></div>
				<div class="clock2-pixel pixel-on"></div>
				<div class="clock2-pixel"></div>
			</div>
			<div id="clock2-second">
				<div class="clock2-second"></div>
				<div class="clock2-second"></div>
			</div>
		`;
		wrapper.id = "clock2";
		const clockHour = wrapper.querySelectorAll(".clock2-hour");
		const clockMinute = wrapper.querySelectorAll(".clock2-minute");
		const clockSecond = wrapper.querySelectorAll(".clock2-second");

		/*
		 * clock pixel shape: 5 x 3
		 *
		 * 0 0 0
		 * 0 0 0
		 * 0 0 0
		 * 0 0 0
		 * 0 0 0
		 */

		// should be reworked if clock pixel shape is changed
		const first = [1, 0, 0];
		const mid = [0, 1, 0];
		const last = [0, 0, 1]
		const firstMid = [1, 1, 0];
		const midLast = [0, 1, 1];
		const firstLast = [1, 0, 1];
		const all = [1, 1, 1];

		// 0 to 9 pixel shapes
		const numbers = [
			[all, firstLast, firstLast, firstLast, all],
			[last, last, last, last, last],
			[all, last, all, first, all],
			[all, last, all, last, all],
			[firstLast, firstLast, all, last, last],
			[all, first, all, last, all],
			[all, first, all, firstLast, all],
			[all, last, last, last, last],
			[all, firstLast, all, firstLast, all],
			[all, firstLast, all, last, all]
		];

		// index: -th number of context
		// context: hour / minute / second
		// number: number to display
		function forLoop(index, context, number) {
			const num = parseInt(number);
			if (context === "hour") {
				clockHour[index].innerHTML = "";
				for (let row of numbers[num]) {
					for (let pixel of row) {
						const div = document.createElement("div");
						if (pixel) {
							div.classList.add("pixel-on");
						}
						clockHour[index].appendChild(div);
					}
				}
			} else if (context === "minute") {
				clockMinute[index].innerHTML = "";
				for (let row of numbers[num]) {
					for (let pixel of row) {
						const div = document.createElement("div");
						if (pixel) {
							div.classList.add("pixel-on");
						}
						clockMinute[index].appendChild(div);
					}
				}
			} else if (context === "second") {
				clockSecond[index].innerHTML = "";
				for (let row of numbers[num]) {
					for (let pixel of row) {
						const div = document.createElement("div");
						if (pixel) {
							div.classList.add("pixel-on");
						}
						clockSecond[index].appendChild(div);
					}
				}
			}
		}

		// rendering number inside wrapper
		function renderNumber() {
			const date = new Date();

			const hour = date.getHours();
			const minute = date.getMinutes();
			const second = date.getSeconds();

			forLoop(0, "hour", `${hour < 10 ? 0 : hour.toString()[0]}`);
			forLoop(1, "hour", `${hour < 10 ? hour : hour.toString()[1]}`);

			forLoop(0, "minute", `${minute < 10 ? 0 : minute.toString()[0]}`);
			forLoop(1, "minute", `${minute < 10 ? minute : minute.toString()[1]}`);

			forLoop(0, "second", `${second < 10 ? 0 : second.toString()[0]}`);
			forLoop(1, "second", `${second < 10 ? second : second.toString()[1]}`);
		}

		renderNumber();
		const clockInterval = setInterval(renderNumber, 1000);

		window.onclose = (e) => {
			clearInterval(clockInterval);
		}

		// extracting attribute values from tag
		// defines user view context
		let size;
		if (this.hasAttribute("size")) {
			size = this.getAttribute("size");
		} else {
			size = "10px";
		}

		let color;
		if (this.hasAttribute("color")) {
			color = this.getAttribute("color");
		} else {
			color = "#000000";
		}

		let bgColor;
		if (this.hasAttribute("bg-color")) {
			bgColor = this.getAttribute("bg-color");
		} else {
			bgColor = "transparent";
		}

		let clockMargin;
		if (this.hasAttribute("margin")) {
			clockMargin = this.getAttribute("margin");
		} else {
			clockMargin = "0px";
		}

		let clockPadding;
		if (this.hasAttribute("padding")) {
			clockPadding = this.getAttribute("padding");
		} else {
			clockPadding = "0px";
		}

		// css part
		const style = document.createElement("style");
		style.textContent = `
			#clock2 {
				--clock-size: ${size};
				--clock-grid-r: 5;
				--clock-grid-c: 3;
				--margin-num: calc(var(--clock-size) / 4);
				--margin-hms: calc(var(--clock-size) / 2);
				--clock-color: ${color};
				--clock-bg-color: ${bgColor};
				--clock-padding: ${clockPadding};
				--clock-margin: ${clockMargin};
				font-family: "Segoe UI";
				display: flex;
				height: calc(var(--clock-size) * var(--clock-grid-r));
				background-color: var(--clock-bg-color);
				padding: var(--clock-padding);
				margin: var(--clock-margin);
			}

			#clock2 > div#clock2-hour,
			#clock2 > div#clock2-minute,
			#clock2 > div#clock2-second {
				margin: 0px var(--margin-hms);
				display: flex;
			}

			#clock2 > div#clock2-hour {
				margin-left: 0px;
			}

			#clock2 > div#clock2-second {
				margin-right: 0px;
			}

			#clock2 > div > div.clock2-hour,
			#clock2 > div > div.clock2-minute,
			#clock2 > div > div.clock2-second {
				display: grid;
				margin: 0px var(--margin-num);
				grid-template-columns: repeat(var(--clock-grid-c), 1fr);
				grid-template-rows: repeat(var(--clock-grid-r), 1fr);
			}

			#clock2 > div#clock2-hour > .clock2-hour:nth-child(1) {
				margin-left: 0px;
			}

			#clock2 > div#clock2-second > .clock2-second:nth-child(2) {
				margin-right: 0px;
			}

			#clock2 > div > div > div {
				width: var(--clock-size);
				height: var(--clock-size);
			}

			.clock2-divider {
				width: var(--clock-size);
				height: calc(var(--clock-size) * var(--clock-grid-r));
				display: grid;
				grid-template-rows: repeat(var(--clock-grid-r), 1fr);
			}

			.clock2-divider > .pixel-on {
				background-color: var(--clock-color);
			}

			.clock2-pixel {
				width: var(--clock-size);
				height: var(--clock-size);
			}

			.pixel-on {
				background-color: var(--clock-color);
			}
		`;

		shadow.appendChild(wrapper);
		shadow.appendChild(style);
		shadow.append(style, wrapper);
	}
}

customElements.define("custom-clock2", Clock2);
