class scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }
    preload() {

    }
    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Smokum',
            fontSize: '14px',
            // backgroundColor: '#816271',
            color: '#000000',
            align: 'right',
            // padding: {
            //     top: 5,
            //     bottom: 5,
            // },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/15, 'SCENE 1', menuConfig).setOrigin(0.5);
    }
    update() {
        
    }
}