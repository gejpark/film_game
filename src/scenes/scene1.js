class scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }
    preload() {
        this.load.image('scene1_background', './assets/scene1_images/gameplay/scene1_background.png');
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
        this.scene1_background = this.add.sprite(0, 0, 'scene1_background').setOrigin(0);

        //create UI
        this.UI = new UI(this,300,300, 'cursor_base');
        this.UI.create();
    }
    update() {
        this.UI.update();
    }
}