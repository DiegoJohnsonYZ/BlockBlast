import * as Phaser from 'phaser';

export class AudioManager
{
    constructor(scene){
        this.scene = scene;
    }

    load(){
        
        //main Themes
        this.scene.load.audio('mainTheme', ['src/audios/maintheme.ogg','src/audios/maintheme.m4a'])


        this.scene.load.audio('alarma', ['src/audios/ogg/sfx_alarma_loop.ogg','src/audios/m4a/sfx_alarma_loop.m4a'])
        this.scene.load.audio('destruccion', ['src/audios/ogg/sfx_destruccion.ogg','src/audios/m4a/sfx_destruccion.m4a'])
        this.scene.load.audio('preview', ['src/audios/ogg/sfx_ficha_preview.ogg','src/audios/m4a/sfx_ficha_preview.m4a'])
        this.scene.load.audio('soltar', ['src/audios/ogg/sfx_ficha_soltar.ogg','src/audios/m4a/sfx_ficha_soltar.m4a'])
        this.scene.load.audio('aviso', ['src/audios/ogg/sfx_powerup_aviso.ogg','src/audios/m4a/sfx_powerup_aviso.m4a'])
        this.scene.load.audio('bomba', ['src/audios/ogg/sfx_powerup_bomba.ogg','src/audios/m4a/sfx_powerup_bomba.m4a'])
        this.scene.load.audio('reduccion', ['src/audios/ogg/sfx_powerup_reduccion.ogg','src/audios/m4a/sfx_powerup_reduccion.m4a'])
        this.scene.load.audio('puntos', ['src/audios/ogg/sfx_puntos.ogg','src/audios/m4a/sfx_puntos.m4a'])
        this.scene.load.audio('tapete', ['src/audios/ogg/sfx_tapete.ogg','src/audios/m4a/sfx_tapete.m4a'])
        this.scene.load.audio('ui_click', ['src/audios/ogg/sfx_ui_button_click.ogg','src/audios/m4a/sfx_ui_button_click.m4a'])
        this.scene.load.audio('ui_page', ['src/audios/ogg/sfx_ui_button_page.ogg','src/audios/m4a/sfx_ui_button_page.m4a'])
        /*
        this.scene.load.audio('mainTheme', [ './src/audios/menu_loop.ogg', './src/audios/menu_loop.m4a' ]);
        this.scene.load.audio('gameplayTheme', [ './src/audios/gameplay_loop.ogg', './src/audios/gameplay_loop.m4a' ]);

        //UI
        this.scene.load.audio('menuButtonSound', [ './src/audios/ui/sfx_ui_button_click.ogg', './src/audios/ui/sfx_ui_button_click.m4a' ]);
        this.scene.load.audio('menuPageSound', [ './src/audios/ui/sfx_ui_button_page.ogg', './src/audios/ui/sfx_ui_button_page.m4a' ]);
        this.scene.load.audio('playButtonSound', [ './src/audios/ui/sfx_ui_button_play.ogg', './src/audios/ui/sfx_ui_button_play.m4a' ]);
        this.scene.load.audio('exitButtonSound', [ './src/audios/ui/sfx_ui_button_salir.ogg', './src/audios/ui/sfx_ui_button_salir.m4a' ]);

        //Pickups
        this.scene.load.audio('shieldSound', [ './src/audios/pick_ups/sfx_powerup_shield.ogg', './src/audios/pick_ups/sfx_powerup_shield.m4a' ]);
        this.scene.load.audio('shieldSoundBreak', [ './src/audios/pick_ups/sfx_powerup_shield_break.ogg', './src/audios/pick_ups/sfx_powerup_shield_break.m4a' ]);
        this.scene.load.audio('shieldSoundDisappear', [ './src/audios/pick_ups/sfx_powerup_shield_off.ogg', './src/audios/pick_ups/sfx_powerup_shield_off.m4a' ]);
        this.scene.load.audio('doubleSound', [ './src/audios/pick_ups/sfx_powerup_x2.ogg', './src/audios/pick_ups/sfx_powerup_x2.m4a' ]);
        this.scene.load.audio('slowSound', [ './src/audios/pick_ups/sfx_powerup_slow.ogg', './src/audios/pick_ups/sfx_powerup_slow.m4a' ]);
        this.scene.load.audio('packageSound', [ './src/audios/pick_ups/sfx_item_box.ogg', './src/audios/pick_ups/sfx_item_box.m4a' ]);

        //Gameplay
        this.scene.load.audio('multiSound', [ './src/audios/gameplay/sfx_multi.ogg', './src/audios/gameplay/sfx_multi.m4a' ]);
        this.scene.load.audio('deathSound', [ './src/audios/gameplay/sfx_action_crash.ogg', './src/audios/gameplay/sfx_action_crash.m4a' ]);
        this.scene.load.audio('jumpSound', [ './src/audios/gameplay/sfx_action_jump.ogg', './src/audios/gameplay/sfx_action_jump.m4a' ]);
        this.scene.load.audio('landingSound', [ './src/audios/gameplay/sfx_action_landing.ogg', './src/audios/gameplay/sfx_action_landing.m4a' ]);
        this.scene.load.audio('deliverySound', [ './src/audios/gameplay/sfx_action_delivery.ogg', './src/audios/gameplay/sfx_action_delivery.m4a' ]);
        this.scene.load.audio('perfectSound', [ './src/audios/gameplay/sfx_action_perfectevasion.ogg', './src/audios/gameplay/sfx_action_perfectevasion.m4a' ]);
        this.scene.load.audio('scoreMarkSound', [ './src/audios/gameplay/sfx_1k.ogg', './src/audios/gameplay/sfx_1k.m4a' ]);

        //Car Drivers
        this.scene.load.audio('driver0', [ './src/audios/drivers/sfx_vox_apura.ogg', './src/audios/drivers/sfx_vox_apura.m4a' ]);
        this.scene.load.audio('driver1', [ './src/audios/drivers/sfx_vox_avanza.ogg', './src/audios/drivers/sfx_vox_avanza.m4a' ]);
        this.scene.load.audio('driver2', [ './src/audios/drivers/sfx_vox_pasa.ogg', './src/audios/drivers/sfx_vox_pasa.m4a' ]);
        this.scene.load.audio('driver3', [ './src/audios/drivers/sfx_vox_pisa.ogg', './src/audios/drivers/sfx_vox_pisa.m4a' ]);
        this.scene.load.audio('driver4', [ './src/audios/drivers/sfx_vox_rapido.ogg', './src/audios/drivers/sfx_vox_rapido.m4a' ]);
        this.scene.load.audio('driver5', [ './src/audios/drivers/sfx_vox_suave.ogg', './src/audios/drivers/sfx_vox_suave.m4a' ]);
        this.scene.load.audio('driver6', [ './src/audios/drivers/sfx_vox_muevete.ogg', './src/audios/drivers/sfx_vox_muevete.m4a' ]);

        //Start Countdown
        this.scene.load.audio('countdown_3', [ './src/audios/countdown/sfx_countdown_3.ogg', './src/audios/countdown/sfx_countdown_3.m4a' ]);
        this.scene.load.audio('countdown_2', [ './src/audios/countdown/sfx_countdown_2.ogg', './src/audios/countdown/sfx_countdown_2.m4a' ]);
        this.scene.load.audio('countdown_1', [ './src/audios/countdown/sfx_countdown_1.ogg', './src/audios/countdown/sfx_countdown_1.m4a' ]);
        this.scene.load.audio('countdown_run', [ './src/audios/countdown/sfx_corre.ogg', './src/audios/countdown/sfx_corre.m4a' ]);

        //Moto
        this.scene.load.audio('motoLoop', [ './src/audios/moto/sfx_moto_engine_loop.ogg', './src/audios/moto/sfx_moto_engine_loop.m4a' ]);
        this.scene.load.audio('motoAccel', [ './src/audios/moto/sfx_moto_accel_2196ms.ogg', './src/audios/moto/sfx_moto_accel_2196ms.m4a' ]);
        this.scene.load.audio('motoIdle', [ './src/audios/moto/sfx_moto_idle_4000ms.ogg', './src/audios/moto/sfx_moto_idle_4000ms.m4a' ]);
        */
    }

