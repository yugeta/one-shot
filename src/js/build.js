import { Data }   from "./data.js"

export class Build{
	offset_px = 0
	maps      = []

	constructor(offset_px =0){
		this.offset_px = offset_px
		this.create_maps()
		this.view()
		this.animation()
	}

	create_maps(){
		
	}

	view(){
		const img  = Data.images.find(e => e.key === Data.setting.build.items[0].key)
		const rate = this.rate(img.h)
		const size = {
			w : ~~(img.w * rate),
			h : ~~(img.h * rate),
		}

		let offset_px = (this.offset_px * rate) * Data.setting.bg.direction 
		// offset_px = this.calc_scroll_offset(offset_px, size.w)

		this.item(img , size, offset_px)

		

		this.offset_px += Data.setting.build.speed
	}
	
	item(img, size, offset_px){
		const pos = {
			x : 0 + offset_px,
			y : Data.canvas.height /2,
		}
		Data.ctx.drawImage(img.data, pos.x, pos.y, size.w, size.h)
	}

	rate(img_size_h){
		return Data.canvas.height / img_size_h * 0.8
	}

	// calc_size(img_size){
	// 	const rate = Data.canvas.height / img_size.h * 0.8
	// 	return {
	// 		w : ~~(img_size.w * rate),
	// 		h : ~~(img_size.h * rate),
	// 	}
	// }

	animation(){

	}
}