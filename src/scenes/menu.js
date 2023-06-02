class menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }
    preload() {
        this.load.spritesheet('cursor','./assets/cursor.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.image('cursor_base', './assets/cursor1.png');
        
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
        this.input.mouse.disableContextMenu(); //disable context menu popup on left click
        
        this.rect = this.add.rectangle(400, 300, 32, 32); //.setStrokeStyle(2, 0xffff00)
        // this.image1 = this.add.image(320, 320, 'cursor_base'); // default origin is 0.5 = the center
        this.cursor = this.add.sprite(0, 0, 'cursor_base');
        this.anims.create({
            key: 'cursor_animation',
            frames: this.anims.generateFrameNumbers('cursor', {start: 0, end: 3, first: 0}),
            frameRate: 15,
            repeat: -1,
        })
        this.cursor.anims.play('cursor_animation');
        // KEY_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESCAPE);
        // KEY_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        KEY_P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        // document.body.style.cursor = 'none';
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
        
        //create revolver UI
        this.shot_count = 7;
        this.can_fire = true;
        this.can_reload = true;
        this.current_rotation = 0;
        this.final_rotation = 0;
        this.rotation_multiplier = 1;
        this.rotation_lerp = 0;
        // this.anims.create({
        //     key: 'revolver_ui',
        //     frames: this.revolver_ui_frames,
        //     frameRate: 2,
        //     repeat: -1,
        // })
        this.revolver_ui = this.add.sprite(32, game.config.height-32, 'revolver_ui_base_image');
        // this.revolver_ui.anims.play('revolver_ui');
    }
    update() {


        if (Phaser.Input.Keyboard.JustDown(KEY_P)) { //turn cursor on or off (visually)
            if(this.showCursor == true) {
                this.showCursor = false;
            } else {
                this.showCursor = true;
            }
        }
        if(this.showCursor == true) { //turn cursor on or off (visually)
            document.body.style.cursor = '';
        } else {
            document.body.style.cursor = 'none';
        }
        // console.log(this.showCursor);

        MOUSE_POINTER = this.input.activePointer;

        // console.log(MOUSE_POINTER.x, MOUSE_POINTER.y); //the mouse location
        // console.log(MOUSE_POINTER.isDown);//check if any mouse button is down
        // console.log( MOUSE_POINTER.leftButtonDown(), MOUSE_POINTER.rightButtonDown()); //check if left or right mouse button is down.
        
        // this.revolver_ui.rotation += 0.01;
        if(this.rotation_lerp < 1.0) {
            this.revolver_ui.angle = Phaser.Math.Linear(this.current_rotation, this.final_rotation, this.rotation_lerp);
            this.rotation_lerp += 0.1;
        }
        // console.log(this.revolver_ui.rotation);
        console.log(this.shot_count);
        this.revolver_ui.setTexture(`revolver_ui${this.shot_count}`);
        
        if (MOUSE_POINTER.leftButtonDown() && this.can_fire == true) {   //left key down
            this.cursor.setScale(0.75);
            if (this.shot_count > 1) {
                this.shot_count -= 1;
                this.final_rotation += 60;
                this.rotation_lerp = 0;
            }
            this.can_fire = false;
        } 
        
        if (!MOUSE_POINTER.leftButtonDown()) {                                //left key up
            this.cursor.setScale(1.0);
            this.can_fire = true;
        }

        if (MOUSE_POINTER.rightButtonDown() && this.can_reload == true) {
            if (this.shot_count < 7) {
                this.shot_count += 1;
                this.final_rotation -= 60;
                this.rotation_lerp = 0;
            }
            this.can_reload = false;
        } 
        if (!MOUSE_POINTER.rightButtonDown()) {
            this.can_reload = true;
        }


        // if (this.can_fire == true) {
        //     if (this.shot_count < 7) {
        //         this.shot_count += 1;
        //     }
        //     this.can_fire = false;
        // }

        // this.input.on('pointerdown', pointer => {
        //     console.log("HERE");
        // }, this);

        // this.input.on('pointermove', (MOUSE_POINTER) =>
        // {
        //     this.rect.copyPosition(MOUSE_POINTER);
        // });
        this.cursor.x = MOUSE_POINTER.x;
        this.cursor.y = MOUSE_POINTER.y;
        
        this.rect.copyPosition(MOUSE_POINTER)
        const { left, top, width, height } = this.rect.getBounds();
        const bodiesInRect = this.physics.overlapRect(left, top, width, height);
        // console.log(bodiesInRect); //check what's in the rect.
    }
}