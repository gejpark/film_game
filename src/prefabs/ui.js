class UI extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        // scene.physics.add.existing(this);
    }

    preload() {
        
    }

    create() {
        this.anims.create({
            key: 'cursor_animation',
            frames: this.anims.generateFrameNumbers('cursor', {start: 0, end: 3, first: 0}),
            frameRate: 15,
            repeat: -1,
        })
        this.anims.play('cursor_animation');
        this.scene.input.mouse.disableContextMenu(); //disable context menu popup on left click
        this.showCursor = true;

        //controls
        KEY_P = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        MOUSE_POINTER = this.scene.input.activePointer;

        //create revolver UI
        this.shot_count = 7;
        this.can_fire = true;
        this.can_reload = true;
        this.current_rotation = 0;
        this.final_rotation = 0;
        this.rotation_multiplier = 1;
        this.rotation_lerp = 0;

        //rect for detection
        this.rect = this.scene.add.rectangle(this.x, this.y, this.width, this.height).setStrokeStyle(2, 0xffff00); //.setStrokeStyle(2, 0xffff00)

        //revolver sprite
        this.scene.revolver_ui = this.scene.add.sprite(32, game.config.height-32, 'revolver_ui_base_image');
    
        //add sound effects
        this.sfx_gunshot1 = this.scene.sound.add('sfx_gunshot1');
        this.sfx_gunshot2 = this.scene.sound.add('sfx_gunshot2');
        this.sfx_gunshot3 = this.scene.sound.add('sfx_gunshot3');
        this.sfx_reload = this.scene.sound.add('sfx_reload');
    }

    update() {
        //rect for detection
        this.rect.x = this.x; //set rect
        this.rect.y = this.y; 
        const { left, top, width, height } = this.rect.getBounds();
        const bodiesInRect = this.scene.physics.overlapRect(left, top, width, height); //detect overlapping bodies
        // console.log(bodiesInRect);


        if(this.rotation_lerp < 1.0) {
            this.scene.revolver_ui.angle = Phaser.Math.Linear(this.current_rotation, this.final_rotation, this.rotation_lerp);
            this.rotation_lerp += 0.1;
        }
        this.scene.revolver_ui.setTexture(`revolver_ui${this.shot_count}`);
        
        if (MOUSE_POINTER.leftButtonDown() && this.can_fire == true) {   //left key down
            this.setScale(0.5);
            if (this.shot_count > 1) {
                this.shot_count -= 1;
                // this.scene.sound.play('sfx_gunshot1');
                this.sfx_gunshot1.setVolume(this.shot_count/2);
                this.sfx_gunshot1.play();
                this.final_rotation += 60;
                this.rotation_lerp = 0;
            }
            this.can_fire = false;
        } 
        
        if (!MOUSE_POINTER.leftButtonDown()) {                                //left key up
            this.setScale(1.0);
            this.can_fire = true;
        }

        if (MOUSE_POINTER.rightButtonDown() && this.can_reload == true) {
            if (this.shot_count < 7) {
                this.shot_count += 1;
                // this.sfx_reload.setVolume((7-this.shot_count));
                this.sfx_reload.play();
                this.final_rotation -= 60;
                this.rotation_lerp = 0;
            }
            this.can_reload = false;
        } 
        
        if (!MOUSE_POINTER.rightButtonDown()) {
            this.can_reload = true;
        }

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
        // // console.log(this.showCursor);

        this.x = MOUSE_POINTER.x;
        this.y = MOUSE_POINTER.y;
    }

    onOverlap(other) {
        if (other.active) {
            other.destroy();
        }
    }
}