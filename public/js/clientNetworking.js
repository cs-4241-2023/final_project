/**
 * A singleton class that helps manage the Socket.IO connection with the server.
 * Use SocketNetwork.getConnection() to use this class.
 */
class NetworkManager {

	static #instance
	static #isInternalConstructing
	static getConnection() {
		// Only ever creates one instance of this class
		if(NetworkManager.#instance == undefined) {
			NetworkManager.#isInternalConstructing = true
			NetworkManager.#instance = new NetworkManager()
		}
		return NetworkManager.#instance
	}

	#socket
	constructor() {
		// Prevents outside construction to ensure singleton
		if (!NetworkManager.#isInternalConstructing) {
			throw new TypeError("NetworkManager is not constructable");
		}
		NetworkManager.#isInternalConstructing = false;

		// Class initialization start
		this.#socket = io()
		this.#socket.on('setID', function(newID) {
			this.id = newID
			this.emit('movement', {id: newID, msg: puffle.pos})
		})

		this.#socket.on('spawn', (players) => {
			for (const [id, pos] of Object.entries(players)) {
				spawnRemotePlayer(id, pos)
			}
		})

		this.#socket.on('setPositions', (players) => {
			for (const [id, pos] of Object.entries(players)) {
				setRemotePosition(id, pos)
			}
		})

		this.#socket.on('remoteMovement', (movement) => moveRemotePlayer(movement.id, movement.msg))
		this.#socket.on('kill', (id) => removeRemotePlayer(id))
	}

	/**
	 * Sends a message to the server
	 * @param {string} messageName The name of this message. This serves as a simple indicator about the type of message that you are sending.
	 * @param {object} object The object that will be send to clients.
	 */
	sendMessage(messageName, object) {
		this.#socket.emit(messageName, {id: this.#socket.id, msg: object})
	}
}