class menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }
    preload() {
        //sounds
        this.load.audio('sfx_gunshot1', './assets/sounds/gunshot1.wav');
        this.load.audio('sfx_gunshot2', './assets/sounds/gunshot2.wav');
        this.load.audio('sfx_gunshot3', './assets/sounds/gunshot3.wav');
        this.load.audio('sfx_reload', './assets/sounds/reload.wav');
        this.load.audio('harmonica_theme', './assets/sounds/Luomo-Del-Armonica-1.WAV');
        this.load.audio('movie_theme', './assets/sounds/Ennio_Morricone__West.WAV');
        this.load.audio('bye_cheyenne', './assets/sounds/Ennio_Morricone__Bye_Cheyenne.WAV');
        //trailer background image
        this.trailer_images = [];
        this.trailer_base_image = this.load.image('trailer_base_image', './assets/trailer_images/1.png');
        for(var i=1; i<90; i++) { //menu trailer
            this.load.image(`trailer${i}`, `./assets/trailer_images/${i}.png`);
            this.trailer_images.push({key : `trailer${i}`});
        }
        
        //revolver UI
        this.revolver_ui_frames = [];
        this.revolver_ui_base_image = this.load.image('revolver_ui_base_image', './assets/revolver_ui/1.png');
        for(var i=1; i<8; i++) {
            this.load.image(`revolver_ui${i}`, `./assets/revolver_ui/${i}.png`);
            this.revolver_ui_frames.push({key: `revolver_ui${i}`});
        }
        //cursor UI
        this.load.spritesheet('cursor','./assets/cursor.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.image('cursor_base', './assets/cursor1.png');

        //load enemy images
        //ENEMY 1
        this.load.image('enemy1_base', './assets/scene1_images/gameplay/enemy1_base.png');
        this.load.spritesheet('enemy1_shooting', './assets/scene1_images/gameplay/enemy1-Sheet.png', {frameWidth: 128, frameHeight: 128, startFrame: 0, endFrame: 10});
        //ENEMY 2
        this.load.image('enemy2_base', './assets/scene1_images/gameplay/enemy2_base.png');
        this.load.spritesheet('enemy2_shooting', './assets/scene1_images/gameplay/enemy2-Sheet.png', {frameWidth: 128, frameHeight: 128, startFrame: 0, endFrame: 9});
        //ENEMY 3
        this.load.image('enemy3_base', './assets/scene1_images/gameplay/enemy3_base.png');
        this.load.spritesheet('enemy3_shooting', './assets/scene1_images/gameplay/enemy3-Sheet.png', {frameWidth: 128, frameHeight: 128, startFrame: 0, endFrame: 12});
        
    }
    create() {   
        //add music
        if (this.playMusic == null) {
            this.playMusic = this.sound.add('movie_theme');
            this.playMusic.setVolume(0.5);
            this.playMusic.setLoop(true);
        }
        this.playMusic.play(); //play the music

        //create menu background
        if(!this.anims.exists('trailer')) {
            this.anims.create({ //create animation
                key: 'trailer',
                frames: this.trailer_images,
                frameRate: 2,
                repeat: -1,
            });
        }

        this.menu_background = this.add.sprite(640/2,480/2,'trailer_base_image').setOrigin(0.5);
        this.menu_background.anims.play('trailer', true);
        this.cameras.main.setBackgroundColor(0xbababa); //set background color for main menu
        // this.input.mouse.disableContextMenu(); //disable context menu popup on left click
    

        // this.rect = this.add.rectangle(400, 300, 32, 32); //.setStrokeStyle(2, 0xffff00)
        // this.cursor = this.add.sprite(0, 0, 'cursor_base');
        // this.anims.create({
        //     key: 'cursor_animation',
        //     frames: this.anims.generateFrameNumbers('cursor', {start: 0, end: 3, first: 0}),
        //     frameRate: 15,
        //     repeat: -1,
        // })
        // this.cursor.anims.play('cursor_animation');
        // KEY_P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        // this.showCursor = true;
        
        
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
        this.add.text(game.config.width/2, game.config.height/15, 'ONCE UPON A TIME IN THE WEST: THE GAME', titleConfig).setOrigin(0.5);
        
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
        this.scene1 = new Button(this, (game.config.width/5) * 4.5, game.config.height/2 - 32 + 64, "SCENE 1", menuConfig);
        this.scene1.addSceneTransition('scene1');
        this.scene2 = new Button(this, (game.config.width/5) * 4.5, game.config.height/2 - 32 + 64 * 2, "SCENE 2", menuConfig);
        this.scene2.addSceneTransition('scene2');
        this.scene3 = new Button(this, (game.config.width/5) * 4.5, game.config.height/2 - 32 + 64 * 3, "SCENE 3", menuConfig);
        // this.scene3.addSceneTransition('scene3');

        // this.scene1.setActive(false);
        // this.scene1.setVisible(false);
        this.scene1.enableButton(false);
        this.scene2.enableButton(false);
        this.scene3.enableButton(false);

        //Add play button
        this.playButton = new Button(this, 64 * 2, game.config.height - 32, "PLAY", menuConfig);
        // this.playButton.addSceneTransition('');

        //Add Credits
        this.credits = new Button(this, 64 * 4, game.config.height - 32, "CREDITS", menuConfig);
        // this.credits.addSceneTransition('');

        //Add TUTORIAL
        // this.tutorial = new Button(this, 64 * 6, game.config.height - 32, "TUTORIAL", menuConfig);
        // this.tutorial.addSceneTransition('');
        
        let menuConfig1 = {
            fontFamily: 'Smokum',
            fontSize: '14px',
            // backgroundColor: '#816271',
            color: '#FFFFFF',
            align: 'right',
            // padding: {
            //     top: 5,
            //     bottom: 5,
            // },
            fixedWidth: 0
        }
        this.explain = new Button(this, 64 * 8, game.config.height - 32, "LEFT CLICK TO FIRE \n RIGHT CLICK TO RELOAD", menuConfig1);

        //create UI
        this.UI = new UI(this,300,300, 'cursor_base');
        this.UI.create();

    }
    update() {
        if (this.playButton.interacted) {
            this.scene1.enableButton(true);
            this.scene2.enableButton(true);
            this.scene3.enableButton(true);
        } else {
            this.scene1.enableButton(false);
            this.scene2.enableButton(false);
            this.scene3.enableButton(false);
        }

        this.UI.update();

        this.scene1.update();
    }
}