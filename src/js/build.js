import { Data }   from "./data.js"

export class Build{
	scroll_x  = 0
	offset_x  = 0
	items     = []
	builds    = []
	rate      = 1.0
	speed     = 1

	constructor(){
		this.set_item_datas()
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

	set_item_datas(){
		for(const item of Data.setting.build.items){
			const data = Data.images.find(e => e.key === item.key)
			if(!data){continue}
			item.data  = data.data
			item.w     = data.w
			item.h     = data.h
		}
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
			data : d.data,
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
			build.data, 
			pos.x, 
			pos.y,
			build.w * this.rate, 
			build.h * this.rate
		)
		this.offset_x += build.w * this.rate + build.gap * this.rate
	}

	build_create(){
		const rand_build = this.get_random_pick_build()
		rand_build.rand = this.get_random_range(10 , 70)
		rand_build.gap  = this.get_random_range(10 , 80)
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

}