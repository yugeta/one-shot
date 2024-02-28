// import { Load }      from "./load.js"
import { Canvas }    from "./canvas.js"
import { Animation } from "./animation.js"
import { Event }     from "./event.js"
import { Data }      from "./data.js"
import { Bg }        from "./bg.js"
import { Build }     from "./build.js"
import { Chara }     from "./chara.js"
import { Shot }      from "./shot.js"
import { Enemy }     from "./enemy.js"
import { Zip }       from "./zip.js"
import { Loading }   from "./loading/loading.js"

class Main{
	constructor(){
		this.load()
		new Event()
	}


	load(){
		new Loading()
		Loading.set_status("loading")
		new Zip().promise.then(()=> {
			this.loaded()
		})
		// new Load().promise.then(()=> this.loaded())
	}

	loaded(){
		new Canvas()
		Data.bg    = new Bg()
		Data.build = new Build()
		Data.chara = new Chara()
		Data.shot  = new Shot()
		Data.enemy = new Enemy()
		
		setTimeout((()=>{
			Loading.set_status("passive")
			new Animation()
		}),1000)
		
		// setTimeout((()=>{Data.status = "pause"}) , 1000)
	}
}

switch(document.readyState){
	case "complete":
	case "interactive":
		new Main()
	break

	default:
		window.addEventListener("DOMContentLoaded" , (()=>new Main()))
}