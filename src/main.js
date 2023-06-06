//For cutscenes convert movie stills using https://giventofly.github.io/pixelit/
//Use the color palette "SEPIA 6" https://lospec.com/palette-list/sepia6
//Crunch the sound using https://meme.institute/gxscc/
//Original Midis From:
//https://bitmidi.com/once-upon-a-time-in-the-west-1-mid
//https://bitmidi.com/once-upon-a-time-in-the-west-2-mid
//http://www.acroche2.com/midi_m.html
//https://www.midis101.com/search/ENNIO+MORRICONE
//REVOLVER UI (original, modified for the game):
//https://opengameart.org/content/revolver-ammo-icon

//These five components can be added: physics systems, cameras, particle effects, text objects, the animation manager
//Requirement for the game: Physics for hit detection, camera of dynamic scene switch, particle effects for blasting, text objects (self-expalantory), and animation manager (just adding animations to the game.)

//Sound Effects: https://sfxr.me/

//Overlap Rect reference:
//Reference: https://newdocs.phaser.io/docs/3.55.2/focus/Phaser.Physics.Arcade.Components.OverlapRect
//Example: https://labs.phaser.io/view.html?src=src/physics/arcade/get%20bodies%20within%20rectangle.js

//Adding new fonts to Phaser: https://webtips.dev/webtips/phaser/custom-fonts-in-phaser3

//Custom font Smokum from: https://fonts.google.com/specimen/Smokum

let config = {
    type: Phaser.AUTO, //Phaser.CANVAS => webgl isn't pixel perfect when rendering for some reason
    width: 640,
    height: 480,
    scene: [menu, scene1, scene1_start, scene2, scene3],
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
