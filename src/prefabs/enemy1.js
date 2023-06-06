class enemy1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    create(name='enemy1') {
        this.anims.create({
            key: 'enemy1_shooting',
            frames: this.anims.generateFrameNumbers('enemy1_shooting', {start: 0, end: 10, first: 0}),
            frameRate: 5,
            repeat: 0,
        });
        this.anims.create({
            key: 'enemy2_shooting',
            frames: this.anims.generateFrameNumbers('enemy2_shooting', {start: 0, end: 9, first: 0}),
            frameRate: 5,
            repeat: 0,
        });
        this.anims.create({
            key: 'enemy3_shooting',
            frames: this.anims.generateFrameNumbers('enemy3_shooting', {start: 0, end: 12, first: 0}),
            frameRate: 5,
            repeat: 0,
        });
        //add sound effects
        // this.sfx_gunshot1 = this.scene.sound.add('sfx_gunshot1');
        this.sfx_gunshot2 = this.scene.sound.add('sfx_gunshot2');
        this.sfx_gunshot3 = this.scene.sound.add('sfx_gunshot3');

        //only do animation once.
        this.do_animation = false;
        this.fired = false; // did the enemy shoot?

        //set animation type
        this.animation_type = name;
    }

    // setAnimationType(name='enemy1') {
    //     // console.log(HERE);
    //     this.animation_type = name;
    // }

    update() {
        //if enemy completes shooting animation, game over!
        if(this.do_animation == false) {
            this.anims.play(`${this.animation_type}_shooting`, true);
            this.do_animation = true;
        }
        this.on('animationcomplete', () => {
            console.log("ANIMATION DONE");
            this.sfx_gunshot2.setVolume(3);
            this.sfx_gunshot3.setVolume(3);
            if(Math.random() > 0.5) {
                this.sfx_gunshot2.play();
            } else {
                this.sfx_gunshot3.play();
            }
            this.fired = true; //enemy fired their gun
        })
        
        // if (this.do_animation == false) {
        //     this.anims.play('enemy_shooting');
        //     this.do_animation = true;
        // }
        // if (this.do_animation == true) {
        //     this.on('animationcomplete', () => {
        //         console.log("ANIMATION DONE");
        //     })
        // }
    }
}