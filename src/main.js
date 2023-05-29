let config = {
    type: Phaser.WEBGL, //Phaser.CANVAS => webgl isn't pixel perfect when rendering for some reason
    width: 640,
    height: 480,
    scene: [],
    // canvas: myCustomCanvas,
    // context: myCustomContext,
    transparent: true, //activate transparency
    physics: {
        default: 'arcade',
        arcade: {
            debug: false, //turn off debug later. (set to false)
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    fps: { forceSetTimeOut: true, target: 60 },
}
let game = new Phaser.Game(config);
// reserve keyboard vars
let KEY_SPACE, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN, KEY_Z;
let SCORES = [];
// Set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;