/*This function makes the key glow*/
function pressKey(note){
  //Note to be pressed is a Sharp key
  if(note.indexOf("#")> -1){
    for(var i=0; i<sharpKeys.length; i++){
      if(sharpKeys[i].keynote == note && sharpKeys[i].ispressed == false){
        //Dsiplay Sharp Key
        var pressedsharpKey = new PIXI.Sprite.fromImage(sharpKeys[i].pressedkeypic);

        // center the sprites anchor point
        pressedsharpKey.anchor.x = sharpKeys[i].xanchor;
        pressedsharpKey.anchor.y = sharpKeys[i].yanchor;
        //move the key to its position on the screen
        pressedsharpKey.position.x = sharpKeys[i].xpos;
        pressedsharpKey.position.y = sharpKeys[i].ypos;
        //Assign pressed = true
        sharpKeys[i].ispressed = true;
        //Add this key to the pixiContainer
        pixiContainer.addChild(pressedsharpKey);
        renderer.render(pixiContainer);
      }
    }
  }
  //The key to be pressed is a normal key
  else{
    for(var i=0; i<normalKeys.length; i++){
      if(normalKeys[i].keynote == note && normalKeys[i].ispressed==false){
        var pressedKey = new PIXI.Sprite.fromImage(normalKeys[i].pressedkeypic);

        // center the sprites anchor point
        pressedKey.anchor.x = normalKeys[i].xanchor;
        pressedKey.anchor.y =normalKeys[i].yanchor;
        //move the key to its position on the screen
        pressedKey.position.x = normalKeys[i].xpos;
        pressedKey.position.y = normalKeys[i].ypos;
        normalKeys[i].ispressed = true;
        //Add this key to the pixiContainer
        pixiContainer.addChild(pressedKey);
        renderer.render(pixiContainer);
      }
    }
  }
}

/*This function stops the glowing of the key*/
function releaseKey(note){
  //Note to be released is a Sharp key
  if(note.indexOf("#")> -1){
    for(var i=0; i<sharpKeys.length; i++){
      if(sharpKeys[i].keynote == note && sharpKeys[i].ispressed == true){
        /*
         * Find the next and previous normal keys
         * If these keys are repainted, the pressed sharp key is released
         * Also update ispressed value to false
         */
        //get the previous normal key
        var prevKey = sharpKeys[i].prevkey;
        //get the next normal key
        var nextKey = sharpKeys[i].nextkey;
        //Repaint the prev normal key
        var prevNormalKey = new PIXI.Sprite.fromImage(prevKey.normalkeypic);
        // center the sprites anchor point
        prevNormalKey.anchor.x = prevKey.xanchor;
        prevNormalKey.anchor.y = prevKey.yanchor;
        //move the key to its position on the screen
        prevNormalKey.position.x = prevKey.xpos;
        prevNormalKey.position.y = prevKey.ypos;
        pixiContainer.addChild(prevNormalKey);
        renderer.render(pixiContainer);

        //Repaint the next normal key
        var nextNormalKey = new PIXI.Sprite.fromImage(nextKey.normalkeypic);
        // center the sprites anchor point
        nextNormalKey.anchor.x = nextKey.xanchor;
        nextNormalKey.anchor.y = nextKey.yanchor;
        //move the key to its position on the screen
        nextNormalKey.position.x = nextKey.xpos;
        nextNormalKey.position.y = nextKey.ypos;
        sharpKeys[i].ispressed = false;
        pixiContainer.addChild(nextNormalKey);
        renderer.render(pixiContainer);
      }
    }
  }
  //Note to be released is a normal key
  else{
    for(var i=0; i<normalKeys.length; i++){
      if(normalKeys[i].keynote == note && normalKeys[i].ispressed == true){
        /*
         * Find the pressed key in the normalKeys array
         * If found, get the original image and repaint it
         * Also update ispressed value to false
         */
        var originalKey = new PIXI.Sprite.fromImage(normalKeys[i].normalkeypic);
        // center the sprites anchor point
        originalKey.anchor.x = normalKeys[i].xanchor;
        originalKey.anchor.y = normalKeys[i].yanchor;
        //move the key to its position on the screen
        originalKey.position.x = normalKeys[i].xpos;
        originalKey.position.y = normalKeys[i].ypos;
        normalKeys[i].ispressed = false;
        //Add this key to the pixiContainer
        pixiContainer.addChild(originalKey);
        renderer.render(pixiContainer);
      }
    }
  }
}

