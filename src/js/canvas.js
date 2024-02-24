import { Data } from "./data.js"

export class Canvas{
	constructor(){
		this.init()
		Canvas.clear()
		this.set_event()
	}

	init(){
		this.canvas_size()
		this.frame()
		this.rate()
	}

	canvas_size(){
		Data.canvas.width  = Data.canvas.offsetWidth
		Data.canvas.height = Data.canvas.offsetHeight
	}

	frame(){
		const base_rate = 0.5
		Data.back = {
			width  : Data.canvas.offsetWidth,
			height : Data.canvas.offsetHeight * base_rate,
		}
		Data.diff = {
			width  : Data.canvas.width  - Data.back.width,
			height : Data.canvas.height - Data.back.height,
		}
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

	static frame_view(){
		if(!Data.setting.frame.line_width){return}
		const pos = {
			x : Data.canvas.width  - Data.back.width  + Data.setting.frame.line_width / 2,
			y : Data.canvas.height - Data.back.height + Data.setting.frame.line_width / 2,
		}
		const size = {
			w : Data.back.width  - Data.setting.frame.line_width,
			h : Data.back.height - Data.setting.frame.line_width,
		}
		
		Data.ctx.lineWidth = Data.setting.frame.line_width
		Data.ctx.strokeStyle = Data.setting.frame.stroke_style
		Data.ctx.beginPath()
    Data.ctx.rect(pos.x, pos.y, size.w, size.h)
    Data.ctx.stroke()
	}

}