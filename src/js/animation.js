import { Bg }     from "./bg.js"
import { Data }   from "./data.js"

export class Animation{
	constructor(){
		this.run()
	}

	bg_offset = 0

	run(){
		this.bg_offset += Data.setting.bg.speed
		new Bg(this.bg_offset)

		window.requestAnimationFrame(this.run.bind(this))
	}


}