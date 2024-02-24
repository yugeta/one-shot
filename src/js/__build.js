import { Data }   from "./data.js"

export class Build{
	offset_px = 0
	builds    = []
	rate      = 1.0
	items     = []

	constructor(){
		this.init()
		this.create_builds()
		this.view()
		
	}

	get first_build(){
		const data = Data.images.find(e => e.key === this.build.items[0].key)
		return data || null
	}
	get build(){
		return Data.setting.build
	}
	get main_rate(){
		return this.build.size_rate
	}

	init(){
		this.rate = this.height_rate(this.first_build.h)
		for(const item of this.build.items){
			const data = Data.images.find(e => e.key === item.key)
			if(!data){continue}
			item.data  = data.data
			item.w     = data.w
			item.h     = data.h
		}
	}

	height_rate(img_size_h){
		console.log(Data.bg.height,img_size_h,this.main_rate)
		return Data.bg.height / img_size_h * this.main_rate
	}

	create_builds(){
		if(this.is_enough_end_x() === true){return}
		if(this.builds && this.builds.length > 100){return}
		const build = this.get_random_pick_build()
		this.builds.push({
			data : build.data,
			w    : build.w * this.rate,
			h    : build.h * this.rate,
			gap  : this.get_random_range(50 , 150),
			rand : this.get_random_range(10 , 70),
		})
		this.create_builds()
	}

	// 任意の値間でのランダム値を返す
	get_random_range(min, max){
		return Math.floor(Math.random() * (max - min)) + min
	}

	// 配置されているビル(map)の右端の座標を取得
	get_map_end_x(){
		let end_x = 0
		if(this.builds.length){
			for(const build of this.builds){
				end_x += build.w * this.rate + build.gap
			}
		}
		return end_x
	}

	// ビルの右端座標が、表示画面の２倍よりも大きい場合は処理をしない
	is_enough_end_x(){
		const end_x = this.get_map_end_x()
		return Data.bg.width * 2 + this.offset_px < end_x ? true : false
	}

	// 複数のビルの種類から１つをランダムで取得
	get_random_pick_build(){
		const build_num =  Math.floor(Math.random() * this.items.length)
		return this.items[build_num]
	}

	// ----------
	// 表示処理
	view(){
		let offset = 0
		this.rebuild_builds()
		for(const build of this.builds){
			const pos = {
				x : this.offset_px * Data.setting.bg.direction + offset + build.gap,
				y : Data.diff.height + Data.bg.height - (Data.bg.height * ((100 - build.rand) / 100)),
				// y : Data.diff.height + build.rand,
				// y : Data.canvas.height /2, 
			}
			// const rate = this.height_rate(build.h)
			Data.ctx.drawImage(
				build.data, 
				pos.x, 
				pos.y,
				build.w * this.rate, 
				build.h * this.rate
			)
			offset += build.w + build.gap
		}
		this.offset_px += Data.speed(this.build.speed)
	}

	rebuild_builds(){
		if(!this.builds.length){return}

		// 流れすぎたビルの削除処理
		let flg = 0
		for(let i=0; i<this.builds.length; i++){
			const build = this.builds[i]
			const gap = build.gap * this.main_rate
			if(this.offset_px >= build.w + gap){
				this.offset_px -= build.w + gap
				this.builds.shift()
				flg++
			}
			break
		}

		// ビルの追加
		if(flg){
			this.create_builds()
		}
	}

}