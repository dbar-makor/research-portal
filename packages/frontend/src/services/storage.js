export default class StorageService {
	static set(key, value) {
		const dataString = JSON.stringify(value);
		localStorage.setItem(key, dataString);
	}

	static get(key) {
		const dataString = localStorage.getItem(key);
		if (!dataString) {
			return null;
		}
		return JSON.parse(dataString);
	}

	static remove(key) {
		localStorage.removeItem(key);
	}

	static clear() {
		localStorage.clear();
	}
}
