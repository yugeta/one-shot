import { Data } from "./data.js"

export class Canvas{
	constructor(){
		this.init()
		Canvas.clear()
		this.set_event()
	}

	init(){
		Data.canvas.width  = Data.canvas.offsetWidth
		Data.canvas.height = Data.canvas.offsetHeight
	}

	static clear(){
		Data.ctx.beginPath()
		if(!Data.setting.bg.color){
			Data.ctx.fillStyle = `rgb(0, 0, 0)`
			Data.ctx.fillRect(0, 0, Data.canvas.width, Data.canvas.height)
		}
		else if(!Data.setting.bg.color.length){
			Data.ctx.fillStyle = Data.setting.bg.color
			Data.ctx.fillRect(0, 0, Data.canvas.width, Data.canvas.height)
		}
		else{
			const gradient = Data.ctx.createLinearGradient(0, 0, 0, Data.canvas.height)
			gradient.addColorStop(0, Data.setting.bg.color[0])
			gradient.addColorStop(1, Data.setting.bg.color[1])
			Data.ctx.fillStyle = gradient;
			Data.ctx.fillRect(0, 0, Data.canvas.width, Data.canvas.height)
		}
	}

	set_event(){
		window.addEventListener("resize", this.init.bind(this))
	}

}