
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
