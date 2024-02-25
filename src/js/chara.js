import { Data }  from "./data.js"

export class Chara{
	chara_num = 0
	speed     = 0
	rate      = 1.0
	pos       = {x:null,y:null}
<<<<<<< HEAD

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
=======
>>>>>>> develop

	jump_flg   = false // ジャンプフラグ
	jump_cnt   = 0     // ジャンプ継続回数
	jump_coef  = 0.15  // ジャンプ時間係数
	jump_acc   = 1     // 重力加速度
	jump_vel   = 0     // 速度
	jump_grab  = 7.8   // 重力加速度
	jump_prev  = null
	

	constructor(){
		this.init()
		this.set_event()
		const x = Data.setting.chara.pos_x
		this.pos = {
			x : x,
			y : 0,
		}
		// console.log(this.pos)
	}

<<<<<<< HEAD
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

=======
	get run(){
		return Data.setting.chara.run
	}
	get shot(){
		return Data.setting.chara.shot
	}

	get pos_x(){
		return Data.setting.chara.pos_x + this.run[0].w / 2
	}

	get build_top(){
		return Data.build.get_current_build_top(this.pos.x)
	}

	get pos_y(){
		const build_top = this.build_top
		if(this.jump_flg){

			// this.pos.y = 0
			// init
			if(this.jump_cnt === 0){
				
			}

			// 終了判定
			else if(this.pos.y > build_top){
				this.pos.y = build_top
				this.jump_flg = false
				this.jump_cnt = 0
			}

			// ２回目以降
			else{
				// 0.5*gravity*time*time - v0*time + HORIZONTAL_Y
				// const y = this.jump_coef * 2 * (this.jump_cnt ** 2) - this.jump_grab * this.jump_cnt
				const y = (this.jump_coef * (this.jump_cnt ** 2) - this.jump_grab * this.jump_cnt)
				// const y = (this.pos.y - this.jump_prev) + 1
				this.pos.y = y
				// this.jump_prev = y
				// if(this.pos.y > build_top){
				// 	this.pos.y = build_top
				// }
			}

			// // 終了判定
			// if(!this.jump_cnt && this.pos.y > build_top){
			// 	this.pos.y = build_top
			// 	this.jump_flg = false
			// 	this.jump_cnt = 0
			// }
			// else{
			// 	this.jump_cnt++
			// }
			this.jump_cnt++
		}

		else if(build_top !== this.pos.y){
			if(this.status !== "fall"){
				this.jump_vel = 0
			}
			this.status = "fall"
			let fall_flg = false
			if(build_top > this.pos.y){
				fall_flg = true
			}
			this.jump_vel += this.jump_grab * this.jump_coef
			this.pos.y += this.jump_vel  * this.jump_coef
			// const diff     = this.jump_vel  * this.jump_coef
			// const diff     = (this.jump_grab * this.jump_coef) * this.jump_coef
			// this.pos.y    += diff
			if(fall_flg && build_top < this.pos.y){
			// if(this.pos.y - build_top <= diff){
				this.status = null
				this.pos.y = build_top
			}
			
		}

		// if(this.pos.y > Data.canvas.height){
		// 	Data.status = "end"
		// }
// console.log(this.status,build_top,this.pos.y)
		return this.pos.y
		// // 通常
		// if(!this.jump_flg){
		// 	// ビルのトップ座標を取得
		// 	return Data.build.get_current_build_top(this.pos_x)
		// }
		// // ジャンプ
		// else{
		// 	return this.jump()
		// }
	}

	// get center_pos(){
	// 	return {
	// 		x: this.pos_x,
	// 		y: this.pos_y,
	// 	}
	// }

	set_rate(){
		Data.setting.chara.rate = (Data.back.height / 2.5) / this.run[0].h
	}

	init(){
		this.set_rate()
	}

	set_event(){
		window.addEventListener("resize"   , this.init.bind(this))
		window.addEventListener("keydown"  , this.key_down.bind(this))
		window.addEventListener("keyup"    , this.key_up.bind(this))
	}

	view(){
		const d   = this.chara_data(this.chara_num)
		const img = d.img
		const x   = this.pos.x
		const y   = this.pos_y
		// const x   = Data.setting.chara.pos_x
		// const y   = this.pos_y
		const w   = d.w * Data.setting.chara.rate
		const h   = d.h * Data.setting.chara.rate
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

		// 落ちてゲームオーバー
		if(this.pos.y > Data.canvas.height){
			Data.status = "end"
		}

		// // 終了判定
		// if(this.jump_flg && this.jump_cnt && this.pos.y >= this.build_top){
		// 	this.pos.y = this.build_top
		// 	this.jump_flg = false
		// 	this.jump_cnt = 0
		// }
	}

	chara_data(num){
		switch(this.status){
			case "shot":
				return Data.setting.chara.shot[num]

			// run
			default:
				return Data.setting.chara.run[num]
		}
	}

	key_down(e){
		if(e.repeat){return}
		// console.log(e.keyCode)
		switch(e.keyCode){
			// jump
			case 32: // space code:"Space"
			case 88: // x code:"KeyX"
				// this.status = "jump"
				if(this.status !== "fall"){
					this.jump_flg = true
					// this.pos.y = 0
				}
				// this.jump_vel = this.pos_y - Data.setting.jump_vel * Data.setting.chara.rate

				// this.jump()
			break

			// shot
			case 90: //z code: "KeyZ"
				this.status = "shot"
				Data.shot.shoot()
			break

			default:
				this.status = null
			break
		}
	}

	key_up(e){
		switch(e.keyCode){
			// jump
			case 32:  // space
			case 88: // x
				// this.status = "jump"
				// this.jump_flg = false
			break

			// shot-cancel
			case 90: //z
				this.status = null
			break

			default:
				this.status = null
			break
		}
	}

	jump(){
		this.jump_vel += this.jump_acc

		return 0
	}

	
>>>>>>> develop
}