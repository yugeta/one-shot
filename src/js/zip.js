

export class Zip{
	constructor(){
		this.promise = new Promise((resolve,reject)=>{
			this.resolve = resolve
			this.reject  = reject
			this.load_module(this.path_zip)
			this.load_module(this.path_unzip)
		})
		
	}

	path_zip   = "js/zip/zip.min.js"
	path_unzip = "js/zip/unzip.min.js"
	loaded_types = []
	path_data  = "data.zip"

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
		const blob = new Blob([e.target.response], { type: 'application/zip' })  
		const fileReader  = new FileReader();
		fileReader.onload = this.zip_info.bind(this)
		fileReader.readAsArrayBuffer(blob)
	}

	// zip内のファイルをそれぞれ処理する
	zip_info(e){
		const data = e.target.result
		const zipArr = new Uint8Array(data);
    const unzip = new Zlib.Unzip(zipArr);
		const filenames = unzip.getFilenames();
		// console.log(filenames)
		this.set_files(filenames)
	}

	set_files(files){
		for(const file of files){

		}
	}

	finish(){
		this.resolve()
	}
}