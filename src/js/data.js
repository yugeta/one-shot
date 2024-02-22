
export class Data{
	static canvas  = document.getElementById("game")
	static ctx     = document.getElementById("game").getContext("2d")

	static setting = {}
	static images  = []

	static status  = "play"

	static speed(speed=1){
		return Data.setting.speed * speed
	}
}