import { Data }  from "./data.js"

export class Enemy{
	pattern_num = 0
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
			const data = {
				num : this.random_enemy(),
				pos : this.random_pos(),
			}
			this.enemys.push(data)
		}
		for(const d of this.enemys){
			this.single_view(d)
		}
		this.clear()
	}

	single_view(data){
		const item = Data.setting.enemy.items[data.num]
		const d    = item.pattern[~~this.pattern_num]
		const img  = d.img
		const x    = data.pos.x
		const y    = data.pos.y
		const w    = d.w * this.rate
		const h    = d.h * this.rate
		Data.ctx.drawImage(img, x, y, w, h)

		this.pattern_num += 1 / item.speed
		if(this.pattern_num >= Data.setting.enemy.items[data.num].pattern.length-1){
			this.pattern_num = 0
		}

		data.pos.x -= item.speed
	}

	clear(){
		for(let i=this.enemys.length-1; i>=0; i--){
			const data = this.enemys[i]
			if(data.pos.x >= -Data.setting.enemy.items[data.num].pattern[~~this.pattern_num].w){continue}
			this.enemys.splice(i,1)
		}
	}

	collision(){

	}


}