/* This function will display the chord keys*/
function displayChordKeyPressed(){
  /* Get notes to be displayed */
  var notes = document.getElementById('chord').value.split(" ");
  //console.log("note1: " + notes[0] + " note2: " + notes[1] + " note3: " + notes[2]);
  var pressedKeys = new Array();
  /* Get the pressed keys into the pressedKeys array */
  for(var i=0; i<notes.length; i++){
    /* The note is a sharp key, add it to the pressedKeys Array */
    if(notes[i].indexOf("#")> -1){
      //console.log("sharp key pressed");
      for(var j=0; j<sharpKeys.length; j++){
        //console.log("sharp keynote: " + sharpKeys[j].keynote);
        //console.log(sharpKeys[j].pressedkeypic);
        if(sharpKeys[j].keynote == notes[i]){
          //console.log("FOUND pressed sharp key");
          //console.log("sharp key img: " + sharpKeys[j].pressedkeypic)
          /* Add this key to the pressedKeys Array */
          pressedKeys.push(sharpKeys[j]);
        }
      }
    }
    /** The note is a normal key, add it to the pressedKeys Array **/
    else{
      for(var j=0; j<normalKeys.length; j++){
        if(normalKeys[j].keynote == notes[i]){
          console.log('Found note: ' + normalKeys[j].keynote);
          console.log('pressed key img: '+ normalKeys[j].pressedkeypic);
          /* Add this key to the pressedKeys Array */
          pressedKeys.push(normalKeys[j]);
        }
      }
    }
  }

  /** Display the pressedKeys **/

  /* Find the displayed keys and repaint them first */
    //Repaint the sharp keys
  for(var i=0; i<sharpKeys.length; i++){
    if(sharpKeys[i].ispressed == true){
      var prevKey = sharpKeys[i].prevkey;
      var nextKey = sharpKeys[i].nextkey;
      var prevNormalKey = new PIXI.Sprite.fromImage(prevKey.normalkeypic);
      // center the sprites anchor point
      prevNormalKey.anchor.x = prevKey.xanchor;
      prevNormalKey.anchor.y = prevKey.yanchor;
      //move the key to its position on the screen
      prevNormalKey.position.x = prevKey.xpos;
      prevNormalKey.position.y = prevKey.ypos;
      pixiContainer.addChild(prevNormalKey);
      renderer.render(pixiContainer);

      var nextNormalKey = new PIXI.Sprite.fromImage(nextKey.normalkeypic);
      // center the sprites anchor point
      nextNormalKey.anchor.x = nextKey.xanchor;
      nextNormalKey.anchor.y = nextKey.yanchor;
      //move the key to its position on the screen
      nextNormalKey.position.x = nextKey.xpos;
      nextNormalKey.position.y = nextKey.ypos;
      sharpKeys[i].ispressed = false;
      pixiContainer.addChild(nextNormalKey);
      renderer.render(pixiContainer);
    }
  }
    //Repaint the normal keys
  for(var i=0; i<normalKeys.length; i++){
    if(normalKeys[i].ispressed == true){
      var originalKey = new PIXI.Sprite.fromImage(normalKeys[i].normalkeypic);
      // center the sprites anchor point
      originalKey.anchor.x = normalKeys[i].xanchor;
      originalKey.anchor.y = normalKeys[i].yanchor;
      //move the key to its position on the screen
      originalKey.position.x = normalKeys[i].xpos;
      originalKey.position.y = normalKeys[i].ypos;
      normalKeys[i].ispressed = false;
      //Add this key to the pixiContainer
      pixiContainer.addChild(originalKey);
      renderer.render(pixiContainer);
    }
  }

  /** Print the normal keys first **/
  for(var i=0; i<pressedKeys.length; i++){
    for(var j=0; j<normalKeys.length; j++){
      if(pressedKeys[i].keynote == normalKeys[j].keynote){
        var pkey = new PIXI.Sprite.fromImage(normalKeys[j].pressedkeypic);
        normalKeys[j].ispressed = true;
        // center the sprites anchor point
        pkey.anchor.x = normalKeys[j].xanchor;
        pkey.anchor.y = normalKeys[j].yanchor;
        //move the key to its position on the screen
        pkey.position.x = normalKeys[j].xpos;
        pkey.position.y = normalKeys[j].ypos;
        //Add this key to the pixiContainer
        pixiContainer.addChild(pkey);
      }
    }
  }

  /* then print the sharp keys */
  for(var i=0; i<pressedKeys.length; i++){
    for(var j=0; j<sharpKeys.length; j++){
      if(pressedKeys[i].keynote == sharpKeys[j].keynote){
        var pkey = new PIXI.Sprite.fromImage(sharpKeys[j].pressedkeypic);

        // center the sprites anchor point
        pkey.anchor.x = sharpKeys[j].xanchor;
        pkey.anchor.y = sharpKeys[j].yanchor;
        //move the key to its position on the screen
        pkey.position.x = sharpKeys[j].xpos;
        pkey.position.y = sharpKeys[j].ypos;
        //Assign pressed = true
        sharpKeys[j].ispressed = true;
        //Add this key to the pixiContainer
        pixiContainer.addChild(pkey);
        renderer.render(pixiContainer);
      }
    }
  }
}

