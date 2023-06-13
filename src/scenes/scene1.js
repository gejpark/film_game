class scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }
    preload() {
        this.load.image('scene1_background', './assets/scene1_images/gameplay/scene1_background.png');
        
        //first scene intro animation images prelload
        this.scene1_start_images = [];
        this.scene1_base_image = this.load.image('scene1_base_image', './assets/scene1_images/1.png');
        for(var i=1; i<12; i++) { //menu trailer
            this.load.image(`scene1_images${i}`, `./assets/scene1_images/${i}.png`);
            this.scene1_start_images.push({key : `scene1_images${i}`});
        }

        //first scene ending animation
        this.scene1_end_images = [];
        // this.scene1_base_image = this.load.image('scene1_base_image', './assets/scene1_images/12.png');
        for(var i=12; i<20; i++) { //menu trailer
            this.load.image(`scene1_images${i}`, `./assets/scene1_images/${i}.png`);
            this.scene1_end_images.push({key : `scene1_images${i}`});
        }
    }
    create() {
        //scene status 1 = intro, 2 = gameplay
        this.scene_status = 1;
        this.do_animation = false; //check if intro animation played.
        //create scene1 intro animation
        if(!this.anims.exists('scene1_start_background')) {
            this.anims.create({ //create animation
                key: 'scene1_start_background',
                frames: this.scene1_start_images,
                frameRate: 2,
                repeat: 0,
            });
        }
        this.scene1_start_background = this.add.sprite(640/2,480/2,'scene1_base_image').setOrigin(0.5);

        //create scene1 end animation.
        if(!this.anims.exists('scene1_end_background')) {
            this.anims.create({ //create animation
                key: 'scene1_end_background',
                frames: this.scene1_end_images,
                frameRate: 2,
                repeat: 0,
            });
        }

        // load texture configuration
        let menuConfig = {
            fontFamily: 'Smokum',
            fontSize: '14px',
            color: '#000000',
            align: 'right',
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/15, 'SCENE 1', menuConfig).setOrigin(0.5);
        this.scene1_background = this.add.sprite(0, 0, 'scene1_background').setOrigin(0);
        this.scene1_background.setVisible(false);

        //create enemies
        this.enemy1 = new enemy1(this, game.config.width * (9/10), game.config.height * (2/3), 'enemy1_base');
        this.enemy1.create();
        this.enemy2 = new enemy1(this, game.config.width * (5/10), game.config.height * (2/3), 'enemy2_base');
        // this.enemy2.setAnimationType('enemy2');
        this.enemy2.create('enemy2'); //set the enemy type
        this.enemy3 = new enemy1(this, game.config.width * (1/10), game.config.height * (2/3), 'enemy3_base');
        // this.enemy3.setAnimationType('enemy3');
        this.enemy3.create('enemy3');
        this.enemy1.setVisible(false);
        this.enemy2.setVisible(false);
        this.enemy3.setVisible(false);

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
        this.ready = this.add.text(game.config.width/2, game.config.height/2, `GET READY!`, titleConfig).setOrigin(0.5);
        this.ready.setVisible(false); //set invisible

        //create UI
        this.UI = new UI(this,300,300, 'cursor_base');
        this.UI.create();
    }
    update() {
        this.UI.update(); //update the UI

        if (this.scene_status == 1) { //play intro
            if(this.do_animation == false) {
                this.scene1_start_background.anims.play('scene1_start_background', true);
                this.do_animation = true;
            }
            this.scene1_start_background.on('animationcomplete', () => {
                // game.sound.stopAll();
                // this.scene.start('scene1');
                this.scene1_start_background.setVisible(false); //when animation completes, reset the scene
                this.scene1_background.setVisible(true);
                this.enemy1.setVisible(true);
                this.enemy2.setVisible(true);
                this.enemy3.setVisible(true);
                this.ready.setVisible(true);
                this.scene_status = 2;
            })
        }

        if (this.scene_status == 2) { //gameplay part
            this.time.delayedCall(1000, () => {
                this.UI.safety = false;
                this.ready.setVisible(false);
                if (this.enemy1.active) {
                    this.enemy1.update();
                }
                if (this.enemy2.active) {
                    this.enemy2.update();
                }
                if (this.enemy3.active) {
                    this.enemy3.update();
                }
            })

            if (this.enemy1.active && this.enemy1.fired) {
                this.scene.start('gameover');
            }
            if (this.enemy2.active && this.enemy2.fired) {
                this.scene.start('gameover');
            }
            if (this.enemy3.active && this.enemy3.fired) {
                this.scene.start('gameover');
            }

            if(!this.enemy1.active && !this.enemy2.active && !this.enemy3.active) { //when all enemies are destroyed, play outro
                // console.log("ALL DONE");
                // game.sound.stopAll();
                // this.time.delayedCall(100, () => {
                //     this.scene.start('menu');
                // })
                this.scene1_background.anims.play('scene1_end_background', true);
                this.scene1_background.on('animationcomplete', () => { //on outro end, return to menu
                    // game.sound.stopAll();
                    this.scene.start('menu');
                });
            }
        }
    }
}