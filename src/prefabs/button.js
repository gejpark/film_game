class Button extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style);
        scene.add.existing(this).setOrigin(0.5);
        // this.x = x;
        // this.y = y;
        this.detect = scene.physics.add.existing(this);
        this.scene_name = "";
        this.nextScene = false;
        this.interacted = false;
        // this.rect = this.scene.add.rectangle(this.x, this.y, this.width, this.height).setStrokeStyle(2, 0xffff00).setOrigin(0.0);
    }
    
    addSceneTransition(scene_name) {
        this.scene_name = scene_name;
        this.nextScene = true;
    }

    moveToNextScene() {
        if (this.active == true) {
            this.scene.scene.start(this.scene_name);
        }
    }

    interaction() {
        this.interacted = !this.interacted;
    }

    enableButton(check=true) {
        // console.log(this.active);
        // console.log(this.body);
        // this.body.enable = check;
        // this.body.checkCollision.none = true;
        this.setActive(check);
        this.setVisible(check);
    }

    update() {
        // console.log(this.width, this.height);
    }
}