/* This function displays a single key that is pressed*/
function displaySingleKeyPressed(){
  var keynote = document.getElementById('note').value;
  console.log("key pressed note: " + keynote);
  var pkey;
  /*Find the pressed Key in sharpKeys array and normalKeys array*/
  //Sharp Key is pressed
  if(keynote.indexOf("#")> -1){
    console.log('sharp key')
    for(var i=0; i<sharpKeys.length; i++){
      if(sharpKeys[i].keynote == keynote){
        pkey = {
            "mypressedKey": sharpKeys[i],
            "keypos" : i,
            "issharp" : true
            }
      }
    }
  }
  //Normal Key is pressed
  else{
    for(var i=0; i<normalKeys.length; i++){
      if(normalKeys[i].keynote == keynote){

        pkey = {
            "mypressedKey": normalKeys[i],
            "keypos" : i,
            "issharp" : false
            }
      }
    }
  }
  /* Find the displayed keys and repaint them first */
    //Repaint the sharp keys
  for(var i=0; i<sharpKeys.length; i++){
    if(sharpKeys[i].ispressed == true){
      var prevKey = sharpKeys[i].prevkey;
      var nextKey = sharpKeys[i].nextkey;
      var prevNormalKey = new PIXI.Sprite.fromImage(prevKey.normalkeypic);
      // center the sprites anchor point
      prevNormalKey.anchor.x = prevKey.xanchor;
      prevNormalKey.anchor.y = prevKey.yanchor;
      //move the key to its position on the screen
      prevNormalKey.position.x = prevKey.xpos;
      prevNormalKey.position.y = prevKey.ypos;
      pixiContainer.addChild(prevNormalKey);
      renderer.render(pixiContainer);

      var nextNormalKey = new PIXI.Sprite.fromImage(nextKey.normalkeypic);
      // center the sprites anchor point
      nextNormalKey.anchor.x = nextKey.xanchor;
      nextNormalKey.anchor.y = nextKey.yanchor;
      //move the key to its position on the screen
      nextNormalKey.position.x = nextKey.xpos;
      nextNormalKey.position.y = nextKey.ypos;
      sharpKeys[i].ispressed = false;
      pixiContainer.addChild(nextNormalKey);
      renderer.render(pixiContainer);
    }
  }
    //Repaint the normal keys
  for(var i=0; i<normalKeys.length; i++){
    if(normalKeys[i].ispressed == true){
      var originalKey = new PIXI.Sprite.fromImage(normalKeys[i].normalkeypic);
      // center the sprites anchor point
      originalKey.anchor.x = normalKeys[i].xanchor;
      originalKey.anchor.y = normalKeys[i].yanchor;
      //move the key to its position on the screen
      originalKey.position.x = normalKeys[i].xpos;
      originalKey.position.y = normalKeys[i].ypos;
      normalKeys[i].ispressed = false;
      //Add this key to the pixiContainer
      pixiContainer.addChild(originalKey);
      renderer.render(pixiContainer);
    }
  }
  /** Display pressed Key **/
    if(pkey.issharp == true){
      //Dsiplay Sharp Key
      var pressedsharpKey = new PIXI.Sprite.fromImage(pkey.mypressedKey.pressedkeypic);

      // center the sprites anchor point
      pressedsharpKey.anchor.x = pkey.mypressedKey.xanchor;
      pressedsharpKey.anchor.y = pkey.mypressedKey.yanchor;
      //move the key to its position on the screen
      pressedsharpKey.position.x = pkey.mypressedKey.xpos;
      pressedsharpKey.position.y = pkey.mypressedKey.ypos;
      //Assign pressed = true
      sharpKeys[pkey.keypos].ispressed = true;
      //Add this key to the pixiContainer
      pixiContainer.addChild(pressedsharpKey);
      renderer.render(pixiContainer);
    }else{
      //Display Normal Key
      var pressedKey = new PIXI.Sprite.fromImage(pkey.mypressedKey.pressedkeypic);

      // center the sprites anchor point
      pressedKey.anchor.x = pkey.mypressedKey.xanchor;
      pressedKey.anchor.y = pkey.mypressedKey.yanchor;
      //move the key to its position on the screen
      pressedKey.position.x = pkey.mypressedKey.xpos;
      pressedKey.position.y = pkey.mypressedKey.ypos;
      normalKeys[pkey.keypos].ispressed = true;
      //Add this key to the pixiContainer
      pixiContainer.addChild(pressedKey);
      renderer.render(pixiContainer);
    }
}

  //create the piano mappings
  var containerHeight = 300;
  var containerWidth = 1500;
  //create an new instance of a pixi container
  var pixiContainer = new PIXI.Container();
  // create a renderer instance.
  var renderer = PIXI.autoDetectRenderer(containerWidth, containerHeight,	document.getElementById('mypiano'));

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  requestAnimationFrame(animate);

  //Build piano sprite using key images
  var octaves = 5;
  var imagePath = "../images/";
  var imageExt = ".png";
  var normalKeyNotes = new Array("C","D","E","F","G","A","B");
  var normalKeys = new Array();
  var xanchor = 0.5, yanchor = 0.5, xpos=50, ypos=(containerHeight/2);
  //Display Normal Keys on piano
  for(var i=1; i<=octaves; i++){
    for(var j=0; j<normalKeyNotes.length; j++){
      //create a sprite using the key image
      var key = new PIXI.Sprite.fromImage(imagePath+normalKeyNotes[j]+imageExt);
      //console.log("normal pic: [" + imagePath+normalKeyNotes[j]+imageExt + "]");
      // center the sprites anchor point
      key.anchor.x = xanchor;
      key.anchor.y = yanchor;
      //move the key to its position on the screen
      key.position.x = xpos;
      key.position.y = ypos;
      //Add this to the normal keys array
      var pressedkeypic = imagePath + normalKeyNotes[j]+"-pressed"+imageExt;
      //console.log("pressed pic: [" + pressedkeypic +  "]\n");
      var keynote = normalKeyNotes[j] + (i);
      //console.log("keynote: [" + keynote + "]");
      //Find x anchor
      var mykey = {
                     "keynote": keynote,
              "normalkeypic": imagePath+normalKeyNotes[j]+imageExt,
              "pressedkeypic": pressedkeypic,
              "xanchor": xanchor,
              "yanchor": yanchor,
              "xpos": xpos,
              "ypos": ypos,
              "ispressed": false
            };
      normalKeys.push(mykey);
      //Add this key to the pixiContainer
      pixiContainer.addChild(key);
      //Increment xpos values
      xpos = xpos + 35;
    }
  }


  //Add Sharp keys to the normalKeys array
  var sharpKeyNotes = new Array("C#","D#","F#","G#","A#");
  var sharpKeys = new Array();
  for(var i=1; i<=octaves; i++){
    //console.log("Octave " + i);
    for(var j=0; j<sharpKeyNotes.length; j++){
      var pressedkeypic = imagePath + sharpKeyNotes[j]+"-pressed"+imageExt;
      //console.log("pressed pic: [" + pressedkeypic +  "]\n");
      var keynote = sharpKeyNotes[j] + (i) ;
      //console.log("keynote: [" + keynote + "]");
      var prevKey;
      var nextKey;
      var sharpxpos;
      if(sharpKeyNotes[j] == "C#"){
        //console.log("Found C#"+(i) + " key");
        for(var k=0; k<normalKeys.length; k++){
          if(normalKeys[k].keynote == ("C"+i)){
            console.log("Found prev key");
            prevKey = normalKeys[k];
            //console.log("prevKey note: " + prevKey.keynote + " xpos: " + prevKey.xpos);
          }
          if(normalKeys[k].keynote == ("D"+i)){
          //	console.log("Found next key");
            nextKey = normalKeys[k];
            //console.log("nextKey note: " + nextKey.keynote + " xpos: " + nextKey.xpos);
          }
        }
        sharpkeypic = imagePath + "CS-pressed" + imageExt;
        sharpkeynote = "C#"+i;
        sharpxpos = prevKey.xpos + ((nextKey.xpos - prevKey.xpos) / 2);
        sharpypos = prevKey.ypos-30;
        //console.log("sharpxpos: " + sharpxpos + "sharpypos: " + sharpypos);
      }
      else if(sharpKeyNotes[j] == "D#"){
        //console.log("Found D#"+(i) + " key");
        for(var k=0; k<normalKeys.length; k++){
          if(normalKeys[k].keynote == ("D"+i)){
            //console.log("Found prev key");
            prevKey = normalKeys[k];
            //console.log("prevKey note: " + prevKey.keynote + " xpos: " + prevKey.xpos);
          }
          if(normalKeys[k].keynote == ("E"+i)){
            //console.log("Found next key");
            nextKey = normalKeys[k];
            //console.log("nextKey note: " + nextKey.keynote + " xpos: " + nextKey.xpos);
          }
        }
        sharpkeypic = imagePath + "DS-pressed" + imageExt;
        sharpkeynote = "D#"+i;
        sharpxpos = prevKey.xpos + ((nextKey.xpos - prevKey.xpos) / 2);
        sharpypos = prevKey.ypos-30;
        //console.log("sharpxpos: " + sharpxpos + "sharpypos: " + sharpypos);
      }
      else if(sharpKeyNotes[j] == "F#"){
        //console.log("Found F#"+(i) + " key");
        for(var k=0; k<normalKeys.length; k++){
          if(normalKeys[k].keynote == ("F"+i)){
            //console.log("Found prev key");
            prevKey = normalKeys[k];
            //console.log("prevKey note: " + prevKey.keynote + " xpos: " + prevKey.xpos);
          }
          if(normalKeys[k].keynote == ("G"+i)){
            //console.log("Found next key");
            nextKey = normalKeys[k];
            //console.log("nextKey note: " + nextKey.keynote + " xpos: " + nextKey.xpos);
          }
        }
        sharpkeypic = imagePath + "FS-pressed" + imageExt;
        sharpkeynote = "F#"+i;
        sharpxpos = prevKey.xpos + ((nextKey.xpos - prevKey.xpos) / 2);
        sharpypos = prevKey.ypos-30;
        //console.log("sharpxpos: " + sharpxpos + "sharpypos: " + sharpypos);
      }
      else if(sharpKeyNotes[j] == "G#"){
        //console.log("Found G#"+(i) + " key");
        for(var k=0; k<normalKeys.length; k++){
          if(normalKeys[k].keynote == ("G"+i)){
            //console.log("Found prev key");
            prevKey = normalKeys[k];
            //console.log("prevKey note: " + prevKey.keynote + " xpos: " + prevKey.xpos);
          }
          if(normalKeys[k].keynote == ("A"+i)){
            //console.log("Found next key");
            nextKey = normalKeys[k];
            //console.log("nextKey note: " + nextKey.keynote + " xpos: " + nextKey.xpos);
          }
        }
        sharpkeypic = imagePath + "GS-pressed" + imageExt;
        sharpkeynote = "G#"+i;
        sharpxpos = prevKey.xpos + ((nextKey.xpos - prevKey.xpos) / 2);
        sharpypos = prevKey.ypos-30;
        //console.log("sharpxpos: " + sharpxpos + "sharpypos: " + sharpypos);
      }
      else if(sharpKeyNotes[j] == "A#"){
        //console.log("Found A#"+(i) + " key");
        for(var k=0; k<normalKeys.length; k++){
          if(normalKeys[k].keynote == ("A"+i)){
            //console.log("Found prev key");
            prevKey = normalKeys[k];
            //console.log("prevKey note: " + prevKey.keynote + " xpos: " + prevKey.xpos);
          }
          if(normalKeys[k].keynote == ("B"+i)){
            //console.log("Found next key");
            nextKey = normalKeys[k];
            //console.log("nextKey note: " + nextKey.keynote + " xpos: " + nextKey.xpos);
          }
        }
        sharpkeypic = imagePath + "AS-pressed" + imageExt;
        sharpkeynote = "A#"+i;
        sharpxpos = prevKey.xpos + ((nextKey.xpos - prevKey.xpos) / 2);
        sharpypos = prevKey.ypos-30;
        //console.log("sharpxpos: " + sharpxpos + "sharpypos: " + sharpypos);
      }

      var mysharpkey = {
                 "keynote": sharpkeynote,
          "pressedkeypic": sharpkeypic,
          "prevkey": prevKey,
          "nextkey": nextKey,
          "xanchor": xanchor,
          "yanchor": yanchor,
          "xpos": sharpxpos,
          "ypos": sharpypos,
          "ispressed": false
        };
      sharpKeys.push(mysharpkey);
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    // render the stage
    renderer.render(pixiContainer);
  }
