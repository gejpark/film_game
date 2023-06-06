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

        //create enemies
        this.enemy1 = new enemy1(this, game.config.width * (9/10), game.config.height * (2/3), 'enemy1_base');
        this.enemy1.create();
        this.enemy2 = new enemy1(this, game.config.width * (5/10), game.config.height * (2/3), 'enemy2_base');
        // this.enemy2.setAnimationType('enemy2');
        this.enemy2.create('enemy2');
        this.enemy3 = new enemy1(this, game.config.width * (1/10), game.config.height * (2/3), 'enemy3_base');
        // this.enemy3.setAnimationType('enemy3');
        this.enemy3.create('enemy3');

        //textbox
        let titleConfig = {
            fontFamily: 'Smokum',
            fontSize: '24px',
            // backgroundColor: '#816271',
            color: '#FFFFFF',
            align: 'right',
            // padding: {
            //     top: 5,
            //     bottom: 5,
            // },
            fixedWidth: 0
        }
        this.ready = this.add.text(game.config.width/2, game.config.height/2, `GET READY!`, titleConfig).setOrigin(0.5);

        //create UI
        this.UI = new UI(this,300,300, 'cursor_base');
        this.UI.create();
    }
    update() {
        this.UI.update();
        this.time.delayedCall(1000, () => {
            this.UI.safety = false;
            this.ready.setVisible(false);
            if (this.enemy1.active) {
                this.enemy1.update();
            }
            if (this.enemy2.active) {
                this.enemy2.update();
            }
            if (this.enemy3.active) {
                this.enemy3.update();
            }
        })
    }
}