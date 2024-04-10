/**
 * 背景(ビル影等)のレイヤー表示 : 3段階
 */

import { Data }   from "./data.js"

export class Bg{

	constructor(){
		this.view()
	}

	view(){
		this.layers()
	}

	layers(){
		for(const layer of Data.setting.bg.layers){
			const height_rate = Data.back.height / layer.h
			const size = {
				w : layer.w * height_rate * (layer.height_rate || 1),
				h : layer.h * height_rate * (layer.height_rate || 1),
			}
			const pos = {
				x : this.check_offset_x(layer.pos.x + Data.speed(layer.speed) , size.w),
				y : layer.pos.y,
			}
			const diff = {
				x : Data.canvas.width  - Data.back.width,
				y : Data.canvas.height - Data.back.height,
			}
			const count = this.calc_count(size.w, pos.x)
			for(let i=0; i<count; i++){
				const x = i * size.w + pos.x + diff.x
				const y = Data.back.height - size.h + pos.y + diff.y
				Data.ctx.drawImage(layer.img, x, y, size.w, size.h)

				if(layer.line_width){
					Data.ctx.lineWidth = layer.line_width
					Data.ctx.strokeStyle = layer.stroke_style || "transparent"
					Data.ctx.beginPath()
					Data.ctx.rect(x,y,size.w,size.h)
					Data.ctx.stroke()
				}
			}

			layer.pos.x = pos.x
		}
	}

	bg_layer(img, size , pos){
		const count = this.calc_count(size.w, pos.x)
		for(let i=0; i<count; i++){
			pos = {
				x : i * size.w + pos.x,
				y : Data.back.height - size.h + pos.y,
			}
			Data.ctx.drawImage(img.data, pos.x, pos.y, size.w, size.h)
		}
	}

	height_rate(height_size){
		return Data.back.height / height_size
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
