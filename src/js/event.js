import { Canvas } from "./canvas.js"

export class Event{
	constructor(){
		this.setting()
	}

	setting(){
		// document.body.addEventListener("resize", this.resize.bind(this))
	}

	resize(){
		new Canvas()
	}
}