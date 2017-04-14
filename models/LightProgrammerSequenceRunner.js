



export default class LightProgrammerSequenceRunner {

	constructor(_opt) {

		this.STATE_IDLE = 0;
		this.STATE_RUNNING = 1;
		this.STATE_PAUSED = 2;

		var opt = {
			sequence	: null,
			target_fps	: 60
		};
		opt = _opt;	// TODO extend


		// Config
		this._sequence = opt.sequence;
		this._target_fps = opt.target_fps;

		// Computed Config
		this._target_frameTime = 1000/this._target_fps;

		// Runtime
		this._state = this.STATE_IDLE;

		this._index = 0;
		this._frame_startTime = null;


		this._current = {
			value	: 0,
			done	: false
		};

	}

	// Make this class work as an interator.
	[Symbol.iterator]() {
		var _this = this;
		return {
			next: () => (_this.next.call(_this))
		}
	};


	/**
	 * Return the next value subject to FPS
	 * 
	 * Starts the runner if idle.
	 */
	next() {

		if (this._state == this.STATE_IDLE) {	// Start the runner if idle
			this._start();
		}
		if (this._state == this.STATE_PAUSED) {	// Return the current value if paused.
			return this._current;
		}

		// Handle the first frame (no frame start time)
		if (this._frame_startTime == null) {
			this._frame_startTime = new Date();
			return this._current = this._sequence.next();
		}

		// Measure frame time
		var currentTime = new Date();
		var frameTime = currentTime - this._frame_startTime;

		if (frameTime < this._target_frameTime) {	// haven't reached target frametime, stay on this frame.
			return this._current;
		}

		// Frametime met or exceeeded, determine frame increment:
		var frameIncrement_decimal = frameTime / this._target_frameTime;
		var frameIncrement = Math.floor(frameIncrement_decimal);
		var frameIncrement_remainderMs = frameTime % this._target_frameTime;
		//var frameIncrement_remainderMs = (frameIncrement_decimal - frameIncrement) * this._target_frameTime;


		//console.log(this._target_frameTime, frameTime);
		//console.log(frameIncrement_decimal, frameIncrement);

		var current;
		// Increment frame(s)
		for (var i = 0; i < frameIncrement; i++) {
			current = this._sequence.next();
			if (current.done) { break; }	// Exit loop if we're already at the end.
		}

		// Set next frame start time.
		this._frame_startTime = new Date();
		this._frame_startTime = (this._frame_startTime - 0) + frameIncrement_remainderMs;	// Trigger the next frame early to make up for this frame?

		return this._current = current;

	}


	/**
	 * Resets index counter and start time.
	 */
	reset() {
		this._index = 0;
		this._state = this.STATE_IDLE;
	}


	/**
	 * Resets index counter and start time.
	 */
	_start() {
		this._state = this.STATE_RUNNING;
	}



}