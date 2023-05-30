class menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }
    preload() {
        this.load.spritesheet('cursor','./assets/cursor.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.image('cursor_base', './assets/cursor1.png');
    }
    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Trebuchet MS',
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
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'ONCE UPON A TIME IN THE WEST: THE GAME', menuConfig).setOrigin(0.5);
        this.cameras.main.setBackgroundColor(0xbababa); //set background color for main menu
        this.input.mouse.disableContextMenu(); //disable context menu popup on left click
        
        this.rect = this.add.rectangle(400, 300, 32, 32).setStrokeStyle(2, 0xffff00);
        // this.image1 = this.add.image(320, 320, 'cursor_base'); // default origin is 0.5 = the center
        this.cursor = this.add.sprite(0, 0, 'cursor_base');
        this.anims.create({
            key: 'cursor_animation',
            frames: this.anims.generateFrameNumbers('cursor', {start: 0, end: 3, first: 0}),
            frameRate: 15,
            repeat: -1,
        })
        this.cursor.anims.play('cursor_animation');
        KEY_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESCAPE);
        // document.body.style.cursor = 'none';
        this.showCursor = true;
    }
    update() {
        if(KEY_ESC.isDown) {
            if(this.showCursor == false){
                this.showCursor = true;
            } else {
                this.showCursor = false;
            }
        }
        if(this.showCursor = true) {
            document.body.style.cursor = '';
        } else {
            document.body.style.cursor = 'none';
        }
        console.log(this.showCursor);

        MOUSE_POINTER = this.input.activePointer;

        // console.log(MOUSE_POINTER.x, MOUSE_POINTER.y); //the mouse location
        // console.log(MOUSE_POINTER.isDown);//check if any mouse button is down
        // console.log( MOUSE_POINTER.leftButtonDown(), MOUSE_POINTER.rightButtonDown()); //check if left or right mouse button is down.

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