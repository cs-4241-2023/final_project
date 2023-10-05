
/**
 * A singleton class that helps manage the Socket.IO connection with the server.
 * Use SocketNetwork.getConnection() to use this class.
 */
class SocketNetwork {

	static #SocketNetwork
	static #isInternalConstructing
	static getConnection() {
		// Only ever creates one instance of this class
		if(SocketNetwork.#SocketNetwork == undefined) {
			SocketNetwork.#isInternalConstructing = true
			SocketNetwork.#SocketNetwork = new SocketNetwork()
		}
		return SocketNetwork.#SocketNetwork
	}

	#socket
	constructor() {
		// Prevents outside construction to ensure singleton
		if (!SocketNetwork.#isInternalConstructing) {
			throw new TypeError("SocketNetwork is not constructable");
		}
		SocketNetwork.#isInternalConstructing = false;

		// Class initialization start
		this.#socket = io()
		this.#socket.on('setID', function(msg) {
			this.id = msg
		})
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