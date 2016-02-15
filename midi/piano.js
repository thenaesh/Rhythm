(function(){
  
  
  module.exports = {
    keyOn: function(key, intensity){
      MIDI.noteOn(0, key, intensity, 0);
    },
    keyOff: function(key){
      MIDI.noteOff(0, key, 0);
    },
    playNote: function(key, intensity, delay){
      if (delay == undefined) delay = 0;
      MIDI.noteOn(0, key, intensity, delay);
      MIDI.noteOff(0, key, 1 + delay);
    },
    playChord: function(keys, intensity, delay){
      if (delay == undefined) delay = 0;
      MIDI.chordOn(0, keys, intensity, delay);
      MIDI.noteOff(0, keys, 1 + delay);
    },
  };
  
  
})();