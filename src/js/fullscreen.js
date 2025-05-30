export function fullscreen(context) {
	// Add event listener for 'Enter' key to toggle fullscreen mode
	document.addEventListener(
		'keydown',
		e => {
			if (e.key === 'Enter') {
				toggleFullScreen();
			}
		},
		{ capture: false, once: false }
	);
}

const toggleFullScreen = () => {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen().catch(err => {
			console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
		});
	} else if (document.exitFullscreen) {
		document.exitFullscreen().catch(err => {
			console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
		});
	}
};
