import { Data }  from "./data.js"

export class Shot{
	status  = "bullet_1"
	item_num = 0
	bullets = []

	constructor(){
		// this.init()
	}

	get datas(){
		return Data.setting.shot.items
	}

	get rate(){
		return Data.setting.chara.rate
	}

	get speed(){
		return this.datas[this.status].speed
	}

	get_data(key){
		return Data.images.find(e => e.key === key)
	}

	shoot(){
		if(Data.setting.shot.limit_count && this.bullets.length >= Data.setting.shot.limit_count){return}
		this.bullets.push({
			type : this.status,
			img  : this.datas[this.status].img,
			x    : Data.chara.pos.x + (Data.chara.run[0].w / 2 * Data.setting.chara.rate),
			y    : Data.chara.pos.y + (Data.setting.shot.pos_y * Data.setting.chara.rate),
			w    : this.datas[this.status].w,
			h    : this.datas[this.status].h,
		})
	}

	view(){
		if(!this.bullets.length){return}
		const removes = []
		const collision = this.datas[this.status].collision
		for(let i=0; i<this.bullets.length; i++){
			const bullet = this.bullets[i]
			const img = bullet.img
			const x   = bullet.x
			const y   = bullet.y
			const w   = bullet.w * Data.setting.chara.rate
			const h   = bullet.h * Data.setting.chara.rate
			const cx  = x + collision.min.x * this.rate
			const cy  = y + collision.min.y * this.rate
			const cw  = (collision.max.x - collision.min.x) * this.rate
			const ch  = (collision.max.y - collision.min.y) * this.rate
			Data.ctx.drawImage(img, x, y, w, h)

			// full
			if(Data.setting.shot.line_width){
				Data.ctx.lineWidth = Data.setting.shot.line_width
				Data.ctx.strokeStyle = Data.setting.shot.stroke_style || "transparent"
				Data.ctx.beginPath()
				Data.ctx.rect(x,y,w,h)
				Data.ctx.stroke()
			}

			// collision
			if(Data.setting.shot.collision_width){
				
				Data.ctx.lineWidth = Data.setting.shot.line_width
				Data.ctx.strokeStyle = Data.setting.shot.stroke_style || "transparent"
				Data.ctx.beginPath()
				Data.ctx.rect(cx,cy,cw,ch)
				Data.ctx.stroke()
			}

			// middle-line
			if(Data.setting.shot.middle_line){
				Data.ctx.lineWidth = Data.setting.shot.line_width
				Data.ctx.strokeStyle = Data.setting.shot.stroke_style || "transparent"
				Data.ctx.beginPath()
				Data.ctx.moveTo(x+w, 0)
				Data.ctx.lineTo(x+w, Data.canvas.height)
				Data.ctx.stroke()
			}

			bullet.x += this.speed

			if(x + w > Data.canvas.width){
				removes.push(i)
			}
			else if(Data.enemy.hit_collision({
				x1: cx,
				x2: cx + cw,
				y1: cy,
				y2: cy + ch,
			})){
				console.log("enemy hit !")
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