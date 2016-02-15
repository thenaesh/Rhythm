(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/*Include Pixi.js & display.js*/
$("document").ready(function(){


  (function(){
    MIDI.loadPlugin({
      soundfontUrl: "midi/soundfont/",
      instrument: "acoustic_grand_piano",
      onsuccess: function(){


        var util = require('./utils.js');
        var piano = require('./piano.js');

        var current_octave = 4;
        var note_status = {
          65: ["C", false, 4],
          87: ["C#", false, 4],
          83: ["D", false, 4],
          69: ["D#", false, 4],
          68: ["E", false, 4],
          70: ["F", false, 4],
          84: ["F#", false, 4],
          74: ["G", false, 4],
          85: ["G#", false, 4],
          75: ["A", false, 4],
          73: ["A#", false, 4],
          76: ["B", false, 4],
          59: ["C+", false, 4]
        };

        var isNumber = function(kc){
          return 48 <= kc && kc <= 57;
        };
        var isNote = function(kc){
          return (String(kc) in note_status);
        };


        $("body").keydown(function(event){

          var keycode = event.keyCode || event.which;

          // if the key pressed is a number key, set the current octave
          if (isNumber(keycode)) {
            current_octave = parseInt(String.fromCharCode(keycode));
          } else if (isNote(keycode) && !note_status[String(keycode)][1]) {

            var note = (keycode != 59) ? note_status[String(keycode)][0] + String(current_octave) : "C" + String(1 + current_octave);
            note_status[String(keycode)][1] = true;
            note_status[String(keycode)][2] = current_octave; // avoids key release bugs
            pressKey(note);
            piano.keyOn(util.note_to_MIDInum(note), 127);

          } else if (keycode == 16) { // shift
            current_octave++;
          } else if (keycode == 17) { // ctrl
            current_octave--;
          }

        });

        $("body").keyup(function(event){

          var keycode = event.keyCode || event.which;

          if (isNote(keycode)) {
            note_status[String(keycode)][1] = false;
            var note = (keycode != 59) ? note_status[String(keycode)][0] + String(note_status[String(keycode)][2]) : "C" + String(1 + note_status[String(keycode)][2]);
            releaseKey(note);
            piano.keyOff(util.note_to_MIDInum(note), 127);
          } else if (keycode == 16) {
            current_octave--;
          } else if (keycode == 17) {
            current_octave++;
          }

        });


      }
    });
  })();


});

},{"./piano.js":2,"./utils.js":3}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{}]},{},[1]);
