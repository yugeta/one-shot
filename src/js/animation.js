import { Canvas } from "./canvas.js"
import { Bg }     from "./bg.js"
import { Build }  from "./build.js"

export class Animation{
	constructor(){
		this.bg    = new Bg()
		this.build = new Build()
		this.run()
	}

	run(){
		Canvas.clear()
		this.bg.view()
		// this.build.view()
		window.requestAnimationFrame(this.run.bind(this))
	}
}