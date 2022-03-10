export let ws = null;

let messages = [];
export const connectWS = (token) => {
	console.log('ws', ws);
	if ((ws === null || ws.readyState === 3) && token) {
		ws = new WebSocket(`ws://10.0.0.29:3040/?token=${token}`);
	}
	messages = [];
	return ws;
};

export const sendEvent = (data, token) => {
	// messages.push(data)
	if (ws !== null) {
		if (ws.readyState !== 1) {
			messages.push(data);
		} else {
			ws.send(JSON.stringify(data));
		}
		ws.onopen = () => {
			messages.forEach((message) => {
				ws.send(JSON.stringify(message));
			});
		};

		// ws.onmessage = (event) => {
		//   // ws.send(
		//   //   JSON.stringify(dataToSend)
		//   // );
		//   if (event.data.size !== 0) {
		//     const response = JSON.parse(event.data)
		//     return response
		//   }
		// }

		ws.onclose = () => {};
		ws.onerror = (err) => {
			if (ws.code !== 4000) {
				setTimeout(function () {
					connectWS();
				}, 2000);
			}
		};
		return ws;
	} else {
		connectWS(token);
	}
};

export const closeWS = (token) => {
	if (ws) {
		if (ws.readyState === 1) {
			ws.send(JSON.stringify({ type: 'close-connection' }));
			ws.close();
			ws = null;
			//  connectWS(token)
		}
	}
};
