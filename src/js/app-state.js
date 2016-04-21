class AppState {
	constructor() {
		this._adventureKidVideoJockey = null;
	}

	set adventureKidVideoJockey(element) {
		this._adventureKidVideoJockey = element;
	}

	get adventureKidVideoJockey() {
		return this._adventureKidVideoJockey;
	}
}

const appState = new AppState();

export default appState;
