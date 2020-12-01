class Clock2 extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: "open" });

		const wrapper = document.createElement("div");
		wrapper.id = "clock2";

		const clockHourWrapper = document.createElement("div");
		const clockMinuteWrapper = document.createElement("div");
		const clockSecondWrapper = document.createElement("div");
		clockHourWrapper.id = "clock2-hour";
		clockMinuteWrapper.id = "clock2-minute";
		clockSecondWrapper.id = "clock2-second";

		const clockHourNumber = document.createElement("div");
		const clockHourNumber2 = document.createElement("div");
		clockHourNumber.classList.add("clock2-hour");
		clockHourNumber2.classList.add("clock2-hour");
		clockHourWrapper.appendChild(clockHourNumber);
		clockHourWrapper.appendChild(clockHourNumber2);

		const clockMinuteNumber = document.createElement("div");
		const clockMinuteNumber2 = document.createElement("div");
		clockMinuteNumber.classList.add("clock2-hour");
		clockMinuteNumber2.classList.add("clock2-hour");
		clockMinuteWrapper.appendChild(clockMinuteNumber);
		clockMinuteWrapper.appendChild(clockMinuteNumber2);

		const clockSecondNumber = document.createElement("div");
		const clockSecondNumber2 = document.createElement("div");
		clockSecondNumber.classList.add("clock2-hour");
		clockSecondNumber2.classList.add("clock2-hour");
		clockSecondWrapper.appendChild(clockSecondNumber);
		clockSecondWrapper.appendChild(clockSecondNumber2);

		const clockHour = new Array(clockHourNumber, clockHourNumber2);
		const clockMinute = new Array(clockMinuteNumber, clockMinuteNumber2);
		const clockSecond = new Array(clockSecondNumber, clockSecondNumber2);

		const dividerWrapper = document.createElement("div");
		dividerWrapper.classList.add("clock2-divider");
		const dividerPixelOn = document.createElement("div");
		const dividerPixelOff = document.createElement("div");
		dividerPixelOn.classList.add("pixel-on");
		dividerPixelOn.classList.add("clock2-pixel");
		dividerPixelOff.classList.add("clock2-pixel");
		dividerWrapper.appendChild(dividerPixelOff.cloneNode());
		dividerWrapper.appendChild(dividerPixelOn.cloneNode());
		dividerWrapper.appendChild(dividerPixelOff.cloneNode());
		dividerWrapper.appendChild(dividerPixelOn.cloneNode());
		dividerWrapper.appendChild(dividerPixelOff.cloneNode());

		const dividerWrapper2 = document.createElement("div");
		dividerWrapper2.appendChild(dividerPixelOff.cloneNode());
		dividerWrapper2.appendChild(dividerPixelOn.cloneNode());
		dividerWrapper2.appendChild(dividerPixelOff.cloneNode());
		dividerWrapper2.appendChild(dividerPixelOn.cloneNode());
		dividerWrapper2.appendChild(dividerPixelOff.cloneNode());

		wrapper.appendChild(clockHourWrapper);
		wrapper.appendChild(dividerWrapper);
		wrapper.appendChild(clockMinuteWrapper);
		wrapper.appendChild(dividerWrapper2);
		wrapper.appendChild(clockSecondWrapper);

		const first = [1, 0, 0];
		const mid = [0, 1, 0];
		const last = [0, 0, 1]
		const firstMid = [1, 1, 0];
		const midLast = [0, 1, 1];
		const firstLast = [1, 0, 1];
		const all = [1, 1, 1];

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

		const style = document.createElement("style");
		style.textContent = `
			html,
			body {
				margin: 0;
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			#clock2 {
				--clock-size: 20px;
				--clock-grid-r: 5;
				--clock-grid-c: 3;
				--margin-num: 5px;
				--margin-hms: 10px;
				--clock-color: #000000;
				font-family: "Segoe UI";
				display: flex;
				height: calc(var(--clock-size) * var(--clock-grid-r));
			}

			#clock2 > div#clock2-hour,
			#clock2 > div#clock2-minute,
			#clock2 > div#clock2-second {
				margin: 0px var(--margin-hms);
				display: flex;
			}

			#clock2 > div > div.clock2-hour,
			#clock2 > div > div.clock2-minute,
			#clock2 > div > div.clock2-second {
				display: grid;
				margin: 0px var(--margin-num);
				grid-template-columns: repeat(var(--clock-grid-c), 1fr);
				grid-template-rows: repeat(var(--clock-grid-r), 1fr);
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
