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

        //check if allowed to hit enemies
        this.safety = true;

        //rect for detection
        this.rect = this.scene.add.rectangle(this.x, this.y, this.width, this.height);//.setStrokeStyle(2, 0xffff00); //.setStrokeStyle(2, 0xffff00)

        //revolver sprite
        this.scene.revolver_ui = this.scene.add.sprite(32, game.config.height-32, 'revolver_ui_base_image');
    }

    update() {
        //rect for detection
        this.rect.x = this.x; //set rect
        this.rect.y = this.y; 
        const { left, top, width, height } = this.rect.getBounds();
        const bodiesInRect = this.scene.physics.overlapRect(left, top, width, height); //detect overlapping bodies

        if(this.rotation_lerp < 1.0) { //rotation for the revolver cylinder movement
            this.scene.revolver_ui.angle = Phaser.Math.Linear(this.current_rotation, this.final_rotation, this.rotation_lerp);
            this.rotation_lerp += 0.1; //move the cylinder
        }
        this.scene.revolver_ui.setTexture(`revolver_ui${this.shot_count}`); //change sprite based on ammo count
        
        if (MOUSE_POINTER.leftButtonDown() && this.can_fire == true) {   //left key down
            this.setScale(0.5); //when holding down make icon smaller (for player feedback)
            if (this.shot_count > 1) { //if there is ammo when shooting
                bodiesInRect.forEach(element => { //detect elements in rect
                    if (element.gameObject.constructor.name == "Button") { //if it is a button
                        if (element.gameObject.nextScene) {
                            element.gameObject.moveToNextScene(); //move to next scene
                        } else {
                            element.gameObject.interaction(); //else check for possible interaction
                        }
                    }
                    if (this.safety == false && element.gameObject.constructor.name == "enemy1") { //if object in rect is an enemy and gun safety is off, then destroy that enemy
                        element.gameObject.destroy();
                    }
                });
                this.shot_count -= 1; //decrement ammo count
                
                this.scene.sound.play('sfx_gunshot1', {volume: this.shot_count/2}); //play gunshot sound and adjust volume based on amount of ammo
                this.final_rotation += 60; //rotate cylinder 60 degrees every shot
                this.rotation_lerp = 0; //reset lerp
            }
            this.can_fire = false; //can't fire until mouse button is lifted up
        } 
        
        if (!MOUSE_POINTER.leftButtonDown()) {  //left key up
            this.setScale(1.0); //reset scale
            this.can_fire = true; //now can fire gun again
        }

        if (MOUSE_POINTER.rightButtonDown() && this.can_reload == true) { //right click to reload
            if (this.shot_count < 7) {
                this.shot_count += 1; //reload ammo
                this.scene.sound.play('sfx_reload'); //play reloading sound
                this.final_rotation -= 60; //move back 60 degrees
                this.rotation_lerp = 0; //reset lerp
            }
            this.can_reload = false; //only reload when let go (similar to shooting)
        } 
        
        if (!MOUSE_POINTER.rightButtonDown()) {
            this.can_reload = true;
        }

        if (Phaser.Input.Keyboard.JustDown(KEY_P)) { //turn cursor on or off (visually) -> this didn't really work out like I wanted to, it's a vestigal feature.
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

        this.x = MOUSE_POINTER.x; //set mouse cursor x and y coordinates.
        this.y = MOUSE_POINTER.y; 
    }

    onOverlap(other) {
        if (other.active) { //detect overlap (unnecessary leftover?)
            other.destroy();
        }
    }
}