var score = 500;
var rate = 0;
var scoretext;
var ratetext;
var icon;
var emitter_count = 0;
let upgradeIcons = []
let upgradeCosts = [50, 300]
let upgradeRates = [5, 20]

let frames = 120
let currentFrame = 120;
class Example extends Phaser.Scene {

    preload() {
        this.load.image('f1blue', 'assets/f1blue.png')
        this.load.image('f1green', 'assets/f1green.png')
        this.load.image('f1red', 'assets/f1red.png')
        this.load.image('star_red', 'assets/star_red.png')
        this.load.image('star_green', 'assets/star_green.png')

        this.load.spritesheet('blue_idle', 'assets/animations/spritesheet_blue.png', { frameWidth: 400, frameHeight: 360 });
        this.load.spritesheet('green_idle', 'assets/animations/spritesheet_green.png', { frameWidth: 400, frameHeight: 360 });
        this.load.spritesheet('red_idle', 'assets/animations/spritesheet_red.png', { frameWidth: 400, frameHeight: 360 });

    }

    create() {
        scoretext = this.add.text(0, 0, `Points: ${score}`, { fontSize: 50 });
        ratetext = this.add.text(0, 50, `Rate: ${rate}/sec`, { fontSize: 50 });

        icon = this.add.sprite(500, 400, 'f1blue').setInteractive();

        this.anims.create({
            key: 'blue_idle',
            frames: this.anims.generateFrameNumbers('blue_idle', { frames: [0, 1, 2, 3] }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'green_idle',
            frames: this.anims.generateFrameNumbers('green_idle', { frames: [0, 1, 2, 3] }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'red_idle',
            frames: this.anims.generateFrameNumbers('red_idle', { frames: [0, 1, 2, 3] }),
            frameRate: 5,
            repeat: -1
        });

        icon.play('blue_idle');

        icon.on('pointerdown', this.onClick)
            // icon.setVelocity(0, 0);
            // icon.setBounce(1, 1);
            // icon.setCollideWorldBounds(true);
        icon.setScale(0.7, 0.7);
        this.add.text(50, 550, `Upgrade Shop:`, { fontSize: 30 });

        upgradeIcons[0] = this.add.sprite(80, 650, 'f1green').setInteractive();
        upgradeIcons[0].setScale(0.25, 0.25);
        upgradeIcons[0].setAlpha(0.25);
        upgradeIcons[0].on('pointerdown', () => { this.onUpgrade(0) })

        this.add.text(50, 700, `Cost: ${upgradeCosts[0]}`);
        this.add.text(50, 720, `Rate: +${upgradeRates[0]}`);

        upgradeIcons[1] = this.add.sprite(230, 650, 'f1red').setInteractive();
        upgradeIcons[1].setScale(0.25, 0.25);
        upgradeIcons[1].setAlpha(0.25);
        upgradeIcons[1].on('pointerdown', () => { this.onUpgrade(1) })

        this.add.text(200, 700, `Cost: ${upgradeCosts[1]}`);
        this.add.text(200, 720, `Rate: +${upgradeRates[1]}`);
    }
    update() {
        for (var i = 0; i < upgradeCosts.length; i++) {
            if (score > upgradeCosts[i]) {
                upgradeIcons[i].setAlpha(1.0);
            } else {
                upgradeIcons[i].setAlpha(0.25);
            }
        }
        if (currentFrame <= 0) {
            score += rate;
            currentFrame = frames;
        } else {
            currentFrame--;
        }
        scoretext.text = `Points: ${score}`
        ratetext.text = `Rate: ${rate}/sec`
    }
    onClick() {
        score++;
        spawned = this.add.sprite(400, 360, 'f1blue');

        // const particles = this.add.particles(500, 400, 'f1blue', {
        //     speed: 100,
        //     scale: { start: 0.75, end: 0 },
        // });
    }
    onUpgrade(index) {
        console.log(rate);
        if (emitter_count === 0 && index === 0) {
            this.add.particles(500, 400, 'star_green', {
                x: { random: [-250, 250] },
                lifespan: 2000,
                gravityY: 200,
                frequency: 400,
                scale: { min: 0.2, max: .6 },
                blendMode: 'ADD',
                alpha: 80
            });
            emitter_count++;
            icon.play('green_idle');
        } else if (emitter_count === 1 && index === 1) {
            this.add.particles(500, 400, 'star_red', {
                x: { random: [-250, 250] },
                lifespan: 2000,
                gravityY: 200,
                frequency: 150,
                scale: { min: 0.5, max: 1.0 },
                blendMode: 'ADD',
                alpha: 80
            });
            emitter_count++;
            icon.play('red_idle');
        }
        const cost = upgradeCosts[index],
            addToRate = upgradeRates[index];

        if (score < cost) {
            return;
        }
        score -= cost;
        rate += addToRate;
    }
}



const config = {
    type: Phaser.AUTO,
    // width: 1600,
    // height: 1200,
    scale: {
        mode: Phaser.Scale.FIT
    },
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);