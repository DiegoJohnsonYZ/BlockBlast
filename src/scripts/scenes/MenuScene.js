import * as Phaser from 'phaser';

// -------------------------------------------
// Menu Scene
// -------------------------------------------
export class MenuScene extends Phaser.Scene
{
    constructor(){
        super({key: 'MenuScene'});
        this.ready = false;
    }
    
    preload(){
        this.load.image('menuBG', './src/images/bb_portrait.png');
        this.load.image('menuLogo', './src/images/lg.png');
        
    }

    init(data){
        this.data = data;
    }

    create(){
        let dim = this.game.config.width;
        this.uiScene = this.scene.get('UIScene');
        this.uiScene.setCurrentScene(this);
        this.uiScene.audioManager?.playMusic();

        this.loadingBG = this.add.image(dim/2, dim/2, 'loadingBG').setDisplaySize(dim, dim).setDepth(5).setInteractive().setVisible(false);
        this.loadingSlider = this.uiScene.rexUI.add.slider({
            x: dim/2,
            y: dim/2,
            width: 850,
            height: 60,
            orientation: 'x',
            value: 0,
            track: this.add.sprite(0,0,'loadingUI','Barra.png'),
            indicator: this.addCropResizeMethod(this.add.sprite(0,0,'loadingUI','Fill.png').setDisplaySize(770,64)),
            thumb: this.add.sprite(80,0,'loadingUI','Marcador.png').setScale(1,1),
    
            input: 'none',
            space: {
              top: 10,
              right: 35,
              left: -40,
              bottom: 4
            },
        }).layout().setDepth(5).setVisible(false);

        

        this.isPaused = false;

        window.addEventListener('touchstart', () => {this.data.set('IS_TOUCH', "true"); });

        this.sprBack = this.add.image(dim/2, dim/2, 'menuBG')
        this.sprLogo = this.add.image(dim/2, dim/2-200, 'menuLogo')
        this.startButton = this.add.image(dim/2, dim/2+350, 'menuUI', 'Play_NonClicked.png').setInteractive();
        this.startButton.setScale(1);
        this.startButton.on('pointerdown', () => 
            {
                this.nextSceneReady = false;
                this.showLoading();
                //this.uiScene.audioManager.playButtonClick.play();
            });
        
        this.helpButton = this.add.image(dim/2+210, dim/2+350,'menuUI', 'Info_NonClicked.png').setInteractive();
        this.helpButton.setScale(1);
        this.helpButton.on('pointerdown', () => { this.uiScene.panel.showInstructions(() => null); 
            //this.uiScene.audioManager.buttonClick.play(); 
        });

        this.optionsButton = this.add.image(dim/2-210, dim/2+350, 'menuUI', 'Settings_NonClicked.png').setInteractive();
        this.optionsButton.setScale(1);
        this.optionsButton.on('pointerdown', () => { this.uiScene.panel.showOptions(); 
            //this.uiScene.audioManager.buttonClick.play(); 
        });
        
        this.creditsButton = this.add.image(dim-90, 80, 'menuUI', 'Credits_NonClicked.png').setInteractive();
        this.creditsButton.setScale(.7);
        this.creditsButton.on('pointerdown', () => { this.uiScene.panel.showCredits(); 
            //this.uiScene.audioManager.buttonClick.play(); 
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
                    this.mainScene.startRunning = false;
                    //this.uiScene.audioManager.menuMusic.stop();
                    sliderTween?.remove();
                    sliderTween = null;
                    this.scene.stop();
                }
            });
        }
    }

    showLoading(){
        this.loadingBG.setVisible(true);
        this.loadingSlider.setVisible(true);

        let sliderTween = this.tweens.add({
            targets: this.loadingSlider,
            ease: 'sine.inout',
            duration: 1500,
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

        this.scene.launch('MainScene', this.data);
        this.scene.sendToBack('MainScene');
        this.mainScene = this.scene.get("MainScene");
        this.mainScene.events.once("create", () => {
            this.mainScene.startRunning = true;
            this.nextSceneReady = true
        });
    }

    addCropResizeMethod = function (gameObject) {
        gameObject.resize = function (width, height) {
            gameObject.setCrop(0, 0, width, height);
            return gameObject;
        }
    
        return gameObject;
    }

    pauseGame(){
        this.isPaused = true;
    }
}