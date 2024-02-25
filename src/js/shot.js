import { Data }  from "./data.js"

export class Shot{
	status  = "bullet_1"
	bullets = []
	// datas   = {}

	constructor(){
		// this.init()
	}

	get datas(){
		return Data.setting.shot.items
	}

	// init(){
	// 	this.datas.bullet_1 = this.get_data("bullet_1")
	// 	this.datas.bullet_2 = this.get_data("bullet_2")
	// 	console.log()
	// }

	get_data(key){
		return Data.images.find(e => e.key === key)
	}

	shoot(){
		if(Data.setting.shot.limit_count && this.bullets.length >= Data.setting.shot.limit_count){return}
		// const pos = Data.chara.center_pos
		this.bullets.push({
			type : this.status,
			img  : this.datas[this.status].img,
			x    : Data.chara.pos.x + (Data.chara.run[0].w / 2 * Data.setting.chara.rate),
			y    : Data.chara.pos.y + (Data.setting.shot.pos_y * Data.setting.chara.rate),
			// x    : pos.x + (Data.chara.run[0].w / 2 * Data.setting.chara.rate),
			// y    : pos.y + (Data.setting.shot.pos_y * Data.setting.chara.rate),
			w    : this.datas[this.status].w,
			h    : this.datas[this.status].h,
		})
	}

	view(){
		if(!this.bullets.length){return}
		const removes = []
		for(let i=0; i<this.bullets.length; i++){
			const bullet = this.bullets[i]
			const img = bullet.img
			const x   = bullet.x
			const y   = bullet.y
			const w   = bullet.w * Data.setting.chara.rate
			const h   = bullet.h * Data.setting.chara.rate
			Data.ctx.drawImage(img, x, y, w, h)

			// frame
			if(Data.setting.shot.line_width){
				Data.ctx.lineWidth = Data.setting.shot.line_width
				Data.ctx.strokeStyle = Data.setting.shot.stroke_style || "transparent"
				Data.ctx.beginPath()
				Data.ctx.rect(x,y,w,h)
				Data.ctx.stroke()
			}
			bullet.x += Data.setting.shot.speed

			if(x + w > Data.canvas.width){
				removes.push(i)
			}
		}
		this.remove(removes)
	}

	remove(removes){
		if(!removes.length){return}
		for(let i=0; i<removes.length; i++){
			this.bullets.splice(removes[i], 1)
		}
	}

}