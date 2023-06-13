class credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }
    preload() {
    }
    create() {
        //play music
        this.sound.play('bye_cheyenne');

        //set background color
        this.cameras.main.setBackgroundColor(0x212529); //set background color for main menu

        // menu text configuration
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
        this.add.text(game.config.width/2, game.config.height/15, 'CREDITS:', titleConfig).setOrigin(0.5);
        
        let creditConfig = {
            fontFamily: 'Smokum',
            fontSize: '14px',
            // backgroundColor: '#816271',
            color: '#ead9a7',
            align: 'right',
            // padding: {
            //     top: 5,
            //     bottom: 5,
            // },
            fixedWidth: 0
        }
        //credits
        this.add.text(game.config.width/2, game.config.height/15 + 32, 'For bit-crushing movie stills - https://giventofly.github.io/pixelit/', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/15 + 32 * 2, 'Used the color palette "SEPIA 6" - https://lospec.com/palette-list/sepia6', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/15 + 32 * 3, 'Crunched the sound using GXSCC - https://meme.institute/gxscc/', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/15 + 32 * 4, 'Original Midis From: https://www.midis101.com/search/ENNIO+MORRICONE', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/15 + 32 * 5, 'Original Midis From: http://www.acroche2.com/midi_m.html', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/15 + 32 * 6, 'REVOLVER UI (original, modified for the game): https://opengameart.org/content/revolver-ammo-icon', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/15 + 32 * 7, 'Sound Effects: https://sfxr.me/', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/15 + 32 * 8, 'Custom font Smokum from: https://fonts.google.com/specimen/Smokum', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/15 + 32 * 9, 'Sprites edited with ASEPRITE', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/15 + 32 * 10, 'Audio editied with AUDACITY', creditConfig).setOrigin(0.5);

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
        //scene buttons
        this.menu = new Button(this, (game.config.width/2) , game.config.height - 32, "MENU", menuConfig);
        this.menu.addSceneTransition('menu');

        //create UI
        this.UI = new UI(this,300,300, 'cursor_base');
        this.UI.create();
    }
    update() {
        this.UI.update(); //update UI

    }
}