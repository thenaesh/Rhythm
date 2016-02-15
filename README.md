# Rhythm

## Usage
Head over to http://128.199.141.170:8888/ and play the piano!

You need to have a browser that supports WebGL and Web Audio API. Any modern release of Firefox or Chrome should work.

The (key -> note) mappings are currently (WARNING: THIS CHANGES FAST AT THE MOMENT)
  * A -> C
  * W -> C# / Db
  * S -> D
  * E -> D# / Eb
  * D -> E
  * F -> F
  * T -> F# / Gb
  * J -> G
  * U -> G# / Ab
  * K -> A
  * I -> A# / Bb
  * L -> B

Octaves may be selected using the number keys. The octave may be temporarily raised by holding down `SHIFT` and reduced by holding down `CTRL`.

## Building Instructions
After cloning the repository, run `npm install` (you need Node.js installed).

You can then serve up the page with either `npm start` or `node server.js`.

If you wish to modify the code, please note that any changes made to the MIDI subsystem requires a recompilation of the subsystem sources. Please `npm install -g browserify`, `cd midi/` and run `./compile`. This will regenerate `bundle.js`.

## Copyright
Rhythm is copyright Thenaesh Elango and Sadhika Billa.

MIDI.js is copyright Michael Deal. Pixi.js is copyright the Pixi.js team.

## Permissions
Rhythm is licensed for use under the GNU General Public Licence, version 3.

MIDI.js and Pixi.js are both released under the MIT Licence.
