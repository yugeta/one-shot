import { Data } from "./data.js"

export class Canvas{
	constructor(){
		this.init()
		Canvas.clear()
	}

	init(){
		Data.canvas.width  = Data.canvas.offsetWidth
		Data.canvas.height = Data.canvas.offsetHeight
		// Data.canvas.width  = window.innerWidth
		// Data.canvas.height = window.innerHeight
		
	}

	static clear(){
		Data.ctx.beginPath()
		Data.ctx.fillStyle = 'rgb(0, 0, 0)'
		Data.ctx.fillRect(0, 0, Data.canvas.width, Data.canvas.height)
	}

	// view(){
	// 	this.clear()
	// 	// this.bg()
	// }

	// // BG
	// bg_pos = 0

	// bg(){
	// 	if(!Data.bg){return}
		
	// 	const size = {
	// 		w : Data.bg.w,
	// 		h : Data.bg.h,
	// 	}
  //   Data.ctx.drawImage(Data.bg.data, Data.setting.bg.pos.x, Data.setting.bg.pos.y, size.w, size.h)

	// 	this.bg_scroll()
	// }

	// bg_scroll(){
	// 	Data.setting.bg.pos.x += Data.setting.bg.speed
	// 	if(Data.setting.bg.pos.x > window.innerWidth - 100){return}

	// 	window.requestAnimationFrame(this.view.bind(this))
	// }

}