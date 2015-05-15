var freqMap = { 'MT' : 0,
	'C2' : 103.83, 'C#2': 110, 'D2': 116.54, 'D#2': 123.47, 'E2': 130.81, 'F2': 138.59, 'F#2': 146.83, 'G2': 155.56, 'G#2': 164.81, 'A2': 174.61, 'A#2': 185, 'B2': 196,
	'C3' : 207.65, 'C#3': 220.00, 'D3': 233.08, 'D#3': 246.94, 'E3': 261.60, 'F3': 277.18, 'F#3': 293.67, 'G3': 311.13, 'G#3': 329.63, 'A3': 349.23, 'A#3': 369.99, 'B3': 392.00,
	'C4' : 415.30, 'C#4': 440.00, 'D4': 466.16, 'D#4': 493.88, 'E4': 523.25, 'F4': 554.37, 'F#4': 587.33, 'G4': 622.25, 'G#4': 659.25, 'A4': 698.46, 'A#4': 739.99, 'B4': 830.61,
}

var play = function(audio){
	if (!audio.paused) { // if playing stop and rewind
	    audio.pause();
	    audio.currentTime = 0;
	}
	audio.play();
}

var generateSound = function(factor){
	var sine = [];
	var wave,audio,wave,audio;
	for(var i=0; i<3000; i++){
		sine[i] = 128+(127*Math.sin(i/factor));
	}
	wave = new RIFFWAVE(sine);
	audio = new Audio(wave.dataURI);
	play(audio);
}

var playWithCallback = function(audio, callback){
	if (!audio.paused) { // if playing stop and rewind
		audio.pause();
		audio.currentTime = 0;
	}
	audio.currentTime = 0.1;
	audio.play();
	if(callback){
		audio.addEventListener('ended', callback);
	}
}

var generateSoundNew = function(factor, timeFactor){
	var sine = [];
	var wave,audio,wave,audio;
	for(var i=0; i<(10000); i++){
		sine[i] = 128+(127*Math.sin(i/factor));
	}
	wave = new RIFFWAVE(sine);
	audio = new Audio(wave.dataURI);
	var duration = 1.5/timeFactor,
		endTime = duration;
	playAudioSegment(audio, endTime);
	//playWithCallback(audio, callback);
}

var playAudioSegment = function(audio, endTime){
	audio.segmentEnd = endTime;
	audio.paused = false;
	audio.addEventListener('timeupdate', function (){
		if (this.currentTime >= this.segmentEnd) {
			this.pause();
			this.currentTime = 0;
		}
	}, false);
	if(currentAudio){
		currentAudio.pause();
	}
	currentAudio = audio;
	audio.play();
}