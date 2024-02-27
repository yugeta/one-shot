import { Data }    from "./data.js"
import { Loading } from "./loading/loading.js"

export class Load{
	load_image_num = 0
	images = {}
	load_total_count = 0

	constructor(){
		this.promise = new Promise((resolve,reject) => {
			this.resolve = resolve
			this.reject  = reject
			this.load_setting()
		})
	}
	load_setting(){
		const xhr = new XMLHttpRequest()
		xhr.withCredentials = true;
		xhr.open('GET' , "data/setting.json" , true)
		xhr.setRequestHeader("Content-Type", "text/json");
		xhr.onload = this.loaded_setting.bind(this)
		xhr.send()
	}
	loaded_setting(e){
		Data.setting = JSON.parse(e.target.response) || {}

		if(Data.setting.images){
			this.load_total_count = Data.setting.images.length
			this.load_images()
		}
		else{
			this.finish()
		}
	}

	load_images(){
		const image_keys = Object.keys(Data.setting.images)
		if(!image_keys || !image_keys.length){
			this.loaded_images()
			return
		}
		
		this.key = image_keys[this.load_image_num]
		if(!this.key){
			this.loaded_images()
			return
		}
		console.log(this.load_image_num / (image_keys.length-1))
		Loading.set_rate(this.load_image_num / (image_keys.length-1) * 100)
		const path = Data.setting.images[this.key]
		// this.load_image(path)
		// setTimeout(this.load_image.bind(this,path) , 100)
		requestAnimationFrame(this.load_image.bind(this,path))
	}

	load_image(path){
		const img = new Image()
		img.src = path
		img.onload = this.loaded_image.bind(this)
	}

	loaded_image(e){
		Data.images.push({
			key  : this.key,
			data : e.target,
			w    : e.target.naturalWidth,
			h    : e.target.naturalHeight,
		})
		this.load_image_num++
		this.load_images()
	}

	loaded_images(){
		// console.log(Data.images)
		this.finish()
	}

	set_groups(){
		this.set_group_bg()
		this.set_group_build()
		this.set_group_shot()
		this.set_group_chara()
	}

	set_group_bg(){
		for(const layer of Data.setting.bg.layers){
			const img_data = Data.images.find(e => e.key === layer.key)
			layer.img = img_data.data
			layer.w   = img_data.w
			layer.h   = img_data.h
		}
	}

	set_group_build(){
		for(const item of Data.setting.build.items){
			const data = Data.images.find(e => e.key === item.key)
			if(!data){continue}
			item.img  = data.data
			item.w    = data.w
			item.h    = data.h
		}
	}

	set_group_shot(){
		for(const key in Data.setting.shot.items){
			const data = Data.images.find(e => e.key === key)
			const item = Data.setting.shot.items[key]
			item.key = key
			item.img = data.data
			item.w   = data.w
			item.h   = data.h
		}
	}

	set_group_chara(){
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

	finish(){
		// console.log("images",Data.images)
		this.set_groups()
		this.resolve()
	}

}
