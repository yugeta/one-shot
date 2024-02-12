import { Init }      from "./init.js"
import { Load }      from "./load.js"
import { Canvas }    from "./canvas.js"
import { Animation } from "./animation.js"

class Main{
	constructor(){
		new Load().promise.then(()=> this.loaded())
		new Init()
	}

	loaded(){
		new Canvas()
		new Animation()
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