/**
 * canvasアニメーション用処理
 */

import { Canvas } from "./canvas.js"
// import { Bg }     from "./bg.js"
// import { Build }  from "./build.js"
// import { Chara }  from "./chara.js"
import { Data }   from "./data.js"

export class Animation{
	constructor(){
		// this.bg    = new Bg()
		// this.build = new Build()
		// this.chara = new Chara()
		this.run()
	}

	run(){
		switch(Data.status){
			case "play":
				this.view()
			break

			case "end":
			case "pause":
				// console.log("end")
			break
			
			case "stop":
				Canvas.clear()
			break
		}

		if(Data.setting.wait){
			setTimeout(this.run.bind(this) , Data.setting.wait)
		}
		else{
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
				x1 : chara_pos.x,
				x2 : chara_pos.x + chara_size.w,
				y1 : chara_pos.y,
				y2 : chara_pos.y + chara_size.h,
			}
			// const chara_body = {
			// 	x1 : chara_pos.x + chara_size.w / 2,
			// 	x2 : chara_pos.x + chara_size.w / 2,
			// 	y1 : chara_pos.y,
			// 	y2 : chara_pos.y + chara_size.h,
			// }
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
					x1 : enemy_pos.x,
					x2 : enemy_pos.x + enemy_size.w,
					y1 : enemy_pos.y,
					y2 : enemy_pos.y + enemy_size.h,
				}
				// console.log(chara_pos,chara_size,enemy_pos,enemy_size)
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