/*Utility Functions*/
export function highlight(obj, spriteName, scaleVal = 1.05){
	obj.use(sprite(spriteName))
	obj.use(scale(scaleVal))
}

export function unHighlight(obj, spriteName, scaleVal = 1){
	obj.use(sprite(spriteName))
	obj.use(scale(scaleVal))
}

export const global = {
	SPEED: 150,
	DOJO_SPAWN: { x: 380, y: 415 },
	LOBBY_SPAWN: { x: 520, y: 400 },
	SCREEN_SIZE: { width: 1024, height: 640 },
	CURRENT_PUFFLE: "puffle-red"
}

export function setPuffle(puffleName) {
	global.CURRENT_PUFFLE = puffleName
}