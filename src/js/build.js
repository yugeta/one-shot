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
		const img = Data.images.find(e => e.key === Data.setting.build.items[0].key)
		const size = this.calc_size({
			w : img.w,
			h : img.h,
		})
		this.item(img , size)
	}
	
	item(img, size){
		const pos = {
			x : 0,
			y : Data.canvas.height /2,
		}
		Data.ctx.drawImage(img.data, pos.x, pos.y, size.w, size.h)
	}

	calc_size(img_size){
		const rate = Data.canvas.height / img_size.h
		return {
			w : ~~(img_size.w * rate),
			h : ~~(img_size.h * rate),
		}
	}

	animation(){

	}
}