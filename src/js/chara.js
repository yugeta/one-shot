import { Data }  from "./data.js"

export class Chara{
	chara_num = 0
	speed     = 0
	rate      = 1.0
	pos       = {x:null,y:null}

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
		const d   = this.chara_data(this.chara_num)
		const img = d.img
		const x   = Data.setting.chara.pos_x
		const y   = this.pos_y()
		const w   = d.w * this.rate
		const h   = d.h * this.rate
		Data.ctx.drawImage(img, x, y, w, h)
		if(this.speed % Data.setting.chara.speed === 0){
			this.chara_num++
			this.chara_num = this.chara_num < this.run.length ? this.chara_num : 0
		}
		this.speed++

		if(Data.setting.chara.line_width){
			// frame
			Data.ctx.lineWidth = Data.setting.chara.line_width
			Data.ctx.strokeStyle = Data.setting.chara.stroke_style || "transparent"
			Data.ctx.beginPath()
			Data.ctx.rect(x,y,w,h)
			Data.ctx.stroke()
			// middle-line
			Data.ctx.beginPath()
			Data.ctx.moveTo(x+w/2, 0)
			Data.ctx.lineTo(x+w/2, Data.canvas.height)
			Data.ctx.stroke()
		}
	}

	chara_data(num){
		return this.run[num]
	}

	animation(){

	}

	current_pos(){
		return Data.setting.chara.pos_x + this.run[0].w / 2
	}

	pos_y(){
		const current_build = Data.build.get_current_build(this.current_pos())
		if(!current_build){
			return Data.canvas.height - (this.run[0].h * this.rate)
		}
		// console.log(current_build.key)
		const build_y = Data.diff.height + current_build.rand - (this.run[0].h * this.rate)
		return build_y
	}

	collision(){

	}

	shot(){

	}

}