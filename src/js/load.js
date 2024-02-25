import { Data } from "./data.js"

export class Load{
	load_image_num = 0
	images = {}

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
			this.load_images()
		}
		else{
			this.finish()
		}
	}

	load_images(){
		const image_keys = Object.keys(Data.setting.images)
// console.log(image_keys)
		if(!image_keys || !image_keys.length){
			this.loaded_images()
			return
		}
		this.key = image_keys[this.load_image_num]
		if(!this.key){
			this.loaded_images()
			return
		}
		const path = Data.setting.images[this.key]
		this.load_image(path)
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

	finish(){
		// console.log("images",Data.images)
		this.resolve()
	}

}
