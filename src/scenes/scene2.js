class scene2 extends Phaser.Scene {
    constructor() {
        super('scene2');
    }
    preload() {
        this.load.image('scene1_background', './assets/scene1_images/gameplay/scene1_background.png');
    }
    create() {

        //set background color
        this.cameras.main.setBackgroundColor(0xb47d58); //set background color for main menu
        
        //add background:
        // this.scene2_background = this.add.sprite(0, 0, 'scene1_background').setOrigin(0);

        this.enemies = []; //list of enemies
        this.spawnTimer = 0; //create spawn timer to spawn enemies
        this.spawnTimerInterval = 100; //interval between spawning enemies.
        this.gameTimer = 0; //keep track of game time
        this.maxGameTime = 1200; //maximum length of game.

        //create timer
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
        this.timerText = this.add.text(game.config.width/2, 64, `TIME LEFT: ${this.maxGameTime - this.gameTimer}`, titleConfig).setOrigin(0.5); //text timer
        this.ready = this.add.text(game.config.width/2, game.config.height/2, `GET READY!`, titleConfig).setOrigin(0.5); //Ready message.
        this.readyDone = false;

        //create UI
        this.UI = new UI(this,300,300, 'cursor_base');
        this.UI.create();
        this.UI.safety = false; //CHECK
    }
    update() {
        this.UI.update(); //update UI
        
        // this.time.delayedCall(5000, () => { //return to menu after certain amount of time.
        //     this.scene.start('menu');
        // })

        this.time.delayedCall(1000, () => {
            this.ready.setVisible(false); //remove ready message
            this.readyDone = true;
        })
        if (this.readyDone) {
            this.gameTimer += 1; //start game and spawn timers.
            this.spawnTimer += 1;
        }

        this.timerText.text = `TIME LEFT: ${this.maxGameTime - this.gameTimer}`;
        // this.gameTimer += 1;
        if (this.gameTimer > this.maxGameTime) { //end the scene after a certain amount of time.
            this.enemies.forEach(enemy => { //for each enemy
                enemy.destroy(); //destroy all enemies.
            });
            this.scene.start('menu'); 
        }

        // this.spawnTimer += 1;
        if (this.spawnTimer > this.spawnTimerInterval) {
            let randomVal = Math.random() * 3 + 1; //have a random value decide the type of enemy (1, 2, or 3)
            let enemyType = `enemy${Math.floor(randomVal)}`;
            let x = 128 + (game.config.width - 128*2) * Math.random(); //set x and y so that sprites don't fall outside of screen (128*128)
            let y = game.config.height/2;

            this.enemies.push(new enemy1(this, x, y, `${enemyType}_base`));
            this.enemies.at(-1).create(enemyType); //set the enemy type
            this.spawnTimerInterval = Math.max(this.spawnTimerInterval-0.5,35); //decrement spawnTimerInterval, spawn more enemies
            this.spawnTimer = 0; //reset the spawn timer.
        }
        this.enemies = this.enemies.filter(enemy => enemy.active == true); //remove inactive enemies
        this.enemies.forEach(enemy => { //for each enemy
            enemy.update(); //update behavior
            if(enemy.fired) { //if any of them successfully completes their firing animation
                this.scene.start('gameover'); //...then gameover.
            }
        });
    }
}