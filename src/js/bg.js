import { Data }   from "./data.js"

export class Bg{
	offset_px      = 0

	constructor(offset_px =0){
		this.offset_px = offset_px
		this.view()
	}

	view(){
		this.bg_0()

		for(const layer of Data.setting.bg.leyers){
			const img = Data.images.find(e => e.key === layer.key)
			if(!img){continue}
			const size = this.calc_size({
				w : img.w,
				h : img.h,
			}, layer.height_rate)
			let scroll_px = (this.offset_px * layer.offset_rate) * Data.setting.bg.direction 
			scroll_px = this.calc_scroll_offset(scroll_px, size.w)
			// console.log(scroll_px)
			this.bg_layer(img , size, scroll_px)
		}
	}

	bg_0(){
		const img = Data.images.find(e => e.key === "bg_0")
		if(!img){return}
		const size = {
			w : Data.canvas.width,
			h : Data.canvas.height,
		}
    Data.ctx.drawImage(img.data, 0, 0, size.w, size.h)
	}
	
	bg_layer(img, size , scroll_px){
		

		const count = this.calc_count(size.w, scroll_px)

		for(let i=0; i<count; i++){
			const pos = {
				x : i * size.w + scroll_px,
				y : Data.canvas.height - size.h,
			}
			// console.log(pos)
			Data.ctx.drawImage(img.data, pos.x, pos.y, size.w, size.h)
		}
	}

	calc_size(img_size, size=1){
		const rate = Data.canvas.height / img_size.h * 0.6
		return {
			w : img_size.w * rate,
			h : Data.canvas.height * size,
		}
	}

	calc_scroll_offset(scroll_px, width){
		switch(Data.setting.bg.direction){
			// 左スクロール
			case -1:
				if(scroll_px <= -width){
					scroll_px = ~~((scroll_px - width) % width)
					// scroll_px = scroll_px - width
				}
			break

			// 右スクロール
			case 1:

			break
		}
		return scroll_px
	}

	calc_count(width, offset){
		return Math.ceil((Data.canvas.width + (offset * Data.setting.bg.direction)) / width)
	}
}
