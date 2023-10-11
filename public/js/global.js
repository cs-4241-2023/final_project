/*Utility Functions*/
export function highlight(obj, spriteName){
	obj.use(sprite(spriteName))
	obj.use(scale(1.05))
}

export function unHighlight(obj, spriteName){
	obj.use(sprite(spriteName))
	obj.use(scale(1))
}

export const global = {
	SPEED: 2,
	DOJO_SPAWN: { x: 380, y: 415 },
	LOBBY_SPAWN: { x: 520, y: 400 },
	SCREEN_SIZE: { width: 1024, height: 640 }
}