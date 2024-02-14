import { Data }     from "./data.js"

export class Init{
	constructor(){
		this.rate()
	}

	rate(){
		const key  = Data.setting.bg.layers[0].key
		const rate = Data.setting.bg.layers[0].height_rate
		const data = Data.images.find(e => e.key === key)
		if(data){
			Data.rate = Data.canvas.height * rate / data.h
			console.log( Data.canvas.height , rate , data.h, Data.rate)
		}
		else{
			Data.rate = 1
		}
	}
}
