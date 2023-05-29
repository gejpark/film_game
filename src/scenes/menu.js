class menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }
    preload() {

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
        
        this.rect = this.add.rectangle(400, 300, 300, 200).setStrokeStyle(2, 0xffff00);
    }
    update() {
        MOUSE_POINTER = this.input.activePointer;
        // console.log(MOUSE_POINTER.x, MOUSE_POINTER.y); //the mouse location
        // console.log(MOUSE_POINTER.isDown);//check if any mouse button is down
        // console.log( MOUSE_POINTER.leftButtonDown(), MOUSE_POINTER.rightButtonDown()); //check if left or right mouse button is down.

        // this.input.on('pointermove', (MOUSE_POINTER) =>
        // {
        //     this.rect.copyPosition(MOUSE_POINTER);
        // });
        this.rect.copyPosition(MOUSE_POINTER)
        const { left, top, width, height } = this.rect.getBounds();
        const bodiesInRect = this.physics.overlapRect(left, top, width, height);
        console.log(bodiesInRect);
    }
}