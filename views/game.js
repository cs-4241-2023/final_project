var score = 0;
var rate = 0;
var scoretext;
var ratetext;
var icon;

let upgradeIcons = []
let upgradeCosts = [50, 300]
let upgradeRates = [5, 20]

let frames = 120
let currentFrame = 120;
class Example extends Phaser.Scene
{      

    preload ()
    {
        // this.load.setBaseURL('https://labs.phaser.io');

        // this.load.image('sky', 'assets/skies/space3.png');
        // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        // this.load.image('red', 'assets/particles/red.png');

        this.load.image('f1blue', 'assets/f1blue.png')
        this.load.image('f1green', 'assets/f1green.png')
        this.load.image('f1red', 'assets/f1red.png')

    }

    create ()
    {
        //this.add.image(400, 300, 'sky');
        
        scoretext = this.add.text(0, 0, `Points: ${score}`, { fontSize: 50 });
        ratetext = this.add.text(0, 50 , `Rate: ${rate}/sec`, { fontSize: 50 });

        // const particles = this.add.particles(500, 400, 'f1blue', {
        //     speed: 100,
        //     scale: { start: 0.75, end: 0 },
        // });

        icon = this.add.sprite(500, 400, 'f1blue').setInteractive();
        icon.on('pointerdown', this.onClick)
        // icon.setVelocity(0, 0);
        // icon.setBounce(1, 1);
        // icon.setCollideWorldBounds(true);
        icon.setScale(0.7, 0.7);
        this.add.text(50, 550, `Upgrade Shop:`, {fontSize: 30});

        upgradeIcons[0] = this.add.sprite(80    , 650, 'f1green').setInteractive();
        upgradeIcons[0].setScale(0.25, 0.25);
        upgradeIcons[0].setAlpha(0.25);   
        upgradeIcons[0].on('pointerdown', () => {onUpgrade(0)})

        this.add.text(50, 700, `Cost: ${upgradeCosts[0]}`);
        this.add.text(50, 720, `Rate: +${upgradeRates[0]}`);

        upgradeIcons[1] = this.add.sprite(230, 650, 'f1red').setInteractive();
        upgradeIcons[1].setScale(0.25, 0.25);
        upgradeIcons[1].setAlpha(0.25);   
        upgradeIcons[1].on('pointerdown', () => {onUpgrade(1)})

        this.add.text(200, 700, `Cost: ${upgradeCosts[1]}`);
        this.add.text(200, 720, `Rate: +${upgradeRates[1]}`);
    }
    update (){
        for (var i = 0; i < upgradeCosts.length; i++){
            if (score > upgradeCosts[i]){
                upgradeIcons[i].setAlpha(1.0);
            }else{
                upgradeIcons[i].setAlpha(0.25);
            }
        }
        if (currentFrame <= 0){
            score += rate;
            currentFrame = frames;
        }else{
            currentFrame--;
        }
        scoretext.text = `Points: ${score}`
        ratetext.text = `Rate: ${rate}/sec`
    }
    onClick () {
        score++;
        // const particles = this.add.particles(500, 400, 'f1blue', {
        //     speed: 100,
        //     scale: { start: 0.75, end: 0 },
        // });
    }
}

function onUpgrade (index) {
    const cost = upgradeCosts[index],
          addToRate = upgradeRates[index];

    if (score < cost){
        return;
    }
    score -= cost;
    rate += addToRate;
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