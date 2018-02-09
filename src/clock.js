export default class Clock {
	constructor(options) {
		const defaultOptions = {
			perspective: false,
			direction: "up",
			sidesOrder: {
				up: {
					front: 4,
					bottom: 1,
					back: 2,
					top: 3
				},
				down: {
					front: 4,
					bottom: 3,
					back: 2,
					top: 1
				}
			}
		};
		
		this.root = options.root;
		this.options = {...defaultOptions, ...options};
		this.state = {
			hours: '00',
			minutes: '00',
			seconds: '00'
		};
		this.init();
		this.start();
	}
	
	cacheNodes() {
		const orderMap = this.options.sidesOrder[this.options.direction];
		
		this.nodes = {
			hours: this.root.querySelector('.js-hours'),
			minutes: this.root.querySelector('.js-minutes'),
			seconds: this.root.querySelector('.js-seconds')
		};
		
		for (let element in this.nodes) {
			const sides = [...this.nodes[element].querySelectorAll('.side')]
				.filter((side) => {
					const isExcess = side.classList.contains('left') || side.classList.contains('right');
					return !isExcess;
			}).sort((a, b) => {
					const classA = a.classList.value.replace(/ side/, "");
					const classB = b.classList.value.replace(/ side/, "");
					
					if (orderMap[classA] > orderMap[classB]) {
						return 1;
					} else {
						return -1;
					}
			});
			
			this.nodes[element].sides = sides;
			this.nodes[element].amount = -1;
			this.nodes[element].deg = 0;
			this.nodes[element].counter = 0;
			this.nodes[element].maxCounter = sides.length - 1;
		}
	}
	
	init() {
		this.root.classList.toggle('perspective', this.options.perspective);
		this.root.innerHTML = `
		<div class="container js-hours">
    	<div class="back side"></div>
    	<div class="left side"></div>
    	<div class="right side"></div>
    	<div class="top side"></div>
    	<div class="bottom side"></div>
    	<div class="front side"></div>
		</div>
		<div class="dots">
			<div class="dot"></div>
			<div class="dot"></div>
		</div>
		<div class="container js-minutes">
    	<div class="back side"></div>
    	<div class="left side"></div>
    	<div class="right side"></div>
    	<div class="top side"></div>
    	<div class="bottom side"></div>
    	<div class="front side"></div>
		</div>
		<div class="dots">
			<div class="dot"></div>
			<div class="dot"></div>
		</div>
		<div class="container js-seconds">
    	<div class="back side"></div>
    	<div class="left side"></div>
    	<div class="right side"></div>
    	<div class="top side"></div>
    	<div class="bottom side"></div>
    	<div class="front side"></div>
		</div>
		`;
		this.cacheNodes();
	}
	
	addZero(value) {
		return value >= 10 ? "" + value : "0" + value;
	}
	
	start = () => {
		const nowDate = new Date();
		const hours = this.addZero(nowDate.getHours());
		const	minutes = this.addZero(nowDate.getMinutes());
		const	seconds = this.addZero(nowDate.getSeconds());
		
		this.state = {hours, minutes, seconds};
		this.update();
		
		setTimeout(() => {
			this.start();
		}, 1000);
	}
	
	update = () => {
		for (let element in this.nodes) {
			if (this.nodes[element].amount !== this.state[element]) {
				const sideNumber = this.nodes[element].counter;
				
				this.nodes[element].sides[sideNumber].innerHTML = `<div class="text">${this.state[element]}</div>`;
				this.nodes[element].sides.forEach((side, i) => {
					const text = side.querySelector(".text");
					
					if (text && i === sideNumber) {
						text.style.transition = "opacity 0.1s linear";
						text.style.opacity = 1;
					} else if (text && i !== sideNumber) {
						text.style.transition = "opacity 0.3s linear";
						text.style.opacity = 0;
					}
				});
				
				if (this.options.direction === "up") {
						this.nodes[element].deg += 90;
				} else {
						this.nodes[element].deg -= 90;
				}
						
				this.nodes[element].style.transform = `rotate3d(1,0,0,${this.nodes[element].deg}deg)`;
				this.nodes[element].counter = this.nodes[element].counter === this.nodes[element].maxCounter ? 0 : this.nodes[element].counter + 1;
			}
			
			this.nodes[element].amount = this.state[element];
		}
	}
}