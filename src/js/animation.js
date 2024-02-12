import { Canvas } from "./canvas.js"
import { Bg }     from "./bg.js"
import { Build }  from "./build.js"
import { Data }   from "./data.js"

export class Animation{
	constructor(){
		this.bg    = new Bg()
		this.build = new Build()
		this.run()
	}

	run(){
		switch(Data.status){
			case "play":
				Canvas.clear()
				this.bg.view()
				this.build.view()
			break

			case "pause":
			break
			
			case "stop":
				Canvas.clear()
			break
		}
		window.requestAnimationFrame(this.run.bind(this))
		// setTimeout(this.run.bind(this) , 200)
	}
}