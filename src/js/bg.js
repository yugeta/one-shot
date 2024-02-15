import { Data }   from "./data.js"

export class Bg{
	offset_px = 0

	constructor(){
		this.view()
	}

	view(){
		// this.static()
		this.layers()
	}

	// 固定背景
	static(){
		const img = Data.images.find(e => e.key === "bg_0")
		if(!img){return}
		const size = {
			w : Data.canvas.width,
			h : Data.canvas.height,
		}
    Data.ctx.drawImage(img.data, 0, 0, size.w, size.h)
	}

	// 
	layers(){
		for(const layer of Data.setting.bg.leyers){
			const img = Data.images.find(e => e.key === layer.key)
			if(!img){continue}
			const height_rate = this.height_rate(img.h)
			const size = {
				w : img.w * height_rate * (layer.height_rate || 1),
				h : img.h * height_rate * (layer.height_rate || 1),
			}
			const pos = {
				x : this.check_offset_x(layer.pos.x + layer.speed * Data.setting.bg.direction , size.w),
				y : layer.pos.y,
			}
			const count = this.calc_count(size.w, pos.x)
			for(let i=0; i<count; i++){
				const x = i * size.w + pos.x
				const y = Data.canvas.height - size.h + pos.y
				Data.ctx.drawImage(img.data, x, y, size.w, size.h)
			}

			layer.pos.x = pos.x
		}
	}

	bg_layer(img, size , pos){
		const count = this.calc_count(size.w, pos.x)

		for(let i=0; i<count; i++){
			pos = {
				x : i * size.w + pos.x,
				y : Data.canvas.height - size.h + pos.y,
			}
			Data.ctx.drawImage(img.data, pos.x, pos.y, size.w, size.h)
		}
	}

	height_rate(height_size){
		return Data.canvas.height / height_size
	}

	check_offset_x(pos_x , size_w){
		switch(Data.setting.bg.direction){
			// 左スクロール
			case -1:
				return pos_x < -size_w ? 0 : pos_x
			// 右スクロール
			case 1:
				return pos_x > size_w ? 0 : pos_x
		}
	}

	calc_count(width, offset){
		return Math.ceil((Data.canvas.width + (offset * Data.setting.bg.direction)) / width)
	}

}