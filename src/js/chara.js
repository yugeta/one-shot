/**
 * 自キャラ処理
 */

import { Data }  from "./data.js"

export class Chara{
	chara_num = 0
	speed     = 0
	rate      = 1.0
	pos       = {x:null,y:null}
	size      = {w:null,h:null}

	foot_buffer = 20
	

	constructor(){
		this.init()
		this.set_event()
		const x = Data.setting.chara.pos_x
		this.pos = {
			x : x,
			y : 0,
		}
	}

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

	get jump_h_calc(){
		return this.pos.y - (Data.setting.chara.rate * 150)
	}

	

	get pos_y(){

		// ジャンプ処理
		if(this.jump_flg){

			// // ジャンプ（上昇）
			// if(this.jump_up){
			// 	this.jump_prev = this.pos.y
			// 	this.jump_h -= 1
			// 	this.jump_h = this.jump_h < 0 ? 0 : this.jump_h
			// 	// console.log("jump-up", this.jump_h)
			// 	this.pos.y = this.jump_y()
			// 	this.pos.y = this.pos.y > 0 ? this.pos.y : 0
				
			// }

			// // init１回目
			// if(this.jump_cnt === 0){
			// 	console.log(1)
			// }

			// // 着地判定
			// if(this.pos.y > this.build_top){console.log(111)
			// 	this.jump_prev = this.pos.y
			// 	this.pos.y     = this.build_top
			// 	this.jump_flg  = false
			// 	this.jump_cnt  = 0
			// 	this.jump_h    = this.jump_h_calc
			// 	// console.log(this.pos.y, this.jump_h)
			// }

			// 計算処理
			// else{
				// if(this.jump_up){
				// 	// this.jump_vel += this.jump_grab * this.jump_coef
				// 	// this.pos.y    += this.jump_vel  * this.jump_coef
				// 	// this.jump_h -= Data.setting.chara.rate * 2
				// 	this.jump_h -= Data.setting.chara.rate * this.jump_grab
				// 	// this.jump_h -= (this.jump_coef * (this.jump_cnt ** 2)) * Data.setting.chara.rate
				// 	this.jump_h = this.jump_h < 0 ? 0 : this.jump_h
				// 	// console.log(this.jump_h)
				// }
				// else{
					this.jump_cnt++
				// }

				// const y = (this.jump_coef * (this.jump_cnt ** 2) - this.jump_grab * this.jump_cnt) + (this.jump_h * Data.setting.chara.rate)
				this.jump_prev = this.pos.y
				// this.pos.y = this.jump_y()
				// console.log(this.jump_cnt, this.jump_h)
				// this.pos.y = ((this.jump_coef * (this.jump_cnt ** 2) - this.jump_grab * this.jump_cnt) + this.jump_h) * Data.setting.chara.rate
				// this.pos.y = ((this.jump_coef * (this.jump_cnt ** 2) - this.jump_grab * this.jump_cnt) + this.jump_h) * Data.setting.chara.rate
				this.pos.y -= Data.setting.chara.rate * this.jump_grab / (this.jump_cnt /10)
				// this.jump_vel -= this.jump_grab * this.jump_coef
				// this.pos.y    -= this.jump_vel  * this.jump_coef

				// 上昇終了
				// console.log((this.jump_prev - this.pos.y) , this.jump_prev, this.pos.y)
				// if(this.jump_prev < this.pos.y || this.jump_prev - this.pos.y < Data.setting.chara.rate * this.jump_grab / 10){
				if(this.jump_cnt > 30){
					this.jump_up = false
					this.jump_flg = false
				}
			// }
			
			// console.log(this.jump_cnt,this.pos.y)
		}

		// 落下処理（ジャンプ落下以外の処理）
		else if(this.build_top !== this.pos.y){
			
			if(this.status !== "fall"){
				this.jump_vel = 0
			}
			this.status = "fall"
			let fall_flg = false
			if(this.build_top > this.pos.y - (this.foot_buffer * Data.setting.chara.rate)){
				fall_flg = true
			}
			this.jump_vel += this.jump_grab * this.jump_coef
			this.pos.y    += this.jump_vel  * this.jump_coef

			// 着地処理
			if(fall_flg && this.build_top < this.pos.y){
				this.status   = null
				this.pos.y    = this.build_top
				this.jump_h   = this.jump_h_calc
				this.jump_cnt = 0
				// this.jump_vel = 1
				// console.log(this.pos.y, this.jump_h)
			}
			
		}
		return this.pos.y
	}

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
		const w   = d.w * Data.setting.chara.rate
		const h   = d.h * Data.setting.chara.rate
		this.size = {w : w, h: h}
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

	}

	chara_data(num){
		if(this.jump_flg){
			if(this.jump_prev - this.pos.y > 1){
				switch(this.status){
					case "shot":
						return Data.setting.chara.jump_shot[0]
					default:
						return Data.setting.chara.jump_run[0]
				}
			}
			else if(this.jump_prev - this.pos.y < -1){
				switch(this.status){
					case "shot":
						return Data.setting.chara.jump_shot[2]
					default:
						return Data.setting.chara.jump_run[2]
				}
			}
			else{
				switch(this.status){
					case "shot":
						return Data.setting.chara.jump_shot[1]
					default:
						return Data.setting.chara.jump_run[1]
				}
			}
		}

		switch(this.status){

			case "fall":
				return Data.setting.chara.jump_run[1]

			case "shot":
				return Data.setting.chara.shot[num]

			// run
			default:
				return Data.setting.chara.run[num]
		}
	}

	key_down(e){
		if(e.repeat){return}
		switch(e.keyCode){
			// jump
			case 32: // space code:"Space"
			case 88: // x code:"KeyX"
				if(this.status !== "fall" && !this.jump_flg){
					this.jump_flg = true
					this.jump_up = true
				}
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
			case 32: // space
			case 88: // x
				this.jump_up = false
				this.jump_flg = false
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

	/**
	 * Jump
	 */

	jump_flg   = false // ジャンプフラグ
	jump_cnt   = 0     // ジャンプ継続回数
	jump_coef  = 0.4   // ジャンプ時間係数
	jump_acc   = 1     // 重力加速度
	jump_vel   = 0     // 速度
	jump_grab  = 4.8   // 重力加速度
	jump_prev  = null
	jump_h     = null
	jump_up    = false

	// jump2_v0 = 1960
	// jump2_a  = -9.8
	// jump2_t  = 0.2

	set_jump_h(){

	}

	// jump(){
	// 	this.jump_vel += this.jump_acc

	// 	return 0
	// }

	/**
	 * v = v0 + at
	 * y = v0 * t + 0.5 * a * t^2
	 * （v0 = 初速 , t = 時間 , a = 加速度 , t^2 = tの二乗）
	 */
	// jump_y(){
	// 	// return (this.jump_coef * (this.jump_cnt ** 2) - this.jump_grab * this.jump_cnt) + (this.jump_h * Data.setting.chara.rate)
	// 	const y = (this.jump_coef * (this.jump_cnt ** 2) - this.jump_grab * this.jump_cnt) + this.jump_h
	// 	return y * Data.setting.chara.rate
	// 	// return this.jump2_v0 * this.jump2_t + 0.5 * this.jump2_a * (this.jump2_t ** 2)
	// }

	
}