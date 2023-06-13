class scene3 extends Phaser.Scene {
    constructor() {
        super('scene3');
    }
    preload() {
        //load base image
        this.scene3_base_image = this.load.image('scene3_base_image', './assets/scene3_images/scene3_intro/1.png'); //base image for animations to play on

        //third scene intro animation images prelaod
        this.scene3_start_images = [];
        this.started_intro_animation = false; //check if animation played.
        for(var i=1; i<387; i++) { //load animations
            this.load.image(`scene3_images${i}`, `./assets/scene3_images/scene3_intro/${i}.png`);
            this.scene3_start_images.push({key : `scene3_images${i}`});
        }

        //third scene gameplay animation images preload
        this.scene3_gameplay_images = [];
        this.started_gameplay_animation = false; //check if animation played.
        for(var i=1; i<387; i++) { //load animations
            this.load.image(`scene3_images${i}`, `./assets/scene3_images/scene3_intro/${i}.png`);
            this.scene3_start_images.push({key : `scene3_images${i}`});
        }

        //third scene outro animation images preload
        this.started_outro_animation = false; //check if animation played.

    }
    create() {
        //set background color
        this.cameras.main.setBackgroundColor(0x000000); //set background color for main menu

        //add music
        if (this.playMusic == null) {
            this.playMusic = this.sound.add('harmonica_theme');
            this.playMusic.setVolume(0.5);
            this.playMusic.setLoop(true);
        }
        this.playMusic.play(); //play the music

        //scene status 1 = intro, 2 = gameplay
        this.scene_status = 1;

        //create intro animation.
        if(!this.anims.exists('scene3_start_background')) {
            this.anims.create({ //create animation
                key: 'scene3_start_background',
                frames: this.scene3_start_images,
                frameRate: 4,
                repeat: 0,
            });
        }
        this.scene3_start_background = this.add.sprite(640/2,480/2,'scene3_base_image').setOrigin(0.5); 
        
        
        //this.scene3_gameplay_background;
        //this.scene3_outro_background;

    }
    update() {
        if (this.scene_status == 1) {
            if (this.started_intro_animation == false) {
                this.scene3_start_background.anims.play('scene3_start_background', true);
                this.started_intro_animation = true;
            }
            this.scene3_start_background.on('animationcomplete', () => {
                this.scene3_start_background.setVisible(false);
                this.scene_status = 2;
            })
        }
    }
}