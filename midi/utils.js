(function(){
  
  
  var MIDI_map = {
    
    Cn: function(n){ return 12*(n+1); },
    offset: (function(){
      var note_map = ["C C# Db D D# Eb E F F# Gb G G# Ab A A# Bb B", "0 1 1 2 3 3 4 5 6 6 7 8 8 9 10 10 11"];
      var note_map_exploded = [note_map[0].split(" "),
                               note_map[1].split(" ").map(function(i){ return parseInt(i); })];
      var offset = [];
      for (var i = 0; i < note_map_exploded[0].length; i++) {
        offset[note_map_exploded[0][i]] = note_map_exploded[1][i];
      }
      return offset;
    })(),
    
  }
  
  module.exports = {
    note_to_MIDInum: function(note_str){
      
      // add error checking here
      
      var note = note_str.substr(0, note_str.length-1);
      var octave = parseInt(note_str.charAt(note_str.length-1));
      
      return MIDI_map.Cn(octave) + MIDI_map.offset[note];
    },
  };
  
  
})();