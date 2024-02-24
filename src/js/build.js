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
		// console.log(Data.setting.build.items)
		// this.create_builds()
		// this.view()
		
	}

	get first_build(){
		const data = Data.images.find(e => e.key === Data.setting.build.items[0].key)
		return data || null
	}
	// get build(){
	// 	return Data.setting.build
	// }
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
		this.rate = Data.bg.height / first_build.h * this.main_rate
	}

	// create_builds(){
	// 	if(this.is_enough_end_x() === true){return}
	// 	if(this.builds && this.builds.length > 100){return}
	// 	const build = this.get_random_pick_build()
	// 	this.builds.push({
	// 		data : build.data,
	// 		w    : build.w * this.rate,
	// 		h    : build.h * this.rate,
	// 		gap  : this.get_random_range(50 , 150),
	// 		rand : this.get_random_range(10 , 70),
	// 	})
	// 	this.create_builds()
	// }

	// 任意の値間でのランダム値を返す
	get_random_range(min, max){
		return Math.floor(Math.random() * (max - min)) + min
	}

	// // 配置されているビル(map)の右端の座標を取得
	// get_map_end_x(){
	// 	let end_x = 0
	// 	if(this.builds.length){
	// 		for(const build of this.builds){
	// 			end_x += build.w * this.rate + build.gap
	// 		}
	// 	}
	// 	return end_x
	// }

	// // ビルの右端座標が、表示画面の２倍よりも大きい場合は処理をしない
	// is_enough_end_x(){
	// 	const end_x = this.get_map_end_x()
	// 	return Data.bg.width * 2 + this.offset_px < end_x ? true : false
	// }

	// 複数のビルの種類から１つをランダムで取得
	get_random_pick_build(){
		const build_num  = Math.floor(Math.random() * this.items.length)
		return Data.setting.build.items[build_num]
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
		this.build_create()  // 新たにビルを追加
		// for(const build of this.builds){
		// 	const pos = {
		// 		x : this.offset_px * Data.setting.bg.direction + offset + build.gap,
		// 		y : Data.diff.height + Data.bg.height - (Data.bg.height * ((100 - build.rand) / 100)),
		// 		// y : Data.diff.height + build.rand,
		// 		// y : Data.canvas.height /2, 
		// 	}
		// 	// const rate = this.height_rate(build.h)
		// 	Data.ctx.drawImage(
		// 		build.data, 
		// 		pos.x, 
		// 		pos.y,
		// 		build.w * this.rate, 
		// 		build.h * this.rate
		// 	)
		// 	offset += build.w + build.gap
		// }
		// this.offset_px += Data.speed(this.build.speed)
		
	}

	builds_view(){
		if(!this.builds.length){return}
		let offset = 0
		for(const build of this.builds){
				if(build.data){
					this.build_view(build)
				}
				else{
					this.offset_x += build.w
				}
				offset += build.w
		}
		if(offset < Data.bg.width){
			this.build_create()
		}
	}
	build_view(build){
		const pos = {
			// x : this.offset_px * Data.setting.bg.direction + offset,
			x : this.scroll_x + this.offset_x,
			y : Data.diff.height + Data.bg.height - build.h,
		}
		Data.ctx.drawImage(
			build.data, 
			pos.x, 
			pos.y,
			build.w * this.rate, 
			build.h * this.rate
		)
		this.offset_x += build.w * this.rate
	}

	build_create(){
		// if(this.builds.length){return}
		// console.log(this.builds)
		const rand_build = this.get_random_pick_build()
		this.builds.push(rand_build)
		this.build_view(rand_build)

		// gap
		this.builds.push({
			w : this.get_random_range(50 , 150)
		})
	}

	builds_delete(){
		if(!this.builds.length){return}

		// 流れすぎたビルの削除処理
		let flg = 0
		for(const build of this.builds){
			const size  = this.offset_x + build.w * this.rate
			// // const gap = build.gap * this.main_rate
			if(size < 0){
				this.scroll_x += size
				this.builds.shift()
			// 	flg++
			}
			// break
		}

		// // ビルの追加
		// if(flg){
		// 	this.create_builds()
		// }
	}

}