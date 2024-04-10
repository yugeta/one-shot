import { Data }  from "./data.js"

export class Enemy{
	enemys = []
	max_count = 2

	constructor(){
		this.init()
	}

	// 表示サイズの割合
	get rate(){
		return Data.setting.chara.rate
	}

	// 新たに敵を出現させるかどうかの判定
	get is_create(){
		if(this.enemys.length >= this.max_count){
			return false
		}
		if(this.enemys.length && this.enemys[this.enemys.length-1].pos.x > Data.canvas.width / this.max_count){
			return false
		}
		return true
	}

	init(){
		for(const enemy of Data.setting.enemy.items){
			for(const img_data of enemy.pattern){
				const data = Data.images.find(e => e.key === img_data.key)
				img_data.img = data.data
				img_data.w   = data.w
				img_data.h   = data.h
			}
		}
	}

	random_enemy(){
		return Math.floor(Math.random() * Data.setting.enemy.items.length)
	}

	random_pos(){
		return {
			x : Data.canvas.width,
			y : Math.floor(Math.random() * Data.diff.height),
		}
	}

	view(){
		if(this.is_create){
			const num = this.random_enemy()
			this.enemys.push({
				num : num,
				pos : this.random_pos(),
				collision : Data.setting.enemy.items[num].collision,
				pattern_num : 0,
			})
		}
		for(const d of this.enemys){
			this.single_view(d)
		}
		this.clear()
	}

	single_view(data){
		const item = Data.setting.enemy.items[data.num]
		const d    = item.pattern[~~data.pattern_num]
		const img  = d.img
		const x    = data.pos.x
		const y    = data.pos.y
		const w    = d.w * this.rate
		const h    = d.h * this.rate
		item.w = w
		item.h = h
		Data.ctx.drawImage(img, x, y, w, h)

		data.pattern_num += 1 / item.speed
		if(data.pattern_num >= Data.setting.enemy.items[data.num].pattern.length-1){
			data.pattern_num = 0
		}

		if(Data.setting.enemy.line_width){
			// frame
			Data.ctx.lineWidth = Data.setting.enemy.line_width
			Data.ctx.strokeStyle = Data.setting.enemy.stroke_style || "transparent"
			Data.ctx.beginPath()
			Data.ctx.rect(x,y,w,h)
			Data.ctx.stroke()
		}

		if(Data.setting.enemy.collision_width){
			// frame
			Data.ctx.lineWidth = Data.setting.enemy.line_width
			Data.ctx.strokeStyle = Data.setting.enemy.stroke_style || "transparent"
			Data.ctx.beginPath()
			Data.ctx.rect(
				x + item.collision.min.x * this.rate,
				y + item.collision.min.y * this.rate,
				(item.collision.min.x + item.collision.max.x) * this.rate,
				(item.collision.min.y + item.collision.max.y) * this.rate
			)
			Data.ctx.stroke()
		}

		if(Data.setting.enemy.middle_line){
			Data.ctx.lineWidth = Data.setting.enemy.line_width
			Data.ctx.strokeStyle = Data.setting.enemy.stroke_style || "transparent"
			Data.ctx.beginPath()
			Data.ctx.moveTo(x+w/2, 0)
			Data.ctx.lineTo(x+w/2, Data.canvas.height)
			Data.ctx.stroke()
		}

		data.pos.x -= item.speed
	}

	clear(){
		for(let i=this.enemys.length-1; i>=0; i--){
			const data = this.enemys[i]
			if(data.pos.x >= -Data.setting.enemy.items[data.num].pattern[~~data.pattern_num].w){continue}
			this.enemys.splice(i,1)
		}
	}

	hit_collision(shot){
		for(let i=this.enemys.length-1; i>=0; i--){
			const data = this.enemys[i]
			const item = Data.setting.enemy.items[data.num]
			const d    = item.pattern[~~data.pattern_num]
			const enemy = {
				x1 : data.pos.x + item.collision.min.x * this.rate,
				x2 : data.pos.x + d.w * this.rate + item.collision.max.x * this.rate,
				y1 : data.pos.y + item.collision.min.y * this.rate,
				y2 : data.pos.y + d.h * this.rate + item.collision.max.y * this.rate,
			}
			if(shot.x1 < enemy.x2
			&& shot.x2 > enemy.x1
			&& shot.y1 < enemy.y2
			&& shot.y2 > enemy.y1){
				this.enemys.splice(i,1)
				return true
			}
		}
	}
}