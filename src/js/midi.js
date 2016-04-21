import appState from './app-state.js';

class MIDI {
	constructor() {
		this.midiAccess = null;
		this.init();
		this.adventureKidVideoJockey = appState.adventureKidVideoJockey;
	}

	init() {
		if (this.isSupported()) {
			this.requestAccess();
		} else {
			console.log('WebMIDI is not supported in this browser.');
		}
	}

	isSupported() {
		return !!navigator.requestMIDIAccess;
	}

	async requestAccess() {
		try {
			this.midiAccess = await navigator.requestMIDIAccess();
			this.onMIDISuccess(this.midiAccess);
		} catch (error) {
			this.onMIDIFailure(error);
		}
	}

	onMIDISuccess(midiAccess) {
		console.log('This browser supports WebMIDI!');
		console.log('MIDI Access Object:', midiAccess);
		this.setupMIDIInputs(midiAccess);
	}

	onMIDIFailure(error) {
		console.error('Failed to get MIDI access:', error);
	}

	setupMIDIInputs(midiAccess) {
		const inputs = midiAccess.inputs.values();
		for (let input of inputs) {
			input.onmidimessage = this.handleMIDIMessage.bind(this);
			console.log(`Connected to MIDI input: ${input.name}`);
		}
	}

	handleMIDIMessage(message) {
		const [status, data1, data2] = message.data;
		const command = status >> 4;
		const channel = status & 0xf;
		const note = data1;
		const velocity = data2;

		switch (command) {
			case 9: // Note on
				if (velocity > 0) {
					this.adventureKidVideoJockey.noteOn(channel, note, velocity);
				} else {
					this.adventureKidVideoJockey.noteOff(channel, note);
				}
				break;
			case 8: // Note off
				this.adventureKidVideoJockey.noteOff(channel, note);
				break;
			default:
				break;
		}
	}
}

const midi = new MIDI();

export default midi;
