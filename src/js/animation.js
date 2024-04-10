/**
 * canvasアニメーション用処理
 */

import { Canvas }   from "./canvas.js"
import { Data }     from "./data.js"
import { Gameover } from "./gameover.js"

export class Animation{
	constructor(){
		this.run()
	}

	get rate(){
		return Data.setting.chara.rate
	}

	run(){
		let next_flg = false
		switch(Data.status){
			case "play":
				this.view()
				next_flg = true
			break

			case "end":
			case "pause":
				new Gameover()
			break
			
			case "stop":
				Canvas.clear()
			break
		}

		if(Data.setting.wait){
			setTimeout(this.run.bind(this) , Data.setting.wait)
		}
		else if(next_flg){
			window.requestAnimationFrame(this.run.bind(this))
		}
	}

	view(){
		Canvas.clear()
		Data.bg.view()
		Data.build.view()
		Data.chara.view()
		Data.shot.view()
		Data.enemy.view()
		this.check_collision()
		Canvas.frame_view()
	}

	// collision
	check_collision(){
		// enemy 当たり判定
		if(Data.enemy.enemys.length){
			const chara_pos  = Data.chara.pos
			const chara_size = Data.chara.size
			const chara_body = {
				x1 : chara_pos.x + Data.setting.chara.collision.min.x * this.rate,
				x2 : chara_pos.x + Data.setting.chara.collision.max.x * this.rate,
				y1 : chara_pos.y + Data.setting.chara.collision.min.y * this.rate,
				y2 : chara_pos.y + Data.setting.chara.collision.max.y * this.rate,
			}
			for(const view_enemy of Data.enemy.enemys){
				const enemy_num  = view_enemy.num
				const enemy_pos  = view_enemy.pos
				const enemy_size = {
					w : Data.setting.enemy.items[enemy_num].w,
					h : Data.setting.enemy.items[enemy_num].h,
				}
				const enemy_offset = {
					w : enemy_size.w * 0.3,
					h : enemy_size.h * 0.3,
				}
				const enemy_body = {
					x1 : enemy_pos.x + view_enemy.collision.min.x * this.rate,
					x2 : enemy_pos.x + view_enemy.collision.max.x * this.rate,
					y1 : enemy_pos.y + view_enemy.collision.min.y * this.rate,
					y2 : enemy_pos.y + view_enemy.collision.max.y * this.rate,
				}
				if(chara_body.x1 < enemy_body.x2
				&& chara_body.x2 > enemy_body.x1
				&& chara_body.y1 < enemy_body.y2
				&& chara_body.y2 > enemy_body.y1){
					Data.status = "end"
				}
			}
		}
	}
}