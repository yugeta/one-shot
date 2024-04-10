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

	get data(){
		return this.chara_data(this.chara_num)
	}

	get pos_y(){
		// ジャンプ処理
		if(this.jump_flg){
			this.jump_cnt++
			this.jump_prev = this.pos.y
			this.pos.y -= Data.setting.chara.rate * this.jump_grab / (this.jump_cnt /10)
			if(this.jump_cnt > 30){
				this.jump_up = false
				this.jump_flg = false
			}
		}

		// 落下処理（ジャンプ落下以外の処理）
		else if(this.build_top !== this.pos.y){
			if(!this.fall_flg){
				this.fall_flg = true
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
				this.fall_flg   = null
				this.status = null
				this.pos.y    = this.build_top
				this.jump_cnt = 0
			}
			else if(this.pos.y >= Data.canvas.height - this.data.h * Data.setting.chara.rate){
				this.fall_flg   = null
				this.status = null
				this.pos.y    = Data.canvas.height - this.data.h * Data.setting.chara.rate
				this.jump_cnt = 0
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
		const d   = this.data
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

		// full
		if(Data.setting.chara.line_width){
			// frame
			Data.ctx.lineWidth = Data.setting.chara.line_width
			Data.ctx.strokeStyle = Data.setting.chara.stroke_style || "transparent"
			Data.ctx.beginPath()
			Data.ctx.rect(x,y,w,h)
			Data.ctx.stroke()
		}

		// collision
		if(Data.setting.chara.collision_width){
			// frame
			Data.ctx.lineWidth = Data.setting.chara.line_width
			Data.ctx.strokeStyle = Data.setting.chara.stroke_style || "transparent"
			Data.ctx.beginPath()
			Data.ctx.rect(
				x + Data.setting.chara.collision.min.x * Data.setting.chara.rate,
				y + Data.setting.chara.collision.min.y * Data.setting.chara.rate,
				(Data.setting.chara.collision.max.x - Data.setting.chara.collision.min.x) * Data.setting.chara.rate,
				(Data.setting.chara.collision.max.y - Data.setting.chara.collision.min.y) * Data.setting.chara.rate
			)
			Data.ctx.stroke()
		}

		// middle-line
		if(Data.setting.chara.middle_line){
			Data.ctx.lineWidth = Data.setting.chara.line_width
			Data.ctx.strokeStyle = Data.setting.chara.stroke_style || "transparent"
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
				if(!this.fall_flg && !this.jump_flg){
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

			// shot
			case 90: //z
				// this.status = null
			break

			default:
				this.status = null
			break
		}
	}

	/**
	 * Jump setting
	 */
	jump_flg   = false // ジャンプフラグ
	fall_flg   = null  // 落ちフラグ
	jump_up    = false // ジャンプ上昇フラグ
	jump_cnt   = 0     // ジャンプ継続回数
	jump_coef  = 0.4   // ジャンプ時間係数
	jump_acc   = 1     // 重力加速度
	jump_vel   = 0     // 速度
	jump_grab  = 4.8   // 重力加速度
	jump_prev  = null
}