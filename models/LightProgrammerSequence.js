

// Time in ms
// TODO Sequence runner to read, iterate through sequence based on time.
// Sequence runner could detect longer frame times using millis? and display long/repair frames

export default class LightProgrammerSequence {

	constructor(_opt) {

		var opt = {
			string: null
		};

		// Sequence vars
		this._sequence = null;	// prefix + body + suffix

		this._sequence = [];
		for (var i = 0; i < 500; i++) {
			this._sequence.push(i % 2);	// MAKE ARRAY OF 0S AND 1S WHOOPS CAPS
		}

		// this._sequence_body = null;
		// this._sequence_prefix = null;
		// this._sequence_suffix = null;



		// Sequence runner vars
		this._done = false;	// Iterator - has completed sequence
		this._index = 0;	// Iterator - current index

		this._lastMillis = 0;

	}

	[Symbol.iterator]() {
		var _this = this;
		return {
			next: () => (_this.next.call(_this))
		}
	};

	/**
	 * Iterator: returns the next 
	 */
	next() {

		// determine current index
		
		var value = this._currentValue();
		var done = this._isDone();

		return {
			value: value,
			done: done
		};

	}


	_currentValue() {
		return this.getSequence()[(this.getIndex())];
	}

	/**
	 * returns true when the last 
	 */
	_isDone() {
		return this._done;
	}


	/**
	 * 
	 */
	getIndex() {
		// TODO use millis to work out index!!
		var index = this._index++

		if (index > this.getLength() - 1) {
			this._done = true;
			return this.getLength() - 1;
		}

		return index;
	}


	/**
	 * 
	 */
	getLength() {
		return this._sequence.length;
	}


	/**
	 * 
	 */
	getSequence() {
		return this._sequence;
	}

}