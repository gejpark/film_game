class gameover extends Phaser.Scene {
    constructor() {
        super('gameover');
    }
    preload() {

    }
    create() {
        this.cameras.main.setBackgroundColor(0x000000); //set background color for main menu

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
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', titleConfig).setOrigin(0.5);

        let menuConfig = {
            fontFamily: 'Smokum',
            fontSize: '14px',
            backgroundColor: '#816271',
            color: '#FFFFFF',
            align: 'right',
            // padding: {
            //     top: 5,
            //     bottom: 5,
            // },
            fixedWidth: 0
        }

        this.menu = new Button(this, (game.config.width/2), game.config.height - 32, "RETURN TO MENU", menuConfig);
        this.menu.addSceneTransition('menu');

        //create UI
        this.UI = new UI(this,300,300, 'cursor_base');
        this.UI.create();

    }
    update() {
        this.UI.update();

        // this.menu.update()
    }
}