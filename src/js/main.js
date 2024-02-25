import { Load }      from "./load.js"
import { Canvas }    from "./canvas.js"
import { Animation } from "./animation.js"
import { Event }     from "./event.js"
import { Data }      from "./data.js"
import { Bg }        from "./bg.js"
import { Build }     from "./build.js"
import { Chara }     from "./chara.js"
import { Shot }      from "./shot.js"

class Main{
	constructor(){
		new Load().promise.then(()=> this.loaded())
		new Event()
	}

	loaded(){
		new Canvas()
		Data.bg    = new Bg()
		Data.build = new Build()
		Data.chara = new Chara()
		Data.shot  = new Shot()
		new Animation()

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