    init(){
        
        this.scene.sound.pauseOnBlur = false

        //sfx
        this.sfx = [];
        this.addSFX();
        
        //menuTheme
        this.menuMusic = this.scene.sound.add('mainTheme', {
            volume: .5,
            loop: true
        });

        //gameplayTheme
        this.gameplayMusic = this.scene.sound.add('mainTheme', {
            volume: .5,
            loop: true
        });
    
        if (!this.scene.sound.locked)
        {
            // already unlocked so play
            this.getCurrentTheme().play();
            
            this.setAudioVolume(this.scene.data.get('musicVolume'));
        }
        else
        {
            // wait for 'unlocked' to fire and then play
            this.scene.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.getCurrentTheme().play();
                
                this.setAudioVolume(this.scene.data.get('musicVolume'));
            })
        }

        this.scene.game.events.on(Phaser.Core.Events.BLUR, () => {
            this.handleLoseFocus();
        })
    
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden)
            {
                return
            }
    
            this.handleLoseFocus();
        })
        
    }

    addSFX(){

        this.alarma = this.scene.sound.add('alarma', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.alarma);

        this.destruccion = this.scene.sound.add('destruccion', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.destruccion);
        
        this.preview = this.scene.sound.add('preview', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.preview);
        
        this.soltar = this.scene.sound.add('soltar', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.soltar);
        
        this.aviso = this.scene.sound.add('aviso', {
            volume: .5,
            loop: true
        });
        this.sfx.push(this.aviso);
        
        this.bomba = this.scene.sound.add('bomba', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.bomba);
        
        this.reduccion = this.scene.sound.add('reduccion', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.reduccion);
        
        this.puntos = this.scene.sound.add('puntos', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.puntos);
        
        this.tapete = this.scene.sound.add('tapete', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.tapete);
        
        this.ui_click = this.scene.sound.add('ui_click', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.ui_click);
        
        this.ui_page = this.scene.sound.add('ui_page', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.ui_page);
        /*
        //UI
        this.buttonClick = this.scene.sound.add('menuButtonSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.buttonClick);

        this.pageOpen = this.scene.sound.add('menuPageSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.pageOpen);

        this.playButtonClick = this.scene.sound.add('playButtonSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.playButtonClick);

        this.exitButtonClick = this.scene.sound.add('exitButtonSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.exitButtonClick);

        //Pickups
        this.shieldSound = this.scene.sound.add('shieldSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.shieldSound);

        this.shieldSoundBreak = this.scene.sound.add('shieldSoundBreak', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.shieldSoundBreak);

        this.shieldSoundDisappear = this.scene.sound.add('shieldSoundDisappear', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.shieldSoundDisappear);

        this.doubleSound = this.scene.sound.add('doubleSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.doubleSound);

        this.slowSound = this.scene.sound.add('slowSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.slowSound);

        this.packageSound = this.scene.sound.add('packageSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.packageSound);

        //Gameplay
        this.multiSound = this.scene.sound.add('multiSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.multiSound);      
        
        this.deathSound = this.scene.sound.add('deathSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.deathSound);
        
        this.jumpSound = this.scene.sound.add('jumpSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.jumpSound);
        
        this.landingSound = this.scene.sound.add('landingSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.landingSound);

        this.deliverySound = this.scene.sound.add('deliverySound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.deliverySound);

        this.perfectSound = this.scene.sound.add('perfectSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.perfectSound);

        this.scoreMarkSound = this.scene.sound.add('scoreMarkSound', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.scoreMarkSound);

        //Car Drivers
        this.driver0 = this.scene.sound.add('driver0', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.driver0);
        this.driverSfx.push(this.driver0);

        this.driver1 = this.scene.sound.add('driver1', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.driver1);
        this.driverSfx.push(this.driver1);

        this.driver2 = this.scene.sound.add('driver2', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.driver2);
        this.driverSfx.push(this.driver2);

        this.driver3 = this.scene.sound.add('driver3', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.driver3);
        this.driverSfx.push(this.driver3);

        this.driver4 = this.scene.sound.add('driver4', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.driver4);
        this.driverSfx.push(this.driver4);

        this.driver5 = this.scene.sound.add('driver5', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.driver5);

        this.driver6 = this.scene.sound.add('driver6', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.driver6);
        this.driverSfx.push(this.driver6);

        //Start Countdown
        this.countdown3Sound = this.scene.sound.add('countdown_3', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.countdown3Sound);

        this.countdown2Sound = this.scene.sound.add('countdown_2', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.countdown2Sound);

        this.countdown1Sound = this.scene.sound.add('countdown_1', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.countdown1Sound);

        this.countdownRunSound = this.scene.sound.add('countdown_run', {
            volume: .5,
            loop: false
        });
        this.sfx.push(this.countdownRunSound);

        //Moto
        this.motoLoop = this.scene.sound.add('motoLoop', {
            volume: .5,
            loop: true
        });
        this.sfx.push(this.motoLoop);

        this.motoAccel = this.scene.sound.add('motoAccel', {
            volume: .5,
            loop: true
        });
        this.sfx.push(this.motoAccel);

        this.motoIdle = this.scene.sound.add('motoIdle', {
            volume: .5,
            loop: true
        });
        this.sfx.push(this.motoIdle);
        */
    }

    getCurrentTheme(){
        
        let currentScene;
        if (this.scene.currentScene != null) currentScene = this.scene.currentScene.scene.key;
        else currentScene = 'MenuScene'
        switch(currentScene){
            case 'MenuScene':
                return this.menuMusic;
            case 'MainScene':
                return this.gameplayMusic;
            default:
                break;
        }
    }
    
    handleLoseFocus()
    {
        
        if (this.scene.currentScene != null) {
            // assuming a Paused scene that has a pause modal
            if (this.scene.currentScene.isPaused)
            {
                return
            }
            // pause music or stop all sounds
            //this.pauseMusic();
            //this.scene.currentScene.PauseGame?this.scene.currentScene.PauseGame();
            //this.scene.currentScene.isPaused = true;
        }
        
    }

    setAudioVolume(value){
        
        this.menuMusic.volume = value;
        this.gameplayMusic.volume = value;
        this.updateSFXVolume(value);
        
    }

    playMusic(){
        this.getCurrentTheme().play();
        
    }

    resumeMusic(){
        
        if (this.scene.currentScene.isPaused) {
            this.volumeDownTween?.remove();
            this.volumeDownTween = null;

            let audio = this.getCurrentTheme()
            audio.resume();
            let volumeUpTween = this.scene.tweens.add({
                targets: audio,
                ease: 'sine.inout',
                duration: 500,
                repeat: 0,
                volume: {
                    getStart: () => 0,
                    getEnd: () => this.scene.data.get('musicVolume')
                },
                onComplete: () => {
                    this.volumeDownTween?.remove();
                    volumeUpTween = null;
                }
            });
        }
        
    }

    pauseMusic(){
        
        let audio = this.getCurrentTheme();
        this.volumeDownTween = this.scene.tweens.add({
            targets: audio,
            ease: 'sine.inout',
            duration: 500,
            repeat: 0,
            volume: {
                getStart: () => this.scene.data.get('musicVolume'),
                getEnd: () => 0
            },
            onComplete: () => {
                this.volumeDownTween?.remove();
                this.volumeDownTween = null;
                audio.pause();
            }
        });
        
    }

    stopMusic(){
        
        this.getCurrentTheme().stop();
        
    }

    updateSFXVolume(value){
        for(let i = 0; i < this.sfx.length; i++){
            if (this.sfx[i].key != 'scoreMarkSound') this.sfx[i].volume = value;
            else this.sfx[i].volume = value >= 0.05 ? value + .2 : value;
        }
        
    }
}