import { Data } from "./data.js"

export class Chara{
	chara_num = 0
	speed     = 0
	rate      = 1.0

	constructor(){
		this.run = this.data_run()
		this.init()
		this.set_event()
	}

	set_rate(){
		this.rate = (Data.back.height / 2.5) / this.run[0].h
	}

	// 走りモーション
	data_run(){
		const datas = []
		for(const d of Data.setting.chara.run){
			const key = d.key
			const data = Data.images.find(e => e.key === key)
			if(!data){continue}
			datas.push({
				key : key,
				img : data.data,
				w   : data.w,
				h   : data.h,
			})
		}
		return datas
	}

	data_shot(){
		return Data.setting.chara.shot
	}

	init(){
		this.set_rate()
	}

	set_event(){
		window.addEventListener("resize", this.init.bind(this))
	}

	view(){
		const d = this.chara_data(this.chara_num)
		Data.ctx.drawImage(
			d.img, 
			100, 
			100,
			d.w * this.rate, 
			d.h * this.rate
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

	collision(){

	}

	shot(){

	}

}