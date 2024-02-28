export class Data{
	static canvas  = document.getElementById("game")
	static ctx     = document.getElementById("game").getContext("2d")

	// data/setting.json
	static setting = {}

	// image files
	static images  = []

	// canvas paramater
	static bg = {
		width  : null,
		height : null,
	}
	static diff = {
		width  : null,
		height : null,
	}

	// animation status
	static status  = "play"

	// calc speed
	static speed(speed=1){
		return speed * Data.setting.speed * Data.setting.bg.direction
	}

	// 各種の画像データ初期設定
	static set_groups(){
		this.set_group_bg()
		this.set_group_build()
		this.set_group_shot()
		this.set_group_chara()
	}

	static set_group_bg(){
		for(const layer of Data.setting.bg.layers){
			const img_data = Data.images.find(e => e.key === layer.key)
			layer.img = img_data.data
			layer.w   = img_data.w
			layer.h   = img_data.h
		}
	}

	static set_group_build(){
		for(const item of Data.setting.build.items){
			const data = Data.images.find(e => e.key === item.key)
			if(!data){continue}
			item.img  = data.data
			item.w    = data.w
			item.h    = data.h
		}
	}

	static set_group_shot(){
		for(const key in Data.setting.shot.items){
			const data = Data.images.find(e => e.key === key)
			const item = Data.setting.shot.items[key]
			item.key = key
			item.img = data.data
			item.w   = data.w
			item.h   = data.h
		}
	}

	static set_group_chara(){
		// run
		for(const d of Data.setting.chara.run){
			const key = d.key
			const data = Data.images.find(e => e.key === key)
			if(!data){continue}
			d.img = data.data
			d.w   = data.w
			d.h   = data.h
		}
		// shot
		for(const d of Data.setting.chara.shot){
			const key = d.key
			const data = Data.images.find(e => e.key === key)
			if(!data){continue}
			d.img = data.data
			d.w   = data.w
			d.h   = data.h
		}
		// jump_run
		for(const d of Data.setting.chara.jump_run){
			const key = d.key
			const data = Data.images.find(e => e.key === key)
			if(!data){continue}
			d.img = data.data
			d.w   = data.w
			d.h   = data.h
		}
		// jump_shot
		for(const d of Data.setting.chara.jump_shot){
			const key = d.key
			const data = Data.images.find(e => e.key === key)
			if(!data){continue}
			d.img = data.data
			d.w   = data.w
			d.h   = data.h
		}
	}

}