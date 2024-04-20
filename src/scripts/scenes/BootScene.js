export class BootScene extends Phaser.Scene
{
    constructor(){
        super({key: 'BootScene'})
        this.ready = false;
    }

    preload(){
        this.load.image('loadingBG', './src/images/preview.png');
        this.load.atlas('loadingUI', './src/images/ui/pantalla_opciones/sprites.png', './src/images/ui/pantalla_opciones/sprites.json');

        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create(){
        let dim = this.game.config.width;

        this.data.set('highScore', this.game.config.metadata.highScore);
        this.data.set('sponsor', this.game.config.metadata.sponsor);
        this.data.set('musicVolume', .2);
        this.data.set('sfxVolume', .2);
        let phaserDiv = document.getElementById('phaser-div');
        this.data.set('parentSize', phaserDiv.style.width);

        this.bg = this.add.image(dim/2, dim/2, 'loadingBG').setDisplaySize(dim, dim).setDepth(5).setInteractive();
        this.playButton = this.add.image(dim/2, dim/2, 'loadingUI', 'Switch_On.png').setDepth(5).setInteractive();
        this.playButton.setVisible(false).on('pointerdown', () => { this.scene.stop(); this.scene.get("MenuScene").uiScene.splashScreenAnim(); });

        this.loadingSlider = this.rexUI.add.slider({
            x: dim/2,
            y: dim/2,
            width: 650,
            height: 50,
            orientation: 'x',
            value: 0,
    
            track: this.add.sprite(0,0,'loadingUI','Barra_vacia.png'),
            indicator: this.addCropResizeMethod(this.add.sprite(0,0,'loadingUI','Barra_llena.png').setScale(.95,1)),
            thumb: this.add.sprite(0,0,'loadingUI','Button1_clicked.png').setScale(.9,.9),
    
            input: 'none',
            space: {
              top: 10,
              right: 0,
              left: -16,
              bottom: 4
            },
        }).layout().setDepth(5);

        let sliderTween = this.tweens.add({
            targets: this.loadingSlider,
            ease: 'sine.inout',
            duration: 2000,
            repeat: 0,
            value: {
              getStart: () => 0,
              getEnd: () => .9
            },
            onComplete: () => {
                sliderTween?.remove();
                sliderTween = null;
            }
        });

        this.nextSceneReady = false;
        this.scene.launch('UIScene', this.data);
        this.scene.get("UIScene").events.once("create", () => {        
            this.scene.launch('MenuScene', this.data);
            this.scene.sendToBack('MenuScene');
            this.scene.get("MenuScene").events.once("create", () => {
                this.nextSceneReady = true
            });
        });
    }

    update(){
        if (this.nextSceneReady && this.loadingSlider.value == .9) {
            this.nextSceneReady = false;
            let sliderTween = this.tweens.add({
                targets: this.loadingSlider,
                ease: 'sine.inout',
                duration: 500,
                repeat: 0,
                value: {
                  getStart: () => .9,
                  getEnd: () => 1
                },
                onComplete: () => {
                    sliderTween?.remove();
                    sliderTween = null;
                    this.loadingSlider.setVisible(false);
                    this.playButton.setVisible(true);
                }
            });
        }
    }  

    addCropResizeMethod = function (gameObject) {
        gameObject.resize = function (width, height) {
            gameObject.setCrop(0, 0, width, height);
            return gameObject;
        }
    
        return gameObject;
    }
}