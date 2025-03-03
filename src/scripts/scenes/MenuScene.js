import * as Phaser from 'phaser';
import {ResourceLoader} from '../components/resourceLoader.js';
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
        this.load.atlas('menuBG', ResourceLoader.ReturnPath()+'/images/portrait/sprites.png', ResourceLoader.ReturnPath()+'/images/portrait/sprites.json');
        this.load.image('cloud_a', ResourceLoader.ReturnPath()+'/images/portrait/portada_clouds_a.png');
        this.load.image('cloud_b', ResourceLoader.ReturnPath()+'/images/portrait/portada_clouds_b.png');
        this.load.image('cloud_c', ResourceLoader.ReturnPath()+'/images/portrait/portada_clouds_c.png');
        this.load.image('menuLogo', ResourceLoader.ReturnPath()+'/images/lg.png');
        this.load.image('phillipLogo', ResourceLoader.ReturnPath()+'/images/logo_menu.png');
        
    }

    init(data){
        this.data = data;
    }

    create(){
        let dim = this.game.config.width;
        this.uiScene = this.scene.get('UIScene');
        this.uiScene.setCurrentScene(this);

        this.loadingBG = this.add.image(dim/2, dim/2, 'loadingBG').setDisplaySize(dim, dim).setDepth(5).setInteractive().setVisible(false);
        this.loadingSlider = this.uiScene.rexUI.add.slider({
            x: dim/2,
            y: dim/2,
            width: 600,
            height: 60,
            orientation: 'x',
            value: 0,
            track: this.add.sprite(0,0,'loadingUI','Barra.png'),
            indicator: this.addCropResizeMethod(this.add.sprite(0,0,'loadingUI','Fill.png').setDisplaySize(680,64)),
            thumb: this.add.sprite(80,0,'loadingUI','Marcador.png').setScale(1,1),
    
            input: 'none',
            space: {
              top: 10,
              right: -20,
              left: -30,
              bottom: 4
            },
        }).layout().setDepth(5).setVisible(false);

        

        this.isPaused = false;

        window.addEventListener('touchstart', () => {this.data.set('IS_TOUCH', "true"); });
        //Back
        this.sprSky = this.add.image(dim/2, dim/2-420, 'menuBG', 'portada_background_skye.png')
        this.sprBackCloud = this.add.tileSprite(0, dim/2-420,0,0, 'menuBG', 'portada_background_clouds.png').setOrigin(0, 0)
       
        this.sprBack = this.add.image(dim/2, dim/2+100, 'menuBG', 'portada_chess.png')
        this.phillipLogo = this.add.image(dim/2-25, dim/2+180, 'phillipLogo')
        this.cloudSpeedModifier = 0.5
        this.cloud1 = this.add.tileSprite(0, dim/2-220,0,0, 'cloud_a').setOrigin(0, 0)
        this.cloud2 = this.add.tileSprite(0, dim/2-120,0,0, 'cloud_c').setOrigin(0, 0).setScale(1)
        this.cloud2.tilePositionX -=300
        this.cloud3 = this.add.tileSprite(0, dim/2+180,0,0, 'cloud_b').setOrigin(0, 0).setScale(1.2)
        this.cloud3.tilePositionX -=200
        this.cloud4 = this.add.tileSprite(0, dim/2+300,0,0, 'cloud_b').setOrigin(0, 0).setScale(1.8)
        this.cloud4.tilePositionX -=150
        this.sprLogo = this.add.image(dim/2, dim/2-200, 'menuLogo')
        this.startButton = this.add.image(dim/2, dim/2+350, 'menuUI', 'Play_NonClicked.png').setInteractive();
        this.startButton.setScale(1);
        this.startButton.on('pointerdown', () => 
            {
                this.nextSceneReady = false;
                this.showLoading();
                this.uiScene.audioManager.ui_click.play()
                //this.uiScene.audioManager.playButtonClick.play();
            });
        this.startButton.on('pointerover', function (event) {
            this.setTexture('menuUI', 'Play_Clicked.png');
        });
        this.startButton.on('pointerout', function (event) {
            this.setTexture('menuUI', 'Play_NonClicked.png');
        });
        
        this.helpButton = this.add.image(dim/2+210, dim/2+350,'menuUI', 'Info_NonClicked.png').setInteractive();
        this.helpButton.setScale(1);
        this.helpButton.on('pointerdown', () => { this.uiScene.panel.showInstructions(() => null); 
            this.uiScene.audioManager.ui_click.play()
            //this.uiScene.audioManager.buttonClick.play(); 
        });
        this.helpButton.on('pointerover', function (event) {
            this.setTexture('menuUI', 'Info_Clicked.png');
        });
        this.helpButton.on('pointerout', function (event) {
            this.setTexture('menuUI', 'Info_NonClicked.png');
        });

        this.optionsButton = this.add.image(dim/2-210, dim/2+350, 'menuUI', 'Settings_NonClicked.png').setInteractive();
        this.optionsButton.setScale(1);
        this.optionsButton.on('pointerdown', () => { this.uiScene.panel.showOptions(); 
            this.uiScene.audioManager.ui_click.play()
            //this.uiScene.audioManager.buttonClick.play(); 
        });
        this.optionsButton.on('pointerover', function (event) {
            this.setTexture('menuUI', 'Settings_Clicked.png');
            
        });
        this.optionsButton.on('pointerout', function (event) {
            this.setTexture('menuUI', 'Settings_NonClicked.png');
        });
        this.creditsButton = this.add.image(dim-90, 80, 'menuUI', 'Credits_NonClicked.png').setInteractive();
        this.creditsButton.setScale(.7);
        this.creditsButton.on('pointerdown', () => { this.uiScene.panel.showCredits(); 
            this.uiScene.audioManager.ui_click.play()
            //this.uiScene.audioManager.buttonClick.play(); 
        });
        this.creditsButton.on('pointerover', function (event) {
            this.setTexture('menuUI', 'Credits_Clicked.png');
        });
        this.creditsButton.on('pointerout', function (event) {
            this.setTexture('menuUI', 'Credits_NonClicked.png');
        });
    }

    update(){
        //ANIMATIONS
        this.sprBackCloud.tilePositionX += .3*this.cloudSpeedModifier;
        this.cloud1.tilePositionX += 1*this.cloudSpeedModifier;
        this.cloud2.tilePositionX -= 1.3*this.cloudSpeedModifier;
        this.cloud3.tilePositionX += 1.6*this.cloudSpeedModifier;
        this.cloud4.tilePositionX -= 1.8*this.cloudSpeedModifier;


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
                onUpdate: function(tween, target){
                    target.getElement('thumb').x = target.getElement('thumb').x+14; // Ajustar la posición del thumb
                },
                onComplete: () => {
                    this.mainScene.startRunning = false;
                    this.uiScene.audioManager.menuMusic.stop();
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
            onUpdate: function(tween, target){
                target.getElement('thumb').x = target.getElement('thumb').x+14; // Ajustar la posición del thumb
            },
            onComplete: () => {
                sliderTween?.remove();
                sliderTween = null;
                this.scene.launch('MainScene', this.data);
                this.scene.sendToBack('MainScene');
                this.mainScene = this.scene.get("MainScene");
                this.mainScene.events.once("create", () => {
                
                this.mainScene.startRunning = true;
                this.nextSceneReady = true
        });
            }
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
