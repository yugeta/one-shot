import { Canvas } from "./canvas.js"
// import { Bg }     from "./bg.js"
// import { Build }  from "./build.js"
// import { Chara }  from "./chara.js"
import { Data }   from "./data.js"

export class Animation{
	constructor(){
		// this.bg    = new Bg()
		// this.build = new Build()
		// this.chara = new Chara()
		this.run()
	}

	run(){
		switch(Data.status){
			case "play":
				this.view()
			break

			case "end":
			case "pause":
				// console.log("end")
			break
			
			case "stop":
				Canvas.clear()
			break
		}

		if(Data.setting.wait){
			setTimeout(this.run.bind(this) , Data.setting.wait)
		}
		else{
			window.requestAnimationFrame(this.run.bind(this))
		}
	}

	view(){
		Canvas.clear()
		Data.bg.view()
		Data.build.view()
		Data.chara.view()
		Data.shot.view()
		Canvas.frame_view()
	}
}