import { Data }   from "./data.js"

export class Build{
	offset_px = 0
	builds    = []
	gap       = 50

	constructor(){
		this.init()
		this.create_builds()
		this.view()
		console.log(this.builds)
	}

	init(){
		for(const item of Data.setting.build.items){
			const data = Data.images.find(e => e.key === item.key)
			if(!data){continue}
			const rate = this.height_rate(data.h)
			item.data  = data.data
			item.w     = data.w * rate
			item.h     = data.h * rate
		}
	}

	height_rate(img_size_h){
		return Data.canvas.height / img_size_h * 0.8
	}

	create_builds(){
		if(this.is_enough_end_x() === true){return}
		if(this.builds && this.builds.length > 100){return}
		const build = this.get_random_pick_build()
		this.builds.push({
			data : build.data,
			w    : build.w,
			h    : build.h,
			gap  : this.get_random_range(50 , 150),
			size : this.get_random_range(10 , 70),
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
				end_x += build.w + build.gap
			}
		}
		return end_x
	}

	// ビルの右端座標が、表示画面の２倍よりも大きい場合は処理をしない
	is_enough_end_x(){
		const end_x = this.get_map_end_x()
		return Data.canvas.width * 2 + this.offset_px < end_x ? true : false
	}

	// 複数のビルの種類から１つをランダムで取得
	get_random_pick_build(){
		const build_num =  Math.floor(Math.random() * Data.setting.build.items.length)
		return Data.setting.build.items[build_num]
	}

	// ----------
	// 表示処理
	view(){
		let offset = 0
		this.rebuild_builds()
		for(const build of this.builds){
			Data.ctx.drawImage(
				build.data, 
				this.offset_px * Data.setting.bg.direction + offset + build.gap, 
				// Data.canvas.height /2, 
				Data.canvas.height * ((100 - build.size) / 100),
				build.w, 
				build.h
			)
			offset += build.w + build.gap
		}
		this.offset_px += Data.setting.build.speed
	}

	rebuild_builds(){
		if(!this.builds.length){return}

		// 流れすぎたビルの削除処理
		let flg = 0
		for(let i=0; i<this.builds.length; i++){
			const build = this.builds[i]
			if(this.offset_px >= build.w + build.gap){
// console.log(this.offset_px,build.w , build.gap)
				this.offset_px -= build.w + build.gap
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