

export class Panel
{
    constructor(scene){
        // reference to the game scene
        this.scene = scene;

        this.credits = 
        [['Programación', 'Diego Johnson','Braulio Baldeon'],
        ['Arte y animación', 'Edward Torres'],
        ['Marketing e interfaz', 'Karoline Jiménez'],
        ['Música y sonido', 'Gunter Brenner'],
        ['Dirección', 'Jorge García'],
        ['Productor ejecutivo', 'Phillip Chu Joy']]
    }

    create(dim){
        let background = this.scene.add.image(dim/2, dim/2, 'fade').setDisplaySize(dim, dim).setInteractive();

        this.panel = this.scene.add.image(dim/2, dim/2, 'panel').setScale(1);

        this.panelContainer = this.scene.add.container(0, 0, [background, this.panel]);
        this.panelContainer.setDepth(10).setVisible(false);

        this.pauseContainer;
    }

    createPausePanel(dim){
        //let pauseTitleContainer = this.scene.add.image(dim/2, 250, 'panelUI', 'cartel.png').setScale(.75);

        let pauseTitle = this.scene.add.text(dim/2, 318, 'PAUSA', { 
            fontFamily: 'Bungee', fontSize: '34px',  color: '#dddddd', align: 'center' }).setOrigin(0.5);
        pauseTitle.setStroke('#503530', 10);
        let closeImage = this.scene.add.image(dim - 190, 315, 'menuUI', 'Equis_NonClicked.png').setInteractive().setScale(.5);
        closeImage.on('pointerdown', () => { this.scene.audioManager.resumeMusic(); this.scene.currentScene.PauseGame(); });
        
        let optionsButton = this.scene.add.image(dim/2, dim/2-80, 'pantalla_pausa_UI', 'Botón_opciones_NonClicked.png').setInteractive().setDisplaySize(400,75);
        optionsButton.on('pointerdown', () => { this.hidePause(); this.showOptions(); 
            //this.scene.audioManager.buttonClick.play();
        });

        let continueButton = this.scene.add.image(dim/2, dim/2+25, 'pantalla_pausa_UI', 'Botón_Continuar_NonClicked.png').setInteractive().setDisplaySize(400,75);
        continueButton.on('pointerdown', () => { 
            this.scene.audioManager.resumeMusic(); 
            this.scene.currentScene.PauseGame(); 
            //this.scene.audioManager.buttonClick.play();
        });

        

        let exitButton = this.scene.add.image(dim/2, dim/2+130, 'pantalla_pausa_UI', 'Botón_Salir_NonClicked.png').setInteractive().setDisplaySize(400,75);
        exitButton.on('pointerdown', () => { this.hidePause(); 
            //this.scene.audioManager.exitButtonClick.play(); 
            this.scene.currentScene.BackMenu(); });

        this.pauseContainer = this.scene.add.container(0, 0, [pauseTitle, closeImage, continueButton, optionsButton, exitButton]);
        this.pauseContainer.setVisible(false).setDepth(10.1);
    }
    

    createFirstTutorialPage(dim){
        let text1 = this.scene.add.text(dim/2, 440, 'JALA LAS FICHAS HACIA EL TABLERO Y FORMA LÍNEAS PARA DESTRUIRLAS Y GANAR PUNTOS ¡A MÁS LÍNEAS, MÁS PUNTOS!', { 
            fontFamily: 'Bungee', fontSize: '20px',  color: '#dddddd', align: 'center' }).setOrigin(0.5);
        text1.setStroke('#503530', 8).setLineSpacing(0).setWordWrapWidth(this.panel.displayWidth-100);

        let image1 = this.scene.add.image(dim/2, 550, 'tutorial', 'linecomplete.png').setScale(.5);

        let text2 = this.scene.add.text(dim/2, dim/2+120, 'COLOCA LAS FICHAS CON CUIDADO. SI ES IMPOSIBLE COLOCAR ALGUNA O SE TE ACABA EL TIEMPO, PERDERÁS', { 
            fontFamily: 'Bungee', fontSize: '20px',  color: '#dddddd', align: 'center' }).setOrigin(0.5);
        text2.setStroke('#503530', 8).setLineSpacing(0).setWordWrapWidth(this.panel.displayWidth-100);

        let image2 = this.scene.add.image(dim/2, dim/2+200, 'tutorial', 'timer.png').setScale(.5);
        

        const textContainer1 = this.scene.add.container(0, 0, 
            [text1, image1, image2, text2]).setVisible(false);
        return textContainer1
    }

