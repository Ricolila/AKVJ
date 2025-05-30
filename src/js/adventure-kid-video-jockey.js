import settings from './settings.js';
import appState from './app-state.js';
import AnimationLayer from './animation-layer.js';
import AnimationInstance from './animation-instance.js';

class AdventureKidVideoJockey extends HTMLElement {
	constructor() {
		super();
		this.animations = {};
		this.animationLibrary = {};
		this.canvas = document.createElement('canvas');
		this.canvas2dContext = this.canvas.getContext('2d');
		this.animationsToLoad = ['bg', 'lover', 'numbers'];
		this.canvasLayers = [];
	}

	connectedCallback() {
		appState.adventureKidVideoJockey = this;
		this.canvas.width = settings.canvas.width;
		this.canvas.height = settings.canvas.height;
		this.canvas2dContext.imageSmoothingEnabled = false;
		this.canvas2dContext.webkitImageSmoothingEnabled = false;
		this.canvas2dContext.mozImageSmoothingEnabled = false;
		this.canvas2dContext.imageSmoothingQuality = 'low';
		this.canvas2dContext.fillStyle = '#FFFFFF';

		this.appendChild(this.canvas);

		this.init();
	}

	init() {
		const loadImage = src => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = () => resolve(img);
				img.onerror = reject;
				img.src = src;
			});
		};

		const loadAnimations = this.animationsToLoad.map(async animationName => {
			const image = await loadImage(`/animations/${animationName}/frames.png`);
			const response = await fetch(`/animations/${animationName}/meta.json`);
			const meta = await response.json();

			this.animationLibrary[animationName] = new AnimationInstance({
				canvas2dContext: this.canvas2dContext,
				image: image,
				numberOfFrames: meta.numberOfFrames,
				framesPerRow: meta.framesPerRow,
				loop: meta.loop,
				frameRatesForFrames: meta.frameRatesForFrames
			});

			this.animations[animationName] = new AnimationLayer({
				animationInstance: this.animationLibrary[animationName]
			});
		});

		console.log(this.animationLibrary);

		Promise.all(loadAnimations).then(() => {
			this.canvasLayers[0] = this.animations['bg'];
			this.canvasLayers[1] = this.animations.numbers;

			this.loop();
		});
	}

	loop = () => {
		this.canvas2dContext.fillRect(0, 0, 240, 135);

		this.canvasLayers.forEach(layer => layer.play());
		requestAnimationFrame(this.loop);
	};

	noteOn(channel, note, velocity) {
		console.log(`xxx Note on: channel=${channel}, note=${note}, velocity=${velocity}`);

		switch (channel) {
			case 0:
				console.log('Channel 0');
				break;
			default:
				break;
		}
	}

	noteOff(channel, note) {
		console.log(`Note off: channel=${channel}, note=${note}`);
	}
}

customElements.define('adventure-kid-video-jockey', AdventureKidVideoJockey);
