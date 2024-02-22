import { Data } from "./data.js"

export class Chara{
	chara_num = 0
	speed     = 0

	constructor(){
		this.run = this.data_run()
		this.init()
	}

	data_run(){
		const datas = []
		for(const d of Data.setting.chara.run){
			const key = d.key
			const data = Data.images.find(e => e.key === key)
			if(!data){continue}
			datas.push({
				key : key,
				img : data.data,
				w   : data.w * Data.rate,
				h   : data.h * Data.rate,
			})
		}
		return datas
	}

	data_shot(){
		return Data.setting.chara.shot
	}

	init(){

	}

	view(){
		const d = this.chara_data(this.chara_num)
		Data.ctx.drawImage(
			d.img, 
			100, 
			100,
			d.w, 
			d.h
		)
		if(this.speed % Data.setting.chara.speed === 0){
			this.chara_num++
			this.chara_num = this.chara_num < this.run.length ? this.chara_num : 0
		}
		this.speed++
	}

	chara_data(num){
		return this.run[num]
	}

	animation(){

	}

}