    createSecondTutorialPage(dim){
        let text1 = this.scene.add.text(dim/2, 440, 'COMPLETA LÍNEAS QUE INCLUYEN PIEZAS ESPECIALES Y APROVECHA SUS VENTAJAS', { 
            fontFamily: 'Bungee', fontSize: '20px',  color: '#dddddd', align: 'center' }).setOrigin(0.5);
        text1.setStroke('#503530', 8).setLineSpacing(0).setWordWrapWidth(this.panel.displayWidth-100);

        let image1 = this.scene.add.image(dim/2-200-60, 580, 'tutorial', 'bomb.png').setScale(1);
        let image2 = this.scene.add.image(dim/2+50-80, 570, 'tutorial', 'bombprep.png').setScale(.4);
        let image3 = this.scene.add.image(dim/2+300-80, 580, 'tutorial', 'bombexplode.png').setScale(.4);

        let text2 = this.scene.add.text(dim/2, dim/2+150, 'LAS BOMBAS DESTRUYEN LOS CUADROS A SU ALREDEDOR', { 
            fontFamily: 'Bungee', fontSize: '20px',  color: '#dddddd', align: 'center' }).setOrigin(0.5);
        text2.setStroke('#503530', 8).setLineSpacing(0).setWordWrapWidth(this.panel.displayWidth-100);

        

        const textContainer2 = this.scene.add.container(0, 0, 
            [text1, image1, image2,image3, text2]).setVisible(false);
        return textContainer2
    }
    createThirdTutorialPage(dim){
        let text1 = this.scene.add.text(dim/2, 440, 'EL REDUCTOR TRANSFORMA LAS FICHAS QUE NO HAS USADO AUN EN PEQUEÑOS CUADROS', { 
            fontFamily: 'Bungee', fontSize: '20px',  color: '#dddddd', align: 'center' }).setOrigin(0.5);
        text1.setStroke('#503530', 8).setLineSpacing(0).setWordWrapWidth(this.panel.displayWidth-100);

        let image4 = this.scene.add.image(dim/2-200-60, 580, 'tutorial', 'reduct.png').setScale(1);
        let image5 = this.scene.add.image(dim/2+50-80, 570, 'tutorial', 'reductprep.png').setScale(.4);
        let image6 = this.scene.add.image(dim/2+300-80, 580, 'tutorial', 'reductworks.png').setScale(.4);
        
       

        const textContainer3 = this.scene.add.container(0, 0, 
            [text1,image4,image5,image6]).setVisible(false);
        return textContainer3
    }

    createInstructionsPanel(dim){      
        this.instructionIndex = 0;
        this.instructionTexts = [this.createFirstTutorialPage(dim), this.createSecondTutorialPage(dim), this.createThirdTutorialPage(dim)];
  
        //let intructionsTitleContainer = this.scene.add.image(dim/2, 250, 'panelUI', 'cartel.png').setScale(.75);

        this.intructionsTitle = this.scene.add.text(dim/2, 318, 'TUTORIAL', { 
            fontFamily: 'Bungee', fontSize: '34px',  color: '#dddddd', align: 'center' }).setOrigin(0.5);
        this.intructionsTitle.setStroke('#503530', 10);
        let closeImage = this.scene.add.image(dim - 190, 315, 'menuUI', 'Equis_NonClicked.png').setInteractive().setScale(.5);
        closeImage.on('pointerdown', () =>{
            this.hideInstructions()
            this.scene.currentScene.CloseInstructions(); 
        } );

        this.leftArrow = this.scene.add.image(dim/2-55, dim - 260, 'menuUI', 'Previous_NonClicked.png').setInteractive().setDisplaySize(100,100);
        this.leftArrow.on('pointerdown', () => this.leftArrowClicked());

        this.rightArrow = this.scene.add.image(dim/2+55, dim - 260, 'menuUI', 'Next_NonClicked.png').setInteractive().setDisplaySize(100,100);
        this.rightArrow.on('pointerdown', () => this.rightArrowClicked());

        this.instructionsContainer = this.scene.add.container(0, 0, 
            [this.intructionsTitle, closeImage, this.instructionTexts[0], this.instructionTexts[1], this.instructionTexts[2], this.leftArrow, this.rightArrow]);
        this.instructionsContainer.setVisible(false).setDepth(10.1);
    }

