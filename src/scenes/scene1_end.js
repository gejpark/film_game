class scene1_end extends Phaser.Scene {
    constructor() {
        super('scene1_end');
    }
    preload() {
        //first scene animation
        this.scene1_images = [];
        this.scene1_base_image = this.load.image('scene1_base_image', './assets/scene1_images/12.png');
        for(var i=12; i<20; i++) { //menu trailer
            this.load.image(`scene1_images${i}`, `./assets/scene1_images/${i}.png`);
            this.scene1_images.push({key : `scene1_images${i}`});
        }
    }
    create() {
        //create scene1 end animation.
        if(!this.anims.exists('scene1_end_background')) {
            this.anims.create({ //create animation
                key: 'scene1_end_background',
                frames: this.scene1_images,
                frameRate: 2,
                repeat: 0,
            });
        }

        this.scene1_start_background = this.add.sprite(640/2,480/2,'scene1_base_image').setOrigin(0.5);

        this.do_animation = false;

        //create UI
        this.UI = new UI(this,300,300, 'cursor_base');
        this.UI.create();
    }

    update() {
        this.UI.update(); //update the UI

        if(this.do_animation == false) {
            this.scene1_start_background.anims.play('scene1_end_background', true);
            this.do_animation = true;
        }
        this.scene1_start_background.on('animationcomplete', () => {
            game.sound.stopAll();
            this.scene.start('menu');
        })
    }
}