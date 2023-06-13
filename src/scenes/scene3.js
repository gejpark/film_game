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
            this.load.image(`scene3_start_images${i}`, `./assets/scene3_images/scene3_intro/${i}.png`);
            this.scene3_start_images.push({key : `scene3_start_images${i}`});
        }

        //third scene gameplay animation images preload
        this.scene3_gameplay_images = [];
        this.started_gameplay_animation = false; //check if animation played.
        for(var i=1; i<13; i++) { //load animations
            this.load.image(`scene3_gameplay_images${i}`, `./assets/scene3_images/scene3_gameplay/${i}.png`);
            this.scene3_gameplay_images.push({key : `scene3_gameplay_images${i}`});
        }

        //third scene outro animation images preload
        this.scene3_outro_images = [];
        this.started_outro_animation = false; //check if animation played.
        for(var i=1; i<103; i++) { //load animations
            this.load.image(`scene3_outro_images${i}`, `./assets/scene3_images/scene3_outro/${i}.png`);
            this.scene3_outro_images.push({key : `scene3_outro_images${i}`});
        }

    }
    create() {
        //did player shoot gun?
        this.fired_gun = false;

        //set background color
        this.cameras.main.setBackgroundColor(0x000000); //set background color for main menu

        //play Harmonica's Theme
        this.sound.play('harmonica_theme');

        //scene status 1 = intro, 2 = gameplay
        this.scene_status = 1;

        //create intro animation.
        if(!this.anims.exists('scene3_start_background')) {
            this.anims.create({ //create animation
                key: 'scene3_start_background',
                frames: this.scene3_start_images,
                frameRate: 4, //4
                repeat: 0,
            });
        }
        //create gameplay animation.
        if(!this.anims.exists('scene3_gameplay_background')) {
            this.anims.create({ //create animation
                key: 'scene3_gameplay_background',
                frames: this.scene3_gameplay_images,
                frameRate: 4, //4
                repeat: 0,
            });
        }
        //create outro animation.
        if(!this.anims.exists('scene3_outro_background')) {
            this.anims.create({ //create animation
                key: 'scene3_outro_background',
                frames: this.scene3_outro_images,
                frameRate: 4, 
                repeat: 0,
            });
        }



        //add base background for all animations to play on
        this.scene3_start_background = this.add.sprite(640/2,480/2,'scene3_base_image').setOrigin(0.5); 
        
        //ready to fire text
        //textbox
        let titleConfig = {
            fontFamily: 'Smokum',
            fontSize: '24px',
            // backgroundColor: '#816271',
            color: '#FFFFFF',
            align: 'right',
            // padding: {
            //     top: 5,
            //     bottom: 5,
            // },
            fixedWidth: 0
        }
        this.ready = this.add.text(game.config.width/2, game.config.height/2, `SHOOT!`, titleConfig).setOrigin(0.5);
        this.ready.setVisible(false); //set invisible

        //create UI
        this.UI = new UI(this,300,300, 'cursor_base');
        this.UI.create();
    }
    update() {
        this.UI.update(); //update the UI

        if (this.scene_status == 1) {
            if (this.started_intro_animation == false) {
                this.scene3_start_background.anims.play('scene3_start_background', true);
                this.started_intro_animation = true;
            }
            this.scene3_start_background.on('animationcomplete', () => {
                // this.scene3_start_background.setVisible(false);
                this.scene_status = 2;
            })
        }

        if (this.scene_status == 2) {
            this.ready.setVisible(true); //set visible
            if(MOUSE_POINTER.leftButtonDown()) {
                this.fired_gun = true;
            }
            if (this.started_gameplay_animation == false) {
                this.scene3_start_background.anims.play('scene3_gameplay_background', true);
                this.started_gameplay_animation = true;
            }
            this.scene3_start_background.on('animationcomplete', () => {
                this.ready.setVisible(false); //set invisible
                if (!this.fired_gun) {
                    game.sound.stopAll();
                    this.scene.start('gameover');
                }
                // this.scene3_start_background.setVisible(false);
                this.scene_status = 3;
            })
        }

        if (this.scene_status == 3) {
            if (this.started_outro_animation == false) {
                this.scene3_start_background.anims.play('scene3_outro_background', true);
                this.started_outro_animation = true;
            }
            this.scene3_start_background.on('animationcomplete', () => {
                // this.scene3_start_background.setVisible(false);
                // this.scene_status = 3;
                //exit to menu
                game.sound.stopAll();
                // this.playMusic.stop();
                this.scene_status = 4;
            })
        }
        
        if(this.scene_status == 4) {
            this.scene.start('menu');
        }
    }
}