    createOptionsPanel(dim){
        //let optionsTitleContainer = this.scene.add.image(dim/2, 250, 'panelUI', 'cartel.png').setScale(.75);

        let optionsTitle = this.scene.add.text(dim/2, 318, 'OPCIONES', { 
            fontFamily: 'Bungee', fontSize: '34px',  color: '#dddddd', align: 'center' }).setOrigin(0.5);
        optionsTitle.setStroke('#503530', 10);

        let closeImage = this.scene.add.image(dim - 190, 315, 'menuUI', 'Equis_NonClicked.png').setInteractive().setScale(.5);
        closeImage.on('pointerdown', () => this.hideOptions());

        let musicTitle = this.scene.add.text(dim/2-200, dim/2 - 65, 'MÚSICA', { 
            font: '800 34px Bungee', color: '#ebebeb', align: 'center' }).setOrigin(0.5);
        musicTitle.setStroke('#503530', 8);

        let musicSlider = this.scene.rexUI.add.slider({
            x: dim/2+115,
            y: dim/2 - 65,
            width: 370,
            height: 30,
            orientation: 'x',
            value: this.scene.data.get('musicVolume'),

            track: this.scene.add.sprite(0,0,'pantalla_opciones_UI','Barra_vacia.png'),
            indicator: this.addCropResizeMethod(this.scene.add.sprite(0,0,'pantalla_opciones_UI','Barra_llena.png').setDisplaySize(350,35)),
            thumb: this.scene.add.sprite(0,0,'pantalla_opciones_UI','Button1_NonClicked.png').setDisplaySize(35,60),

            input: 'drag'|'click',
            valuechangeCallback: function (value) {
                //this.scene.audioManager.menuMusic.volume = value;
                //this.scene.audioManager.gameplayMusic.volume = value;
                this.scene.data.set('musicVolume', value);
            },

        }).layout();

        let sfxTitle = this.scene.add.text(dim/2-200, dim/2+25, 'SONIDO', { 
            font: '800 34px Bungee', color: '#ebebeb', align: 'center' }).setOrigin(0.5);
        sfxTitle.setStroke('#503530', 8);
        
        let sfxSlider = this.scene.rexUI.add.slider({
            x: dim/2+115,
            y: dim/2+25,
            width: 370,
            height: 30,
            orientation: 'x',
            value: this.scene.data.get('sfxVolume'),

            track: this.scene.add.sprite(0,0,'pantalla_opciones_UI','Barra_vacia.png'),
            indicator: this.addCropResizeMethod(this.scene.add.sprite(0,0,'pantalla_opciones_UI','Barra_llena.png').setDisplaySize(350,35)),
            thumb: this.scene.add.sprite(0,0,'pantalla_opciones_UI','Button1_NonClicked.png').setDisplaySize(35,60),

            input: 'drag'|'click',
            valuechangeCallback: function (value) {
                //this.scene.audioManager.updateSFXVolume(value);
                this.scene.data.set('sfxVolume', value);
            },

        }).layout();

        if ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)){
            musicTitle.setPosition(dim/2-255, dim/2-55);
            musicSlider.setPosition(dim/2+100, dim/2-55);
            sfxTitle.setPosition(dim/2-255, dim/2+75);
            sfxSlider.setPosition(dim/2+100, dim/2+75);
            this.optionsContainer = this.scene.add.container(0, 0, 
                [optionsTitle, closeImage, sfxSlider, sfxTitle, musicTitle, musicSlider]);
        }
        else
        {
            let fullscreenTitle = this.scene.add.text(dim/2-75, dim/2+125, 'PANTALLA COMPLETA', { 
                font: '800 34px Bungee', color: '#ebebeb', align: 'center' }).setOrigin(0.5);
            fullscreenTitle.setStroke('#503530', 8);
            this.fullscreenToggleBall = this.scene.add.image(dim/2+205, dim/2+120, 'pantalla_opciones_UI', 'Button2_clicked.png');
            

            this.fullscreenToggleContainer = this.scene.add.image(dim/2+230, dim/2+120, 'pantalla_opciones_UI', 'Switch_Off.png').setInteractive();
            this.fullscreenToggleContainer.on('pointerdown', () => { this.toggle(this.fullscreenToggleBall,this.fullscreenToggleContainer, dim/2); });
    
            this.setToggleFullscreen(this.scene.scale.isFullscreen, dim/2);

            this.optionsContainer = this.scene.add.container(0, 0, 
                [optionsTitle, closeImage, sfxSlider, sfxTitle, musicTitle, musicSlider, fullscreenTitle, this.fullscreenToggleContainer, this.fullscreenToggleBall]);
        }
        
        this.optionsContainer.setVisible(false).setDepth(10.1);
    }

    createCreditsPanel(dim){
        let creditsTitleContainer = this.scene.add.image(dim/2, 535, 'panel').setDisplaySize(800,700);

        let creditsTitle = this.scene.add.text(dim/2, 245, 'CRÉDITOS', { 
            font: '700 40px Bungee', color: '#ebebeb', align: 'center' }).setOrigin(0.5);
        creditsTitle.setStroke('#503530', 8);

        let closeImage = this.scene.add.image(dim - 150, 245, 'menuUI', 'Equis_NonClicked.png').setInteractive().setScale(.5);
        closeImage.on('pointerdown', () => this.hideCredits());

        let labels = []
        let previousChildCount = 0;
        let modifierX =0
        let modifierY = 0
        for (let i = 0; i < this.credits.length; i++){
            if(i>2){
                modifierX = 350
                modifierY = 280
            }
            let newH = previousChildCount <= 1 ? 325+80*i : 325+80*i+20*previousChildCount;
            newH+=40
            let label = this.addCreditsLabel(dim/2-200+modifierX, newH+70-modifierY, i);
            if (previousChildCount < label.list.length - 1) previousChildCount = label.list.length - 1;
            labels.push(label);
        }

        let logo = this.scene.add.image(dim/2, dim-300, 'leapLogo').setScale(.25);

        this.creditsContainer = this.scene.add.container(0, 0, [creditsTitleContainer,creditsTitle, logo,closeImage]);
        for(let i = 0; i < labels.length; i++){ this.creditsContainer.add(labels[i]); }
        this.creditsContainer.setVisible(false).setDepth(10.1);
    }

    addCreditsLabel(x, y, index){
        let title = this.scene.add.text(x, y, this.credits[index][0], { 
            fontFamily: 'Bungee', fontSize: '20px',  color: '#ebebeb', align: 'center' }).setOrigin(0.5);
        title.setStroke('#662C2A', 8);

        let names = [];
        for(let i = 1; i < this.credits[index].length; i++){
            let name = this.scene.add.text(x, y+30*i, this.credits[index][i], { 
                font: '700 18px Bungee', color: '#ebebeb', align: 'center' }).setOrigin(0.5);
            name.setStroke('#503530', 8);
            names.push(name);
        }

        let labelContainer = this.scene.add.container(0, 0, [title]);
        for(let i = 0; i < names.length; i++){ labelContainer.add(names[i]); }
        labelContainer.setDepth(10);
        return labelContainer
    }

    createScorePanel(dim){
        //let scoreTitle = this.scene.add.image(dim/2, 250, 'scorePanelUI', 'cartel_fin.png').setDisplaySize(560,130);
        

        //this.crown = this.scene.add.image(dim/2, dim/2-130, 'scorePanelUI', 'corona.png').setScale(.75);

        let scoreTitle = this.scene.add.text(dim/2, 318, 'FIN DE PARTIDA', { 
            fontFamily: 'Bungee', fontSize: '34px',  color: '#f4f4f4', align: 'center' }).setOrigin(0.5);
        scoreTitle.setStroke('#553b37', 8);

        let scoreImage = this.scene.add.image(dim/2, dim/2-70, 'pantalla_fin_UI', 'Contador_puntaje.png').setScale(1);

        this.scoreText = this.scene.add.text(dim/2, dim/2-60, '10000000', { font: '800 30px Bungee', color: '#f0dfa7' });
        this.scoreText.setStroke('#3f2e29', 10).setOrigin(.5);

        let timeLabel = this.scene.add.text(dim/2-165, dim/2+30, 'TIEMPO:', { font: '800 30px Bungee', color: '#f4f4f4' });
        timeLabel.setStroke('#553b37', 8);

        this.timeText = this.scene.add.text(dim/2+170, dim/2+70, '00:08:25', { font: '800 30px Bungee', color: '#f0dfa7' });
        this.timeText.setStroke('#553b37', 8).setOrigin(1);
        
        let recordLabel = this.scene.add.text(dim/2-165, dim/2+95, 'RECORD:', { font: '800 30px Bungee', color: '#f4f4f4' });
        recordLabel.setStroke('#553b37', 8);

        this.recordText = this.scene.add.text(dim/2+170, dim/2+130, '10000000', { font: '800 30px Bungee', color: '#f0dfa7' });
        this.recordText.setStroke('#553b37', 8).setOrigin(1);

        let restartButton = this.scene.add.image(dim/2-150, dim/2+260, 'pantalla_fin_UI', 'Botón_Reiniciar_NonClicked.png').setInteractive();
        //restartButton.setScale(.75);
        restartButton.on('pointerdown', () => { this.hideScore(); 
            //this.scene.audioManager.playButtonClick.play(); 
            this.scene.currentScene.RestartGame(); });

        let menuButton = this.scene.add.image(dim/2+170, dim/2+260, 'pantalla_fin_UI', 'Botón_Salir_NonClicked.png').setInteractive();
        //menuButton.setDisplaySize(270,130);
        menuButton.on('pointerdown', () => { this.hideScore(); 
            //this.scene.audioManager.exitButtonClick.play(); 
            this.scene.currentScene.BackMenu();});

        this.scoreContainer = this.scene.add.container(0, 0, 
            [scoreTitle,scoreImage, this.scoreText, timeLabel, this.timeText, recordLabel, this.recordText, restartButton, menuButton]);
        this.scoreContainer.setVisible(false).setDepth(10.1);
    }

    addCropResizeMethod = function (gameObject) {
        gameObject.resize = function (width, height) {
            gameObject.setCrop(0, 0, width, height);
            return gameObject;
        }
    
        return gameObject;
    }

    toggle(target,container, center){
        let start = center+205
        let end = center+255
        if (target.x != start) {
            start = center+255
            end = center+205
        }
        let toggleTween = this.scene.tweens.add({
            targets: target,
            ease: 'sine.inout',
            duration: 250,
            repeat: 0,
            x: {
              getStart: () => start,
              getEnd: () => end
            },
            onComplete: () => {
                if (start == center+205){
                    container.setTexture('pantalla_opciones_UI', 'Switch_On.png')
                    target.setTexture('pantalla_opciones_UI', 'Button2_NonClicked.png');
                    this.scene.scale.startFullscreen();
                } else  {
                    container.setTexture('pantalla_opciones_UI', 'Switch_Off.png')
                    target.setTexture('pantalla_opciones_UI', 'Button2_clicked.png');
                    this.scene.scale.stopFullscreen();
                }
                toggleTween?.remove()
                toggleTween = null;
            }
        });
    }

    

    setToggleFullscreen(isFullscreen, center){
        if (!(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream))
        {
            if (isFullscreen){
                this.fullscreenToggleContainer.setTexture('pantalla_opciones_UI', 'Switch_On.png')
                this.fullscreenToggleBall.setTexture('pantalla_opciones_UI', 'Button2_NonClicked.png').setPosition(center+255, this.fullscreenToggleBall.y);
            } 
            else {
                this.fullscreenToggleContainer.setTexture('pantalla_opciones_UI', 'Switch_Off.png')
                this.fullscreenToggleBall.setTexture('pantalla_opciones_UI', 'Button2_clicked.png').setPosition(center+205, this.fullscreenToggleBall.y);
            }
        }
    }

    leftArrowClicked(){
        //this.scene.audioManager.buttonClick.play();
        this.instructionIndex = this.instructionIndex - 1 >= 0 ? this.instructionIndex - 1 : 0;
        this.setInstructionsText();
    }

    rightArrowClicked(){
        //this.scene.audioManager.buttonClick.play();
        if (this.instructionIndex + 1 < this.instructionTexts.length) this.instructionIndex = this.instructionIndex + 1;
        else this.hideInstructions();
        this.setInstructionsText();
    }

    setInstructionsText(){
        for (let i = 0; i < this.instructionTexts.length; i++){
            this.instructionTexts[i].setVisible(false);
        }

        this.leftArrow.setVisible(this.instructionIndex != 0);
        this.rightArrow.setVisible(this.instructionIndex != this.instructionTexts.length-1);
        this.instructionTexts[this.instructionIndex].setVisible(true);
        this.intructionsTitle.setText('Tutorial ' + (this.instructionIndex + 1) + '/'+this.instructionTexts.length);
    }

    showInstructions(callback){
        this.instructionIndex = 0;
        this.setInstructionsText();
        if (callback != null) this.hideInstructions.callback = callback;

        //this.scene.audioManager.pageOpen.play();
        this.instructionsContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hideInstructions(){
        //this.scene.audioManager.buttonClick.play();
        this.instructionsContainer.setVisible(false);
        this.panelContainer.setVisible(false);
        if (this.hideInstructions.callback) this.hideInstructions.callback();
    }

    showOptions(){
        //this.scene.audioManager.pageOpen.play();
        this.optionsContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hideOptions(){
        //this.scene.audioManager.buttonClick.play();
        this.optionsContainer.setVisible(false);
        this.panelContainer.setVisible(false);

        if (this.scene.currentScene.scene.key === 'MainScene') this.showPause();
    }

    showCredits(){
        //this.scene.audioManager.pageOpen.play();
        //this.panel.setDisplaySize(1110, 1200);
        this.creditsContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hideCredits(){
        //this.scene.audioManager.buttonClick.play();
        //this.panel.setDisplaySize(1110, 1150);
        this.creditsContainer.setVisible(false);
        this.panelContainer.setVisible(false);
    }

    showPause(){
        this.pauseContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hidePause(){
       // this.scene.audioManager.buttonClick.play();
        this.pauseContainer.setVisible(false);
        this.panelContainer.setVisible(false);
    }

    showScore(score, newHighScore){
        console.log("SCORE" + newHighScore)
        this.panel.setTexture("panel_dark")
        this.scoreText.setText(score);
        this.recordText.setText(newHighScore);
        let gameplayTime = this.scene.currentScene.finishTime - this.scene.currentScene.startTime;
        
        this.timeText.setText(this.secondsToString(gameplayTime));
        this.scoreContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hideScore(){
        this.panel.setTexture("panel")
        this.scoreContainer.setVisible(false);
        this.panelContainer.setVisible(false);
    }

    secondsToString(seconds) {
        const time = Math.floor(seconds)
        let hour = Math.floor(time / 3600);
        hour = (hour < 10)? '0' + hour : hour;
        let minute = Math.floor((time / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;
        let second = time % 60;
        second = (second < 10)? '0' + second : second;
        return hour + ':' + minute + ':' + second;
    }
}