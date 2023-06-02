class menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }
    preload() {    
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
    }
    create() {        

        //create menu background
        this.anims.create({ //create animation
            key: 'trailer',
            frames: this.trailer_images,
            frameRate: 2,
            repeat: -1,
        });

        this.menu_background = this.add.sprite(640/2,480/2,'trailer_base_image').setOrigin(0.5);
        this.menu_background.anims.play('trailer', true);
        this.cameras.main.setBackgroundColor(0xbababa); //set background color for main menu
        // this.input.mouse.disableContextMenu(); //disable context menu popup on left click
        
        this.UI = new UI(this,300,300, 'cursor_base');

        // this.rect = this.add.rectangle(400, 300, 32, 32); //.setStrokeStyle(2, 0xffff00)
        // this.cursor = this.add.sprite(0, 0, 'cursor_base');
        // this.anims.create({
        //     key: 'cursor_animation',
        //     frames: this.anims.generateFrameNumbers('cursor', {start: 0, end: 3, first: 0}),
        //     frameRate: 15,
        //     repeat: -1,
        // })
        // this.cursor.anims.play('cursor_animation');
        KEY_P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.showCursor = true;
        
        
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Trebuchet MS',
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
        this.add.text(game.config.width/2, game.config.height/15, 'ONCE UPON A TIME IN THE WEST: THE GAME', menuConfig).setOrigin(0.5);
        
        
        this.UI.create();
    }
    update() {
        this.UI.update();
    }
}