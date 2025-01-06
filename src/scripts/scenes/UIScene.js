import {Panel} from './components/panel.js';
import {AudioManager} from './components/audioManager.js';
import {ResourceLoader} from './components/resourceLoader.js';
//import {AnimationsManager} from '../managers/animationsManager.js';
import * as Phaser from 'phaser';

export class UIScene extends Phaser.Scene
{
    constructor(){
        super({key: 'UIScene'})
    }

    preload(){
        this.load.image('panel', ResourceLoader.ReturnPath()+'/images/ui/panel.png');
        this.load.image('panel_dark', ResourceLoader.ReturnPath()+'/images/ui/panel_dark.png');
        this.load.atlas('pantalla_fin_UI', ResourceLoader.ReturnPath()+'/images/ui/fin_partida/sprites.png', ResourceLoader.ReturnPath()+'/images/ui/fin_partida/sprites.json');
        this.load.atlas('pantalla_opciones_UI', ResourceLoader.ReturnPath()+'/images/ui/pantalla_opciones/sprites.png', ResourceLoader.ReturnPath()+'/images/ui/pantalla_opciones/sprites.json');
        this.load.atlas('pantalla_pausa_UI', ResourceLoader.ReturnPath()+'/images/ui/pantalla_pausa/sprites.png', ResourceLoader.ReturnPath()+'/images/ui/pantalla_pausa/sprites.json');
        this.load.image('logoPChuJoy', ResourceLoader.ReturnPath()+'/images/logo_pchujoy.jpg');
        this.load.image('fade', ResourceLoader.ReturnPath()+'/images/black_alpha_40.png');

        //sounds
        this.audioManager = new AudioManager(this);
        this.audioManager.load();

        //anims
        //this.animationsManager = new AnimationsManager(this);
        //this.animationsManager.load();

        //Plugins
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    init(data){
        this.data = data;
    }

    
    create(){
        this.dim = this.game.config.width;
        this.audioManager.init();
        //this.animationsManager.createAnimations();

        this.panel = new Panel(this);
        this.panel.create(this.dim);
        this.panel.createInstructionsPanel(this.dim);
        this.panel.createOptionsPanel(this.dim);
        this.panel.createCreditsPanel(this.dim);

        this.graphics = this.add.graphics().setDepth(10).setVisible(false);
        this.graphics.fillStyle(0x000000, 1);
        this.graphics.fillRect(0, 0, this.dim, this.dim);
        this.splashScreen = this.add.image(this.dim/2, this.dim/2, 'logoPChuJoy')
            .setDisplaySize(this.dim, this.dim).setDepth(10).setAlpha(0);

        window.addEventListener('resize', () => {
            let phaserDiv = document.getElementById('phaser-div');

            /*
            // Verificar si el juego está en modo de pantalla completa
            if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitEnterFullscreen) {
                // Si está en pantalla completa, establecer el tamaño del contenedor al tamaño de la ventana
                phaserDiv.style.width = window.innerWidth + 'px';
                phaserDiv.style.height = window.innerHeight + 'px';
            } else {
                // Si no está en pantalla completa, restaurar el tamaño original del contenedor
                phaserDiv.style.width = this.data.get('parentSize');
                phaserDiv.style.height = this.data.get('parentSize');
            }
            */
            if (this.panel && document.fullscreenElement === null) {
                this.panel.setToggleFullscreen(false, this.dim/2);
            }
        });
    }

    splashScreenAnim(){
        this.graphics.setVisible(true);
        let splashTween = this.tweens.add({
            targets: this.splashScreen,
            ease: 'sine.inout',
            duration: 500,
            repeat: 0,
            alpha: {
              getStart: () => 0,
              getEnd: () => 1
            },
            onComplete: () => {
                let splashTween2 = this.tweens.add({
                    targets: this.splashScreen,
                    ease: 'sine.inout',
                    duration: 500,
                    repeat: 0,
                    delay: 2000,
                    alpha: {
                      getStart: () => 1,
                      getEnd: () => 0
                    },
                    onComplete: () => {
                        this.graphics.setVisible(false);
                        this.splashScreen.setVisible(false);
                        splashTween2?.remove();
                        splashTween2 = null;
                    }
                });
                splashTween?.remove();
                splashTween = null;
            }
        });
    }

    setCurrentScene(scene){
        this.currentScene = scene;
    }
}