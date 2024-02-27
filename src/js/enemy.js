import { Data }  from "./data.js"

export class Enemy{
	pattern_num = 0

	constructor(){
		this.init()
	}

	get rate(){
		return Data.setting.chara.rate
	}


	init(){
		for(const enemy of Data.setting.enemy.items){
			const data = Data.images.find(e => e.key === enemy.key)
			enemy.img = data.data
			enemy.w   = data.w
			enemy.h   = data.h
		}
	}

	speed(){
		return 1 / Data.setting.enemy.speed
	}

	view(){
		const d   = Data.setting.enemy.items[~~this.pattern_num]
		const img = d.img
		const x   = Data.canvas.width - 150
		const y   = 100
		const w   = d.w * this.rate
		const h   = d.h * this.rate
		Data.ctx.drawImage(img, x, y, w, h)

		this.pattern_num += this.speed()
		if(this.pattern_num >= Data.setting.enemy.items.length-1){
			this.pattern_num = 0
		}
	}

}