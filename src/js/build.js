import { Data }   from "./data.js"

export class Build{
	scroll_x  = 0
	offset_x  = 0
	items     = []
	builds    = []
	rate      = 1.0
	speed     = 1

	constructor(){
		this.set_speed()
		this.init()
		this.set_event()
	}

	get first_build(){
		const data = Data.images.find(e => e.key === Data.setting.build.items[0].key)
		return data || null
	}

	get main_rate(){
		return Data.setting.build.size_rate
	}

	set_speed(){
		this.speed = Data.speed(Data.setting.build.speed)
	}

	init(){
		this.set_rate()
		this.items = Data.setting.build.items
	}

	set_event(){
		window.addEventListener("resize", this.init.bind(this))
	}

	set_rate(){
		const first_build = this.first_build
		if(!first_build){return}
		this.rate = Data.back.height / first_build.h * this.main_rate
	}

	// 任意の値間でのランダム値を返す
	get_random_range(min, max){
		return Math.floor(Math.random() * (max - min)) + min
	}

	// 複数のビルの種類から１つをランダムで取得
	get_random_pick_build(){
		const build_num  = Math.floor(Math.random() * this.items.length)
		const d = Data.setting.build.items[build_num]
		return {
			key  : d.key,
			img  : d.img,
			w    : d.w,
			h    : d.h,
		}
	}
	get_key2build(key){
		return Data.images.find(e => e.key === key)
	}

	// ----------
	// 表示処理
	view(){
		this.scroll_x += this.speed
		this.offset_x = 0
		this.builds_delete() // 流れすぎたビルを削除
		this.builds_view()   // データ登録のビルを表示
	}

	builds_view(){
		for(const build of this.builds){
			this.build_view(build)
		}
		// ２画面分のビルを作成
		if(this.offset_x < Data.back.width * 2){
			this.build_create()
		}
	}
	build_view(build){
		const pos = {
			x : this.scroll_x + this.offset_x,
			y : Data.diff.height + build.rand,
		}
		Data.ctx.drawImage(
			build.img, 
			pos.x, 
			pos.y,
			build.w * this.rate, 
			build.h * this.rate
		)
		this.offset_x += build.w * this.rate + build.gap * this.rate
	}

	build_create(){
		const rand_build = this.get_random_pick_build()
		rand_build.rand = this.get_random_range(Data.setting.build.height_random.min , Data.setting.build.height_random.max)
		rand_build.gap  = this.get_random_range(Data.setting.build.between_gap_random.min , Data.setting.build.between_gap_random.max)
		this.builds.push(rand_build)
		this.build_view(rand_build)
	}

	builds_delete(){
		if(!this.builds.length){return}
		const x = this.builds[0].w * this.rate + this.builds[0].gap * this.rate
		if(this.scroll_x + x < 0){
			
			this.scroll_x += x
			this.builds.shift()
		}
	}

	get_current_build(chara_pos_x){
		let offset = this.scroll_x
		for(const build of this.builds){
			// build
			offset += build.w * this.rate
			if(offset > chara_pos_x){
				return build
			}
			// gap
			offset += build.gap * this.rate
			if(offset > chara_pos_x){
				return null
			}
		}
	}

	get_current_build_top(chara_pos_x){
		// const pos_x_1 = chara_pos_x + 20
		const pos_x_1 = chara_pos_x + Data.setting.chara.collision_offset_w.min * Data.setting.chara.rate
		const pos_x_2 = chara_pos_x + (Data.setting.chara.run[0].w * Data.setting.chara.rate) - (Data.setting.chara.collision_offset_w.max * Data.setting.chara.rate)
		const height  = Data.setting.chara.run[0].h * Data.setting.chara.rate
		// console.log(pos_x_1,pos_x_2)
		// const top_1   = null
		// const top_2   = null
		// console.log(Data.setting.chara.run[0].h,Data.chara.rate)
		// if(!Data.setting.chara){return Data.canvas.height - Data.setting.chara.run[0].h * Data.setting.chara.rate}
		// console.log(Data.chara)
		const target_build_1 = this.get_current_build(pos_x_1)
		const target_build_2 = this.get_current_build(pos_x_2)
		if(!target_build_1 && !target_build_2){
			// return Data.canvas.height - (Data.setting.chara.run[0].h * Data.setting.chara.rate)
			return Data.canvas.height + height
		}
		else if(target_build_1 && !target_build_2){
			return Data.diff.height + target_build_1.rand - height
		}
		else if(!target_build_1 && target_build_2){
			return Data.diff.height + target_build_2.rand - height
		}
		else if(target_build_1.rand > target_build_2.rand){
			return Data.diff.height + target_build_2.rand - height
		}
		else{
			return Data.diff.height + target_build_1.rand - height
		}
	}

}