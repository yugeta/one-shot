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
		this.rate()
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

	// bgの最初の画像の画面表示割合を基本rateとする
	rate(){
		// Data.rate = 2.0
		// return
		const key  = Data.setting.bg.layers[0].key
		const rate = Data.setting.bg.layers[0].height_rate
		const data = Data.images.find(e => e.key === key)
		if(data){
			Data.rate = Data.canvas.height / data.h
			// Data.rate = Data.canvas.height / data.h * rate
		}
		else{
			Data.rate = 1
		}
		// console.log("rate:",Data.rate)
	}

	static frame(){
		Data.ctx.lineWidth = "4";
		Data.ctx.strokeStyle = "white";
		Data.ctx.beginPath();
    Data.ctx.rect(20,20,50,50);
    Data.ctx.stroke();
	}

}