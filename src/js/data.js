
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
		return Data.setting.speed * speed
	}
}