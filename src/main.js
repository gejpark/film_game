//LIST MAJOR PHASER COMPONENTS USED:
//+1 The game uses the Physics system for hit-detection between the mouse cursor and enemies
//+1 Text objects used frequently throughout the game
//+1 Major use of animation system, re-creating scenes from the movie
//+1 Timers are used to delay enemies in scene 1, until the "READY" message disappear, similarly for scene 2.
//+1 Camera is used to set background on scene 2
//+1 Phaser audio system is consistently used. Not only for music, but also for sound effects. For example, the less ammo you have in your gun, the quieter the shooting sound effect becomes.
//= 6 components.

//EXTRA FEATURES:
//Custom "Western"-ish font implemented
//MIDIs converted to Famicom-like audio using GXSCC to maintain game's retro aethestic
//All images bit-crunched using Pixelit, again for the retro aethestic

//These five components can be added: physics systems, cameras, particle effects, text objects, the animation manager
//Requirement for the game: Physics for hit detection, camera of dynamic scene switch, particle effects for blasting, text objects (self-expalantory), and animation manager (just adding animations to the game.)

//CITATIONS:
//For bit-crushing movie stills - https://giventofly.github.io/pixelit/
//Used the color palette "SEPIA 6" - https://lospec.com/palette-list/sepia6
//Crunched the sound using - https://meme.institute/gxscc/
//Original Midis From:
//http://www.acroche2.com/midi_m.html
//https://www.midis101.com/search/ENNIO+MORRICONE
//REVOLVER UI (original, modified for the game): https://opengameart.org/content/revolver-ammo-icon
//Sound Effects: https://sfxr.me/
//Custom font Smokum from: https://fonts.google.com/specimen/Smokum
//Sprites edited with ASEPRITE
//Audio editied with AUDACITY

let config = {
    type: Phaser.AUTO, //Phaser.CANVAS => webgl isn't pixel perfect when rendering for some reason
    width: 640,
    height: 480,
    scene: [menu, scene1, scene2, scene3, gameover, credits],
    // backgroundColor: '#000000',
    // canvas: myCustomCanvas,
    // context: myCustomContext,
    transparent: true, //activate transparency
    physics: {
        default: 'arcade',
        arcade: {
            debug: true, //turn off debug later. (set to false)
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    render: { //https://www.html5gamedevs.com/topic/36343-disable-antialias-in-phaser-3/
        pixelArt: true, 
    },
    fps: { forceSetTimeOut: true, target: 60 },
}
let game = new Phaser.Game(config);
// reserve keyboard vars
let KEY_SPACE, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN, KEY_Z, MOUSE_POINTER, KEY_ESC, KEY_P;
let SCORES = [];
// Set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
