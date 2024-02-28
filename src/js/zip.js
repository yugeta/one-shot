import { Data }    from "./data.js"

export class Zip{
	constructor(){
		this.promise = new Promise((resolve,reject)=>{
			this.resolve = resolve
			this.reject  = reject
			this.load_module(this.path_zip)
			this.load_module(this.path_unzip)
		})
	}

	path_zip     = "js/zip/zip.min.js"
	path_unzip   = "js/zip/unzip.min.js"
	loaded_types = []
	path_data    = "img.zip"

	// zip.jsとunzip.jsを読み込む
	load_module(file){
		const script = document.createElement("script")
		script.src = file
		script.onload = this.loaded_module.bind(this, file)
		document.head.appendChild(script)
	}

	loaded_module(type,e){
		this.loaded_types.push(type)
		if(this.loaded_types.indexOf(this.path_zip) === -1
		|| this.loaded_types.indexOf(this.path_unzip) === -1){return}
		
		this.load_data()
	}

	// data.zipの読み込み
	load_data(){
		const xhr = new XMLHttpRequest()
		xhr.withCredentials = true;
		xhr.open('GET' , this.path_data , true)
		xhr.responseType = "arraybuffer" 
		xhr.onload = this.loaded_data.bind(this)
		xhr.send()
	}

	loaded_data(e){
		const blob        = new Blob([e.target.response], { type: 'application/zip' })  
		const fileReader  = new FileReader();
		fileReader.onload = this.zip_info.bind(this)
		fileReader.readAsArrayBuffer(blob)
	}

	// zip内のファイルをそれぞれ処理する
	async zip_info(e){
		const data      = e.target.result
		const zipArr    = new Uint8Array(data);
    const unzip     = new Zlib.Unzip(zipArr);
		this.unzip      = unzip
		const filenames = unzip.getFilenames();
// console.log(filenames)
		// this.set_files(filenames)
		await this.set_images(filenames)
		Data.set_groups()
		this.finish()
	}

	set_files(filenames){
		for(const path of filenames){
			if(!path){continue}
			const name = path.split("/").pop()
			if(!name){continue}
			const ext = name.split(".").pop()
			if(name === "setting.json"){
				Data.setting = this.set_setting_json(path)
				break
			}
		}
	}

	async set_images(){
		const image_keys = Object.keys(Data.setting.images)
		for(const key of image_keys){
			const path = Data.setting.images[key]
			const name = path.split("/").pop()
			const ext  = name.split(".").pop()
			switch(ext){
				case "webp":
				case "jpg":
				case "png":
				case "gif":
				// case "svg":
					await this.set_image(key, path, `image/${ext}`)
				break

				case "svg":
					// this.set_svg(key, path)
					await this.set_image(key, path, "image/svg+xml")
				break
			}
		}
	}

	// setting.jsonファイルの読み込み
	set_setting_json(path){
		const buf    = this.unzip.decompress(path)
		const txt    = new TextDecoder().decode(buf)
		return JSON.parse(txt)
	}

	// 
	async set_image(key,path,mime){
		const unit = this.unzip.decompress(path)
		const blob = new Blob([unit], {type: mime})
		const url  = URL.createObjectURL(blob)
		const img  = await this.create_image(url)
		Data.images.push({
			key  : key,
			data : img,
			w    : img.naturalWidth,
			h    : img.naturalHeight,
		})
	}

	async create_image(url){
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = url
      img.onload  = (e => resolve(e.target))
      img.onerror = (e => resolve(null)) // 画像じゃない場合は、nullを返す
    })
  }

	finish(){
		this.resolve()
	}
}