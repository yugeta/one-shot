// import { Init }      from "./init.js"
import { Load }      from "./load.js"
import { Canvas }    from "./canvas.js"
import { Animation } from "./animation.js"
import { Event }     from "./event.js"
// import { Chara }     from "./chara.js"
import { Data }     from "./data.js"

class Main{
	constructor(){
		new Load().promise.then(()=> this.loaded())
		new Event()
	}

	loaded(){
		new Canvas()
		// new Init()
		new Animation()
		// new Chara()

		// console.log(Data.images)
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