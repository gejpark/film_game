class scene1_start extends Phaser.Scene {
    constructor() {
        super('scene1_start');
    }
    preload() {
        //first scene animation
        this.scene1_images = [];
        this.scene1_base_image = this.load.image('scene1_base_image', './assets/scene1_images/1.png');
        for(var i=1; i<12; i++) { //menu trailer
            this.load.image(`scene1_images${i}`, `./assets/scene1_images/${i}.png`);
            this.scene1_images.push({key : `scene1_images${i}`});
        }
    }
    create() {
        //create menu background
        this.anims.create({ //create animation
            key: 'scene1_start_background',
            frames: this.scene1_images,
            frameRate: 2,
            repeat: 0,
        });

        this.scene1_start_background = this.add.sprite(640/2,480/2,'scene1_base_image').setOrigin(0.5);

        this.do_animation = false;
    }

    update() {
        if(this.do_animation == false) {
            this.scene1_start_background.anims.play('scene1_start_background', true);
            this.do_animation = true;
        }
        this.scene1_start_background.on('animationcomplete', () => {
            this.scene.start('scene1');
        })
    }
}