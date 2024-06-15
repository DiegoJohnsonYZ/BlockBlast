import * as Phaser from 'phaser'



class Piece {
    constructor(color, shape){
        this.color = color
        this.shape = shape
    }
}

class Queue {
    constructor() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }
    enqueue(element) {
      this.elements[this.tail] = element;
      this.tail++;
    }
    dequeue() {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }
    peek() {
      return this.elements[this.head];
    }
    get length() {
      return this.tail - this.head;
    }
    get isEmpty() {
      return this.length === 0;
    }
  }

export class MainScene extends Phaser.Scene{
    
    constructor(){
        super({key: 'MainScene'})
        this.ready = false;
    }
    init(data){
        this.data = data;
    }

    //MENUS 
    ShowTutorial(){
        if(!this.data.get('tutorial')){
            this.sliderTween?.pause()
            this.isPaused = true
            this.data.set(`tutorial`, true);
            this.panel.showInstructions()
        }
        
    }

    CloseInstructions(){
        this.sliderTween?.resume()
        this.isPaused = false
    }


    PauseGame(){
        
        if(!this.pauseOpen){
            this.sliderTween?.pause()
            this.isPaused = true
            this.pauseOpen = true
            this.panel.showPause();
        }
        else{
            this.sliderTween?.resume()
            this.isPaused = false
            this.pauseOpen = false
            this.panel.hidePause()
        }
        
    }

    PauseTimer(){
        if(!this.isPaused){
            this.sliderTween?.pause()
            this.isPaused = true
        }
        else{
            this.sliderTween?.resume()
            this.isPaused = false
        }
    }

    RestartGame(){
        if(this.gameoverTiming){
            clearTimeout(this.gameOverTimeOut)
            this.gameOverTimeOut = null
        }
        this.gamefinish = true
        this.audioManager.stopMusic()
        this.isPaused = false
        this.panel.hideScore()
        this.scene.restart(this.data)
    }

    BackMenu(){
        this.scene.start('MenuScene', this.data);
    }

    //UTILITIES
    addCropResizeMethod = function (gameObject) {
        gameObject.resize = function (width, height) {
            gameObject.setCrop(0, 0, width, height);
            return gameObject;
        }
    
        return gameObject;
    }
    ObtainInt(letter){
        return  letter.charCodeAt(0)-97
    }
    GetRandomInt(max) {

        return Math.floor(Math.random() * max);
    }
    SetCoord(object,x,y){
        let pieceName = object.name.substring(2)
        object.name= x.toString()+y.toString()+pieceName
    }
    SetName(object, newName){
        let tempName = object.name
        let fila = tempName.charAt(0)
        let colummna = tempName.charAt(1)
        object.name = fila + colummna + newName
        
    }

    GetTexture(object){
        return object.name.substring(2)
    }
    CountPieceValue(piece){
        let counterPiece = 0
        for(let i = 0; i < 25; i++){
            if(piece.charAt(i) == 1)counterPiece+=1
        }
        return counterPiece
    }
    CountPieceX(piece){
        let counterPiece = 0
        let counterAux= 0
        let startCount = false
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.charAt((j*5)+i) != 0){
                    counterPiece+=1
                    break
                }
            }
            
        }
        return counterPiece

            
    }
    CountPieceY(piece){
        let counterPiece = 0
        let counterAux= 0
        let startCount = false
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.charAt((i*5)+j) != 0){
                    counterPiece+=1
                    break
                }
            }
            
        }
        return counterPiece
    }

    

    ShuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    SetPiecePosition(piece){
        //X
        console.log(this.CountPieceX(piece))
        switch (this.CountPieceX(piece)) {
            case 1:
                this.posOptionX = 23
                break
            case 2:
                this.posOptionX = 7
                break
            case 3:
                this.posOptionX = 24
                break
            case 4:
                this.posOptionX = 7
                break
            case 5:
                this.posOptionX = 24
                break
            default:
                this.posOptionX = 0
          }
        //Y
        switch (this.CountPieceY(piece)) {
            case 1:
                this.posOptionY = 33
                break
            case 2:
                this.posOptionY = 16
                break
            case 3:
                this.posOptionY = 35
                break
            case 4:
                this.posOptionY = 25
                break
            case 5:
                this.posOptionY = 42
                break
            default:
                this.posOptionY = 10
          }
       
    }






    //PIECE GENERATORS
    CreatePiece(piece, x, y, size, sizeM, pieceWord){
        size = size*sizeM
        const container = this.add.container(x,y)
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.shape.charAt((5*i)+j) != 0){
                    if(this.ObtainInt(piece.shape.charAt((5*i)+j))<-10){
                        let s1 = this.add.image((size*j)-(size*2),(size*i)-(size*2) , this.powerUpsList[piece.shape.charAt((5*i)+j)-1])
                        //s1.setInteractive()
                        s1.setScale(sizeM)
                        //this.input.setDraggable(s1)
                        container.add(s1)
                    }
                    else{
                        let s1 = this.add.image((size*j)-(size*2),(size*i)-(size*2) , pieceWord, this.colorsList[this.ObtainInt(piece.shape.charAt((5*i)+j))])
                        //s1.setInteractive()
                        s1.setScale(sizeM)
                        //this.input.setDraggable(s1)
                        container.add(s1)
                    }
                    
                }
                if(i==2&&j==2){
                    let s2 = this.add.image((size*j)-(size*2),(size*i)-(size*2) ,pieceWord,this.colorsList[this.ObtainInt(piece.shape.charAt((5*i)+j))])
                    s2.setAlpha(0.000001)
                    s2.setScale(2.5)
                    s2.setInteractive()
                    this.input.setDraggable(s2)
                    container.add(s2)
                }
            }
        }
        return container
    }
    ChangePointer(){
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(this.piece.shape.charAt((5*i)+j) != 0){
                    if(this.ObtainInt(this.piece.shape.charAt((5*i)+j))<-10){
                        
                        this.pointer[j][i].setTexture(this.powerUpsList[this.piece.shape.charAt((5*i)+j)-1])
                    }
                    else{
                        this.pointer[j][i].setTexture("originalPiece", this.colorsList[this.ObtainInt(this.piece.shape.charAt((5*i)+j))])
                    }
                    this.pointer[j][i].alpha = 1
                    

                }
                else{
                    this.pointer[j][i].alpha = 0
                }
                
                
            }
        }
    }
    GeneratePiece(){
        let pShape = this.piecesList[this.GetRandomInt(this.piecesList.length)]

        let pTexture = this.GetRandomInt(this.colorsList.length-1)+1
        let chr = String.fromCharCode(97 + pTexture)
        let newPShape = ""
        for(let i = 0; i < 25;i++){
            if(pShape.charAt(i)==="1"){
                newPShape+=chr
            }else{
                newPShape+="0"
            }
        }
        return new Piece(this.colorsList[pTexture],newPShape)
    }
    RegeneratePiece(pShape, canPowerUp){
        
        let pTexture = this.GetRandomInt(this.colorsList.length-1)+1
        let chr = String.fromCharCode(97 + pTexture)
        let newPShape = ""
        for(let i = 0; i < 25;i++){
            if(pShape.charAt(i)==="1"){
                newPShape+=chr
            }else{
                newPShape+="0"
            }
        }
        if(canPowerUp)newPShape = this.convertirPowerUp(newPShape)
        console.log("the texture number is " + pTexture)
        console.log("the texture is " + this.colorsList[pTexture])
        console.log("the previous shape is " + pShape)
        console.log("the shape is " + newPShape)
        return new Piece(this.colorsList[pTexture],newPShape)
    }

    convertirPowerUp(string) {
        // Convertimos el string en un array para poder modificarlo
        let array = string.split('');
    
        // Buscamos todas las posiciones donde hay '1'
        let posiciones_1 = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] != '0') {
                posiciones_1.push(i);
            }
        }
    
        // Si no hay '1', retornamos el string original
        if (posiciones_1.length === 0) {
            return string;
        }
    
        // Seleccionamos aleatoriamente una posición para reemplazar con 'C'
        let posicion_aleatoria = posiciones_1[Math.floor(Math.random() * posiciones_1.length)];
    
        // Reemplazamos  en la posición aleatoria el powerUp
        
        let pp = this.GetRandomInt(2)+1
        console.log("TRY"+pp)
        array[posicion_aleatoria] = pp;
    
        // Unimos el array de nuevo en un string y lo retornamos
        return array.join('');
    }





    //PIECES MANAGEMENT IN GAME
    CanPutPiece(piece, x,y){
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.charAt((5*i)+j) != 0){
                    if(i+y > this.boardMatrix.length-1 || j + x >this.boardMatrix[0].length-1|| i+y<0||j+x<0){
                        
                        return false
                    }
                    else if(this.boardMatrix[j+x][i+y] != 0){
                        return false
                    }
                
                }
                
                
            }
        }
        return true
    }

    DrawPiece(piece,x,y){
        this.piecesToClear = []
        this.colorsToRestore = []
        let list = new Array()
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.shape.charAt((5*i)+j) != 0){
                    if(piece.shape.charAt((5*i)+j) == 1){
                        //this.BombBreakingLines(j+x,i+y)
                    }
                    this.board[j+x][i+y].setTint(899499)
                    list.push(this.board[j+x][i+y])
                    this.lineCounterXadd[i+y] += 1
                    this.lineCounterYadd[j+x] += 1
                }
                
                
            }
        }
        this.ShowBreakingLines()
        return list

    }

    InsertPiece(piece,x,y){
        if(this.isPaused)return
        this.newScorePoints = 0
        this.StopVibration()
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.shape.charAt((5*i)+j) != 0){
                    if(this.ObtainInt(piece.shape.charAt((5*i)+j))<-10){//powerups
                        this.board[j+x][i+y].setTexture(this.powerUpsList[piece.shape.charAt((5*i)+j)-1]).setTint(0xffffff).visible = true
                        
                        this.powerUpsInGame[(j+x).toString()+(i+y).toString()] = (j+x).toString()+(i+y).toString()
                        this.SetName(this.board[j+x][i+y],this.powerUpsList[piece.shape.charAt((5*i)+j)-1])
                    }
                    else{//piezas normales
                        let colorForPiece = this.colorsList[this.ObtainInt(piece.shape.charAt((5*i)+j))]
                        this.board[j+x][i+y].setTexture("piece",colorForPiece).setTint(0xffffff).visible = true
                        this.idleboard[j+x][i+y].play("idle_"+colorForPiece[17],true).visible = true
                        this.SetName(this.board[j+x][i+y],this.colorsList[this.ObtainInt(piece.shape.charAt((5*i)+j))])
                    }
                    
                    this.boardMatrix[j+x][i+y] = 1
                    this.lineCounterX[i+y] += 1
                    this.lineCounterY[j+x] += 1
                    this.newScorePoints += 10
                }
                
                
            }
        }



        console.log("CHECK=========================================")
        
        if(!this.isStarting){
            this.refillCounter +=1
            this.CreateNumbersText(x,y,this.newScorePoints)
            this.BreakLine(x,y)
        }
        for(let i = 0; i < 8; i++){
            let line = "CHECK"
            for(let j = 0; j < 8; j++){
                //console.log(this.board[j][i].name.length)
                if(this.board[j][i].name.length < 3 || this.board[j][i].name.length > 27)line+="0|"
                else line+= this.board[j][i].name.charAt(19) +"|"

            }
            console.log(line)
        }
        //console.log("POWER" + this.powerUpsInGame)
        //this.currentTime += (this.secondsToAdd*2)
        
    }
    FinishTurn(){
        this.scorePoints += this.newScorePoints
        this.scoreText.setText(this.scorePoints.toString().padStart(8, '0') )
        if(this.CheckGameOver() && this.refillCounter <3){
            this.sliderTween?.pause()
            this.isPaused = true
            this.MakeGameOver()
        }
        if(this.refillCounter>=3){
            this.RemoveOptions()
            this.CreateOptions()
            this.refillCounter = 0
        }
    }
    DeletePiece(pieces){
        pieces.forEach((element)=> element.setTint(0xffffff))
        pieces.forEach((element)=> element.setTexture("piece",this.colorsList[0]))
    }


    ShowContainerWithFade(scene, fila, columna, fadeInDuration, displayDuration, fadeOutDuration, container) {
        
        container.x = (fila*this.squareSize )+this.offsetX
        container.y =(columna*this.squareSize )+this.offsetY
        // Crear el tween para el fade in
        scene.tweens.add({
            targets: container,
            alpha: 1, // Opacidad completa
            duration: fadeInDuration,
            onComplete: () => {
                // Después del fade in, esperar el displayDuration y luego hacer fade out
                scene.time.delayedCall(displayDuration, () => {
                    scene.tweens.add({
                        targets: container,
                        alpha: 0, // Volver a transparente
                        duration: fadeOutDuration,
                        onComplete: () => {
                            // Destruir el contenedor después del fade out
                            container.destroy();
                        }
                    });
                });
            }
        });
    }
    

    BreakLine(x,y){
        if(this.linesToClear.length<1||this.gamefinish) {
            this.FinishTurn()
            return
        }
        if(this.animationsIterator === 0)this.PauseTimer()
        
        this.piecesToClear = []
        this.colorsToRestore = []
        this.lineCounterXadd = [0,0,0,0,0,0,0,0]
        this.lineCounterYadd = [0,0,0,0,0,0,0,0]


        //RECORRER CADA LINEA Y ROMPER EL PRIMER ELEMENTO
        for(let i = 0; i < this.linesToClear.length; i++){
            let aux = this.linesToClear[i]
            let filas = 0
            let columnas = 0
            if(aux>7){
                //PARA EL EJE Y
                filas = aux-8
                columnas = this.animationsIterator
                
            }
            else{
                //PARA EL EJE X
                
                filas = this.animationsIterator
                columnas = aux
            }
            
            this.BreakPiece(filas,columnas,false)
            


            

        }

        //ACTUALIZAR ITERADOR
        this.animationsIterator +=1

        if(this.animationsIterator>7){
            this.animationsIterator = 0

            //FINAL ANIMATIONS

            let aux = this.linesToClear[0]
            let filas = 0
            let columnas = 0
            if(aux>7){
                //PARA EL EJE Y
                filas = aux-8 -3
                columnas = this.animationsIterator+4
                
            }
            else{
                //PARA EL EJE X
                
                filas = this.animationsIterator+4
                columnas = aux -3
            }


            let combo = this.linesToClear.length
          
            let numberCombo = 0;
            for (let i = 1; i <= combo; i++) {
                numberCombo += i;
            }
            numberCombo*= 1000;
            this.newScorePoints += numberCombo
            //this.CreateNumbersText(x,y,number)
            this.CreateComboText(filas,columnas,combo,numberCombo)

            this.RecountLineCounters()
            this.PauseTimer()
            this.FinishTurn()
            

        }
        else{
            //MANDAR LA SIGUIENTE ANIMACION
            setTimeout(() => {
                this.BreakLine(x,y)
            }, 50);
        }

        


       
        //if(this.rotateBool){
            //this.rotateBool = false
            //this.RotatePowerup()
        //}
        
    }

    CreateEffectText(filas,columnas,effect){
        this.effectText = this.add.image(0, 0, 'textos',effect).setDepth(6)
        this.effectTextContainer = this.add.container(0,0).setDepth(6)
        this.effectTextContainer.add(this.effectText)
        this.effectTextContainer.setAlpha(0)
        this.ShowContainerWithFade(this, filas, columnas, 200, 400, 200, this.effectTextContainer);
    }

    CreateNumbersText(filas,columnas,number){
        let strNumber = number.toString()
        
        this.effectTextContainer = this.add.container(0,0).setDepth(6)
        this.effectTextContainer.add(this.add.image(0, 0, 'textos', "+.png").setDepth(6))
        for(let i = 0; i<=strNumber.length; i++){
            if(i===strNumber.length){
                let number = this.add.image((i*32)+65, 0, 'textos',  "pts.png").setDepth(6)
                this.effectTextContainer.add(number)
            }
            else{
                let number = this.add.image((i*32)+32, 0, 'textos', strNumber[i] + ".png").setDepth(6)
                this.effectTextContainer.add(number)
            }
            
        }
        this.effectTextContainer.setAlpha(0)
        this.ShowContainerWithFade(this, filas+2, columnas+2, 200, 400, 200, this.effectTextContainer);
    }
    CreateComboText(filas,columnas,combo, number){
        //columnas-=2
        //filas+=3
        this.effectTextContainer = this.add.container(0,0).setDepth(6)

        //COMBO


        
        this.effectTextContainer.add(this.add.image(40, 0, 'textos', "combo.png").setDepth(6))
        this.effectTextContainer.add(this.add.image(140, 0, 'textos', combo.toString()+".png").setDepth(6))

        //PTS
        this.effectTextContainer.add(this.add.image(0, 50, 'textos', "+.png").setDepth(6))
        let strNumber = number.toString()
        for(let i = 0; i<=strNumber.length; i++){
            if(i===strNumber.length){
                let number = this.add.image((i*32)+65, 50, 'textos',  "pts.png").setDepth(6)
                this.effectTextContainer.add(number)
            }
            else{
                let number = this.add.image((i*32)+32, 50, 'textos', strNumber[i] + ".png").setDepth(6)
                this.effectTextContainer.add(number)
            }
            
        }
        this.effectTextContainer.setAlpha(0)
        this.ShowContainerWithFade(this, filas+2, columnas+2, 200, 400, 200, this.effectTextContainer);
    }

    BreakPiece(filas, columnas, bomb){
        if(this.GetTexture(this.board[filas][columnas]) != this.colorsList[0]){
            if(this.GetTexture(this.board[filas][columnas])=='reduct'){
                //POWERUP CONVERTIDOR
                this.CreateEffectText(filas,columnas,"reductor.png")
                this.ConverterPowerUp()

            }
            if(this.GetTexture(this.board[filas][columnas])=='rotate'){
                //POWERUP ROTAR
                this.rotateBool = true

            }
            if(this.GetTexture(this.board[filas][columnas])=='bomb'){
                //POWERUP BOMBA
                this.BombBreakingLines(filas,columnas)
                this.CreateEffectText(filas,columnas,"bomba.png")
                this.MakeAnimation(filas,columnas,"bombFx")
            }
            else{
                if(!bomb)this.MakeAnimation(filas,columnas,"destroyFx")
                this.board[filas][columnas].anims.pause()
                this.board[filas][columnas].setTint(0xffffff)
                this.board[filas][columnas].setTexture("piece",this.colorsList[0])
                this.idleboard[filas][columnas].anims.pause()
                this.idleboard[filas][columnas].visible = false
                this.SetName(this.board[filas][columnas],this.colorsList[0])
                this.boardMatrix[filas][columnas] = 0
            } 
            //this.scorePoints+=1
            
            
            let dictKey = filas.toString()+columnas.toString()
            if((dictKey) in this.powerUpsInGame){
                delete this.powerUpsInGame[dictKey]
                console.log("POWER " + dictKey)
            }
        }
    }

    RecountLineCounters(){
        for(let i = 0; i < 8; i++){
            let counterX = 0
            let counterY = 0
            for(let j = 0; j < 8; j++){
                //count X
                if(this.boardMatrix[j][i]==1){
                    counterX++
                }
                //count Y
                if(this.boardMatrix[i][j]==1){
                    counterY++
                }

            }
            this.lineCounterX[i]=counterX
            this.lineCounterY[i]=counterY
        }
    }

    ShowBreakingLines(){
        
        
        this.secondsToAdd = 0
        for(let i = 0; i < this.boardSize; i++){
            
            if(this.lineCounterXadd[i]+this.lineCounterX[i]== this.boardSize){
                this.linesToClear.push(i)
                for(let j = 0; j < this.boardSize; j++){

                    this.piecesToClear.push(this.idleboard[j][i])
                    this.colorsToRestore.push(this.GetTexture(this.board[j][i]))
                    if(this.GetTexture(this.board[j][i]).startsWith("blockblast")) {
                        this.idleboard[j][i].anims.pause()
                        this.idleboard[j][i].setTexture("originalPiece",this.piece.color)}
                    else this.StartVibration(this.board[j][i])

                    

                    
                }
            }
            if(this.lineCounterYadd[i]+this.lineCounterY[i]== this.boardSize){
                this.linesToClear.push(i+8)
                for(let j = 0; j < this.boardSize; j++){
                    this.piecesToClear.push(this.idleboard[i][j])
                    this.colorsToRestore.push(this.GetTexture(this.board[i][j]))
                    if(this.GetTexture(this.board[i][j]).startsWith("blockblast")){
                        this.idleboard[i][j].anims.pause()
                        this.idleboard[i][j].setTexture("originalPiece",this.piece.color)}
                        else this.StartVibration(this.board[i][j])
                   
                    
                }
            }
            
        }
        
    }

    RestoreColors(){
        
        for(let i = 0; i < this.colorsToRestore.length; i++){

            console.log(this.colorsToRestore[i])
            if(this.colorsToRestore[i].startsWith("blockblast")) this.piecesToClear[i].play("idle" + this.colorsToRestore[i][17],true)


            
            
        }
        if(this.piecesToDelete.length > 0)this.DeletePiece(this.piecesToDelete)
        
    }

    //POWERUPS
    RotatePowerup(){
        
        console.log("ROTATE")
        let container = this.boardContainer
        let newAngle = this.boardAngle + 90
        if(newAngle>180) newAngle = -90
        // Tween para rotar el contenedor 90 grados
        this.tweens.add({
            targets: container,
            angle: newAngle,
            duration: 500, // Duración de la animación en milisegundos
            ease: 'Linear', // Tipo de easing (opcional)
            repeat: 0, // Número de repeticiones (-1 para infinito)
            yoyo: false // Si se debe invertir la animación al finalizar
        });
        this.boardMatrix = this.RotateMatrixAntiClockwise(this.boardMatrix)
        this.board = this.RotateMatrixAntiClockwise(this.board)
        this.RecountLineCounters()
        this.RenameBoard()
        this.boardAngle = newAngle



        

    }

    RenameBoard(){
        
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                this.SetCoord(this.board[i][j],i,j)

            }
        }
    }

    RotateMatrix(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const rotatedMatrix = [];
    
        for (let i = 0; i < cols; i++) {
            rotatedMatrix.push([]);
            for (let j = rows - 1; j >= 0; j--) {
                rotatedMatrix[i].push(matrix[j][i]);
            }
        }
    
        return rotatedMatrix;
    }
    
    RotateMatrixAntiClockwise(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const rotatedMatrix = [];
    
        for (let i = cols - 1; i >= 0; i--) {
            rotatedMatrix.push([]);
            for (let j = 0; j < rows; j++) {
                rotatedMatrix[cols - 1 - i].push(matrix[j][i]);
            }
        }
    
        return rotatedMatrix;
    }
    ConverterPowerUp(){
        this.RemoveOptions()
        //calculamos cuantas piezas necesitamos
        let remainingPieces = 0
        for(let k = 0; k < 3; k++){
            if(this.optionsBools[k]){
                remainingPieces++
            }                   
        }
        //SI YA NO QUEDAN PIEZAS
        if(remainingPieces === 0){
            this.converterBool = true
        }else{
            this.ReductAnimation()
            //SI QUEDAN
            let pieceOption = this.RegeneratePiece("0000000000001000000000000", false)


            



            if(this.optionsBools[0]){
                //creamos pieza
                
                this.SetPiecePosition(pieceOption.shape)
                this.option1 = this.CreatePiece(pieceOption, 965-this.posOptionX,337-this.posOptionY,100,0.45,"originalPiece")
                this.option1.setDepth(5)
                this.option1.name = "0"
                this.optionsPieces[0] = pieceOption
            }
            if(this.optionsBools[1]){
                //creamos pieza
                this.SetPiecePosition(pieceOption.shape)
                this.option2 = this.CreatePiece(pieceOption, 965-this.posOptionX,590-this.posOptionY,100,0.45,"originalPiece")
                this.option2.setDepth(5)
        
                this.option2.name = "1"
                this.optionsPieces[1] = pieceOption
            }
            if(this.optionsBools[2]){
                //creamos pieza
                this.SetPiecePosition(pieceOption.shape)
                this.option3 = this.CreatePiece(pieceOption, 965-this.posOptionX,839-this.posOptionY,100,0.45,"originalPiece")
                this.option3.setDepth(5)
        
                this.option3.name = "2"
                this.optionsPieces[2] = pieceOption
            }
            
            
        }
        
        
        
    }

    
   
    BombBreakingLines(fila,columna){
        this.board[fila][columna].anims.pause()
        this.board[fila][columna].setTint(0xffffff)
        this.board[fila][columna].setTexture("piece",this.colorsList[0])
        this.SetName(this.board[fila][columna],this.colorsList[0])
        this.boardMatrix[fila][columna] = 0
        this.MakeAnimation(fila,columna,"bombFx")
        fila = parseInt(fila)
        columna = parseInt(columna)
        console.log("BREAKLINE  in function" + this.piecesToClear.length)
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                // Calculamos las nuevas coordenadas
                const nuevaFila = fila + i;
                const nuevaColumna = columna + j;
                console.log("BREAKLINE  in function" + this.piecesToClear.length)
                // Verificamos si las nuevas coordenadas están dentro de los límites de la matriz
                if (nuevaFila >= 0 && nuevaFila < 8 && nuevaColumna >= 0 && nuevaColumna < 8) {
                    if(i == j && i==0){
                        continue
                    }
                    console.log("BREAKLINE  in function" + this.piecesToClear.length)
                        // Agregamos las coordenadas válidas a la lista de variables circundantes
                        //variablesCircundantes.push([nuevaFila, nuevaColumna]);
                        this.BreakPiece(nuevaFila, nuevaColumna,true)
                }
                    
            }
        }
    }

    

    

    
    

    CreateOptions(){
        if(this.converterBool){
            this.sliderTween?.pause()
            this.isPaused = true
        }
        this.powerupcd +=1
        console.log("COOLDOWN "+this.powerupcd)
        this.optionsBools[0] = true
        this.optionsBools[1] = true
        this.optionsBools[2] = true

        this.posOptionX = 500
        this.posOptionY = 400
        console.log(this.posOptionX )
        
        if(this.queuePieces.isEmpty)this.queuePieces = this.GetBestPieces()
        console.log(this.queuePieces.length)

        this.ShowTime()

        this.probArray = [false,false,false]
        console.log(this.probArray)
        let probPowerUp = this.GetRandomInt(10)
        if(probPowerUp <4 && this.powerupcd > 4){
            this.probArray = [true,false,false]
            this.powerupcd = 0
        } 
        this.ShuffleArray(this.probArray)
        
        
        console.log(this.probArray)
        let pieceOption = this.RegeneratePiece(this.queuePieces.dequeue(), this.probArray[0])
        this.SetPiecePosition(pieceOption.shape)
        this.option1 = this.CreatePiece(pieceOption, 965-this.posOptionX,337-this.posOptionY,100,0.45,"originalPiece")
        this.option1.setDepth(4)
        this.option1.name = "0"
        this.optionsPieces[0] = pieceOption

        pieceOption = this.RegeneratePiece(this.queuePieces.dequeue(), this.probArray[1])
        this.SetPiecePosition(pieceOption.shape)
        this.option2 = this.CreatePiece(pieceOption, 965-this.posOptionX,590-this.posOptionY,100,0.45,"originalPiece")
        this.option2.setDepth(4)
        this.option2.name = "1"
        this.optionsPieces[1]=pieceOption

        pieceOption = this.RegeneratePiece(this.queuePieces.dequeue(), this.probArray[2])
        this.SetPiecePosition(pieceOption.shape)
        this.option3 = this.CreatePiece(pieceOption, 965-this.posOptionX,839-this.posOptionY,100,0.45,"originalPiece")
        this.option3.setDepth(4)
        this.option3.name = "2"
        this.optionsPieces[2]=pieceOption

        const tween = this.tweens.add({
            targets: [this.option1, this.option2, this.option3],
            scale: { from: 0.01, to: 1 }, // Escalado de 0.01 a 0.45
            duration: 300, // Duración del tween en milisegundos
            ease: 'Cubic.easeIn', // Tipo de interpolación
            onComplete: () => {
                // Limpia el tween después de que termine
                if(this.converterBool){
                    this.ConverterPowerUp()
                    this.sliderTween?.resume()
                    this.isPaused = false
                }
                this.converterBool = false
                tween.remove();
            }
        });


        this.currentTime = this.maxTimePerTurn
    }

    RemoveOptions(){
        this.option1.destroy()
        this.option2.destroy()
        this.option3.destroy()
    }
    

   
    
    CheckGameOver(){
        console.log(this.optionsBools)
        for(let i = -4; i < this.boardSize+2; i++){
            for(let j = -4; j < this.boardSize+2; j++){
                for(let k = 0; k < 3; k++){
                    if(this.optionsBools[k]){
                        if(this.CanPutPiece(this.optionsPieces[k].shape,i,j)){
                            
                            return false
                        }
                    }                   
                }
            }
        }
        for(let k = 0; k < 3; k++){
            if(this.optionsBools[k]){
                switch(k){
                    case 0:
                        this.StartVibration(this.option1)
                        break
                    case 1:
                        this.StartVibration(this.option2)
                        break
                    case 2:
                        this.StartVibration(this.option3)
                        break    
                }
            }
        }
        return true
    }
    
    ObtainPositions(board){
        let positionArray = []
        for(let i = 0; i < board.length; i++){
            let lineCounter = 0
            for(let j = board.length-1; j>=0;j--){
                if(j!= 0){
                    if(board[j-1][i] != 0 && board[j][i]==0){
                        positionArray.push((i*board.length)+j)
                        //console.log((i*board.length)+j)
                    }
                }
                
                if(board[j][i]!=0 ) lineCounter+=1
                if(j==0){
                    if(lineCounter>=3&&board[j][i]==0){
                        positionArray.push(i*board.length)
                    }
                }

            }

        }
        return positionArray
    }
    
    //TestPiece(board, piece, x ,y)
    CheckPiece(board, piece, x, y){
        let auxX = 0
        let startChecking = false
        //console.log("checking piece " + piece)
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){

                if(piece.charAt((5*i)+j) != 0){
                    if(x >= 0 && x<=7 && y >= 0 && y<=7 ){
                        //console.log("starts at " + i.toString() + " " + j.toString())
                        if(!startChecking)auxX = x-j
                        startChecking = true
                        //console.log("board " + x.toString() + " " + y.toString())
                        if(board[x][y] !=0 ){
                            //console.log("not fit")
                            return false
                        }
                    }
                    else{
                        //console.log("more than limits")
                        return false
    
                    } 
                }
                if(startChecking)x+=1
            }
            if(startChecking){
                y+=1
                x=auxX
            }
        }
        return true
    }

    ShineBlock(){
        for (let clave in this.powerUpsInGame) {
            if (this.powerUpsInGame.hasOwnProperty(clave)) {
                console.log('POWER' + this.board[clave[0]][clave[1]].name)
                this.board[clave[0]][clave[1]].play(this.GetTexture(this.board[clave[0]][clave[1]]),true)
            }
        }
        
    }
    SpecialBlock(){
        let x = this.GetRandomInt(7)
        let y = this.GetRandomInt(7)
        let blockname = this.GetTexture(this.board[x][y]).slice(0, -4) + "_special.png"
        console.log("SPECIAL" + blockname)
        if(this.textures.get('piece').getFrameNames().includes(blockname)){
            this.idleboard[x][y].setTexture('piece', blockname )
        }
       
    }


    InsertPieceBoard(board,linecounterX, linecounterY, piece,x,y){
        
        let auxX = 0
        let startChecking = false
        let deleteX = false
        let deleteY = false
        let score = 0
        //console.log("checking piece " + piece)
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){

                if(piece.charAt((5*i)+j) != 0){
                    score+=3
                    deleteX = false
                    deleteY = false
                    if(!startChecking)auxX = x-j
                    startChecking = true
                    board[x][y] = 1
                    linecounterX[x]+=1
                    linecounterY[y]+=1
                    if(linecounterX[x]>7)deleteX=true
                    if(linecounterY[y]>7)deleteY=true
                    for(let k = 0; k<this.boardSize;k++){
                        if(deleteY){
                            score+=1
                            board[x][k] = 0
                            linecounterY[k] = Phaser.Math.Clamp(linecounterY[k]-1,0,7)
                        }
                        if(deleteX){
                            score+=1
                            board[k][y] = 0
                            linecounterX[k] = Phaser.Math.Clamp(linecounterX[k]-1,0,7)
                        }
                    }
                }
                if(startChecking)x+=1
            }
            if(startChecking){
                y+=1
                x=auxX
            }

        }
        return score

    }
    

    GetBestPieces(){
        //lista de piezas
        let trueList = []
        let listPieces = []
        let actualScore = 0
        let numDif = 200

        

        for(let it = 0; it < numDif; it++){
            listPieces = []
            //ciclo para buscar las 3 piezas
            //console.log("Test =========================================")
            //copiar el tablero
            let newBoard = []
            for (let i = 0; i < this.boardSize; i++)newBoard[i] = this.boardMatrix[i].slice()
            //Copiar counters
            let newLineCounterY = this.lineCounterX.slice()
            let newLineCounterX = this.lineCounterY.slice()
            //console.log(newLineCounterX)
            //console.log(newLineCounterY)
            //console.log(newBoard)

            let scoreAcum = 0
            
            for(let i = 0; i < 3; i++){
                let forBreak = false
                //Obtener las posiciones y randomizarlas
                this.positions = this.ObtainPositions(newBoard)
                this.ShuffleArray(this.positions)
                let iterator = 0
                let y = ~~(this.positions[i]/this.boardSize)
                
                let x = this.positions[i]%this.boardSize
                //console.log("coordenadas " + x.toString() + " y " + y.toString() )
                this.ShuffleArray(this.piecesList)
                //Revisar si las pieza entran
                for(let j = 0; j<this.piecesList.length; j++){
                    if(this.CheckPiece(newBoard,this.piecesList[j],x,y)){
                        let score = this.InsertPieceBoard(newBoard,newLineCounterX,newLineCounterY,this.piecesList[j],x,y)
                        //console.log(newLineCounterX)
                        //console.log(newLineCounterY)
                        //console.log(newBoard)
                        listPieces.push(this.piecesList[j])
                        scoreAcum+= score
                        forBreak = true
                        //console.log("selected piece is " + this.piecesList[j])
                        //console.log("sum " + scoreAcum.toString() + " mas " + score.toString())
                        break
                    }
                    
                }
                if(!forBreak){
                    listPieces.push(this.piecesList[0])
                }

                
            }
            while(listPieces.length<3){
                this.ShuffleArray(this.piecesList)
                listPieces.push(this.piecesList[0])
            }
            if(scoreAcum > actualScore){
                trueList = listPieces
                actualScore = scoreAcum
            }
        }
        
        let q = new Queue()
        for(let j = 0; j < trueList.length;j++){
            q.enqueue(trueList[j])
        }

        return q
    }


    CheckValue(piece, x,y){
        this.lineCounterXadd = [0,0,0,0,0,0,0,0]
        this.lineCounterYadd = [0,0,0,0,0,0,0,0]
            
        let counterPoints = 0
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.charAt((5*i)+j) != 0){
                    if(i+y > this.boardMatrix.length-1 || j + x >this.boardMatrix[0].length-1|| i+y<0||j+x<0){
                            
                        return -1
                    }
                    else if(this.boardMatrix[j+x][i+y] != 0){
                        return -1
                    }
                    else{
                        this.lineCounterXadd[i+y] += 1
                        this.lineCounterYadd[j+x] += 1
                    }


                    
                }
                    
                    
            }
        }
        for(let i = 0; i < this.boardSize; i++){
            if(this.lineCounterX[i]+this.lineCounterXadd[i]>7)counterPoints+=1
            if(this.lineCounterY[i]+this.lineCounterYadd[i]>7)counterPoints+=1
        }

        return this.counter
    }

    MakeAnimation(x,y,effect){
        this.animationBoard[x][y].visible = true
   
        this.animationBoard[x][y].play(effect,true)
    }
    ReductAnimation(){
        if(this.optionsBools[0]){
            this.option1anim.visible = true
            this.option1anim.play("reductFx",true)
        }   
        if(this.optionsBools[1]){
            this.option2anim.visible = true
            this.option2anim.play("reductFx",true)
        }   
        if(this.optionsBools[2]){
            this.option3anim.visible = true
            this.option3anim.play("reductFx",true)
        }   
    }


    FormatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let secs = seconds - minutes * 60;
        // Asegurarse de que los segundos estén en dos dígitos
        secs = secs < 10 ? '0' + secs : secs;
        return minutes + ':' + secs;
    }
    

    StartVibration(element) {
        this.boardContainer.bringToTop(element)
            let vibrateTween = this.tweens.add({
                targets: element,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 400,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            })
            this.vibrateTweens.push(vibrateTween)
    }
    
    StopVibration() {
        this.vibrateTweens.forEach(tween => {
            tween.stop();
            tween.targets[0].setScale(1, 1); // Restablecer la escala del elemento a la normalidad
        });
        this.vibrateTweens = [];
    }


    ShowTime(){
        console.log("TIMER IS WORKING")
        this.sliderTween?.remove();
        this.sliderTween = null;
        this.maxTimePerTurn-=.2
        this.timeSlider.childrenMap.indicator.setTexture('timerBar','verde.png')
        console.log("TIMER " + this.maxTimePerTurn +" VS " + this.level2Time)
        console.log("TIMER " + this.maxTimePerTurn +" VS " + this.level1Time)
        if(this.maxTimePerTurn<this.minTimePerTurn)this.maxTimePerTurn=this.minTimePerTurn
        //else if(this.maxTimePerTurn<this.level2Time){
           // this.timeSlider.childrenMap.indicator.setTexture('timerBar','rojo.png')
        //}else if(this.maxTimePerTurn<this.level1Time){
           // this.timeSlider.childrenMap.indicator.setTexture('timerBar','amarillo.png')
        //}

        
        let limit = 0.3
        this.sliderTween = this.tweens.add({
            targets: this.timeSlider,
            duration: this.maxTimePerTurn*1000,
            repeat: 0,
            ease: 'linear',
            value: {
              getStart: () => 1,
              getEnd: () => 0
            },
            onUpdate: function(tween, target){
                let indicator = target.getElement('indicator');
                //target.getElement('thumb').x = target.getElement('thumb').x+3; // Ajustar la posición del thumb
                 // Obtén el valor actual del slider
                let value = target.value;

                // Ajustar el tamaño del indicador según el valor actual
                let indicatorWidth = value *  600; // Ajusta este valor según el tamaño de tu indicador
                indicator.resize(indicatorWidth, 40);

                // Ajustar la posición del thumb según el valor actual
                let thumbX = (target.width ) * value;
                target.getElement('thumb').setX(thumbX+200);
                //if(value <= .6 && value >= .4)indicator.setFrame('amarillo.png');
                if (value <= limit) {
                    limit-=0.01
                    
                    let currentFrame = indicator.frame.name;
                    indicator.setFrame(currentFrame === 'verde.png' ? 'rojo.png' : 'verde.png');
                }
               
                

            },
            onComplete: () => {
                
                console.log("¡Tiempo agotado!")
                this.StartGameOver()
                this.sliderTween?.remove();
                this.sliderTween = null;
            }
        });
    }
    
    MakeGameOver(){

        this.isPaused=true
        this.gameoverTiming = true
        this.tweens.add({
            targets: this.finalScreen,
            y: 550, // Posición final en el eje Y
            ease: 'Power1', // Efecto de easing
            duration: 1000, // Duración del tween en milisegundos
            delay: 1500 // Retardo antes de que empiece el tween
        });

        this.gameOverTimeOut = setTimeout(() => {
                
                this.StartGameOver()
        }, 2500);
                
    }

    StartGameOver(){
        this.StopVibration()
        this.isPaused = true
        this.sliderTween?.remove();
        this.sliderTween = null;

        this.finishTime = this.time.now * 0.001
        //this.panel.showScore(this.scorePoints,this.scorePoints)
        const newScore = this.scorePoints;

        const highScore = parseInt(this.data.get(`highScore`));
        const gameplayTime = this.finishTime - this.startTime;

        if(newScore >= highScore){
            this.data.set(`highScore`, newScore);
            
            this.panel.showScore(newScore, newScore);
        }else{
            this.panel.showScore(newScore, highScore);
        }

        this.game.config.metadata.onGameEnd({state:`game_end`, name:`blockblast`, score:newScore, time:gameplayTime});
    }

    preload(){
        //this.load.image("table_shadow", "src/images/blockblast_backgroud_table_shadow.png")
        this.load.image("table", "src/images/parchados_chess.png")
        this.load.image("b_box", "src/images/parchados_table.png")
        this.load.image("final", "src/images/pantallafinalb.png")
        //IN GAME UI
        this.load.atlas('inGameUI', './src/images/ui/pausa_ajustes/sprites.png', './src/images/ui/pausa_ajustes/sprites.json');
        //TABLE DECOR
        this.load.atlas("table_decor", "src/images/decor/sprites.png", "src/images/decor/sprites.json") 
       
        //PREVIEW SPACE
        this.load.image("preview_space", "src/images/preview_space/parchados_piecespace.png") 

        //PIECES
        this.load.atlas("piece", "src/images/blockblast_piece/sprites.png", "src/images/blockblast_piece/sprites.json") 
        //ORIGINAL PIECES
        this.load.atlas("originalPiece", "src/images/originalPiece/sprites.png", "src/images/originalPiece/sprites.json") 
        //POWER UPS
        this.load.atlas("powerUps", "src/images/BlockBlastPowerUps/sprites.png", "src/images/BlockBlastPowerUps/sprites.json")

        //TIMER BAR
        this.load.atlas('timerBar', './src/images/ui/cronometro/sprites.png', './src/images/ui/cronometro/sprites.json');

        //TEXTOS
        this.load.atlas('textos', './src/images/ui/text/sprites.png', './src/images/ui/text/sprites.json');



        this.load.spritesheet('bomb', 'src/images/BlockBlastPowerUps/blockblast_powerup_bomb/blockblast_powerup_bomb.png', {
            frameWidth: 89,
            frameHeight: 89
            
            });
        this.load.spritesheet('reduct', 'src/images/BlockBlastPowerUps/blockblast_powerup_reduct/blockblast_powerup_reduct.png', {
        frameWidth: 89,
        frameHeight: 89
        
        });
        this.load.spritesheet('rotate', 'src/images/BlockBlastPowerUps/blockblast_powerup_rotate/blockblast_powerup_rotate.png', {
            frameWidth: 89,
            frameHeight: 89
            
            });



        this.load.spritesheet('bombFx', 'src/images/fx/parchados_fx_bomb/spritesheet.png', {
            frameWidth: 500,
            frameHeight: 500
            
            });
        this.load.spritesheet('destroyFx', 'src/images/fx/parchados_fx_destruccion/spritesheet.png', {
            frameWidth: 500,
            frameHeight: 500
            
            });
        this.load.spritesheet('reductFx', 'src/images/fx/parchados_fx_reduccion/spritesheet.png', {
            frameWidth: 200,
            frameHeight: 200
            
            });

        //ANIMATIONS IDLE

        this.load.spritesheet('idle_a', 'src/images/piece_animations/idle_a.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        this.load.spritesheet('idle_b', 'src/images/piece_animations/idle_b.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        this.load.spritesheet('idle_c', 'src/images/piece_animations/idle_c.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        this.load.spritesheet('idle_d', 'src/images/piece_animations/idle_d.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        this.load.spritesheet('idle_e', 'src/images/piece_animations/idle_e.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        this.load.spritesheet('idle_f', 'src/images/piece_animations/idle_f.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        this.load.spritesheet('idle_g', 'src/images/piece_animations/idle_g.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        this.load.spritesheet('idle_h', 'src/images/piece_animations/idle_h.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        this.load.spritesheet('idle_i', 'src/images/piece_animations/idle_i.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        this.load.spritesheet('idle_j', 'src/images/piece_animations/idle_j.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        this.load.spritesheet('idle_k', 'src/images/piece_animations/idle_k.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        this.load.spritesheet('idle_l', 'src/images/piece_animations/idle_l.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        this.load.spritesheet('idle_m', 'src/images/piece_animations/idle_m.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        this.load.spritesheet('idle_n', 'src/images/piece_animations/idle_n.png', {
            frameWidth: 90,
            frameHeight: 90
            
            });
        
    }

   

    create(){

        //CAMBIAR NOMBRE CUANDO SEA NECESARIO
        this.game.config.metadata.onGameStart({state:`game_start`, name:`blockblast`});

        this.uiScene = this.scene.get('UIScene');
        this.uiScene.setCurrentScene(this);
        
        this.dim = this.game.config.width;
        this.startTime = this.time.now * 0.001

        //INSTANCES
        this.panel = this.uiScene.panel;
        this.audioManager = this.uiScene.audioManager;

        this.panel.createPausePanel(this.dim);
        //this.panel.createInstructionsPanel(this.dim);
        this.panel.createOptionsPanel(this.dim);
        this.panel.createScorePanel(this.dim);

        this.pointerX = 0
        this.pointerY = 0

        this.lastPointerX = 0
        this.lastPointerY = 0

        this.piecesList = []
        this.powerUpsInGame = {}
        this.queuePieces = new Queue()

        this.counter = 0
        this.boardAngle = 0
        this.boardSize = 8
        this.squareSize = 88
        this.offsetX = 113
        this.offsetY = 232
        this.canCheck = false
        this.refillCounter = 0
        this.secondsToAdd = 0
        this.animationsIterator = 0
        this.rotateBool = false
        this.isPaused = false
        this.pauseOpen = false
        this.gamefinish = false
        this.isStarting = true
        this.powerupcd=4
        this.gameoverTiming = false
        this.converterBool = false

        //TIMERS
        this.minTimePerTurn = 5
        this.maxTimePerTurn = 25
        this.level1Time =(((this.maxTimePerTurn-this.minTimePerTurn)/3)*2)+this.minTimePerTurn
        console.log("TIMERS " + this.level1Time)
        this.level2Time =((this.maxTimePerTurn-this.minTimePerTurn)/3)+this.minTimePerTurn

        //THE FIRST ELEMENT MUST BE THE EMPTY SPACE
        this.colorsList = ["blockblast_piece_shadow.png","blockblast_piece_a.png","blockblast_piece_b.png","blockblast_piece_c.png","blockblast_piece_d.png","blockblast_piece_e.png"
        ,"blockblast_piece_f.png","blockblast_piece_g.png","blockblast_piece_h.png","blockblast_piece_i.png","blockblast_piece_j.png"
        ,"blockblast_piece_k.png","blockblast_piece_m.png","blockblast_piece_n.png","blockblast_piece_l.png"]


        //POWERUPS
        this.powerUpsList =["bomb","reduct","rotate"]

        //ANIMATIONS
        this.anims.create({
            key: 'bomb',
            frames: this.anims.generateFrameNumbers('bomb', { start: 0, end: 6 }),
            frameRate: 15,
            repeat: 0 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'reduct',
            frames: this.anims.generateFrameNumbers('reduct', { start: 0, end: 6 }),
            frameRate: 15,
            repeat: 0 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'rotate',
            frames: this.anims.generateFrameNumbers('rotate', { start: 0, end: 6 }),
            frameRate: 15,
            repeat: 0 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'bombFx',
            frames: this.anims.generateFrameNumbers('bombFx', { start: 0, end: 19 }),
            frameRate: 30,
            repeat: 0 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'destroyFx',
            frames: this.anims.generateFrameNumbers('destroyFx', { start: 0, end: 9 }),
            frameRate: 30,
            repeat: 0 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'reductFx',
            frames: this.anims.generateFrameNumbers('reductFx', { start: 0, end: 14}),
            frameRate:30,
            repeat: 0 // Reproducir la animación solo una vez
        });

        //IDLE
        let idleFramerate = 4
        this.anims.create({
            key: 'idle_a',
            frames: this.anims.generateFrameNumbers('idle_a', { start: 0, end: 3}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'idle_b',
            frames: this.anims.generateFrameNumbers('idle_b', { start: 0, end: 1}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'idle_c',
            frames: this.anims.generateFrameNumbers('idle_c', { start: 0, end: 1}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'idle_d',
            frames: this.anims.generateFrameNumbers('idle_d', { start: 0, end: 2}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'idle_e',
            frames: this.anims.generateFrameNumbers('idle_e', { start: 0, end: 2}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'idle_f',
            frames: this.anims.generateFrameNumbers('idle_f', { start: 0, end: 1}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'idle_g',
            frames: this.anims.generateFrameNumbers('idle_g', { start: 0, end: 1}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'idle_h',
            frames: this.anims.generateFrameNumbers('idle_h', { start: 0, end: 1}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'idle_i',
            frames: this.anims.generateFrameNumbers('idle_i', { start: 0, end: 1}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'idle_j',
            frames: this.anims.generateFrameNumbers('idle_j', { start: 0, end: 1}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'idle_k',
            frames: this.anims.generateFrameNumbers('idle_k', { start: 0, end: 6}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'idle_l',
            frames: this.anims.generateFrameNumbers('idle_l', { start: 0, end: 1}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'idle_m',
            frames: this.anims.generateFrameNumbers('idle_m', { start: 0, end: 1}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });
        this.anims.create({
            key: 'idle_n',
            frames: this.anims.generateFrameNumbers('idle_n', { start: 0, end: 1}),
            frameRate:idleFramerate,
            repeat: -1 // Reproducir la animación solo una vez
        });

        //PICTURES
        this.offsetPictures = 540

        //this.add.image(this.offsetPictures,this.offsetPictures,"table")
        //this.add.image(this.offsetPictures,this.offsetPictures-1,"table_shadow")

        
        
        //PREVIEW
        this.add.image(this.offsetPictures+400,this.offsetPictures+10,"preview_space").setDepth(3)

        this.halfBoxX = (this.boardSize/2*this.squareSize)+this.offsetX-(this.squareSize/2)
        
        this.halfBoxY = (this.boardSize/2*this.squareSize)+this.offsetY-(this.squareSize/2)
        console.log("HALF"+this.halfBox)
        this.add.image(this.offsetPictures,this.offsetPictures,"b_box").setDepth(1)
        let boardTable = this.add.image(this.offsetPictures-120-this.halfBoxX,this.offsetPictures-this.halfBoxY,"table").setDepth(3)
        
        //FINAL
        this.finalScreen = this.add.image(540, -650, 'final').setDepth(7);

        //TABLE DECOR
        this.add.image(this.offsetPictures-26,this.offsetPictures-455,"table_decor","parchados decor_a.png").setDepth(2)
        this.add.image(this.offsetPictures-45,this.offsetPictures+448,"table_decor","parchados decor_b.png").setDepth(2)
        
        this.add.image(this.offsetPictures-389,this.offsetPictures+430,"table_decor","telalogo.png").setDepth(4)
        this.add.image(this.offsetPictures-512,this.offsetPictures-505,"table_decor","parchados decor_d.png").setDepth(4)
        this.add.image(this.offsetPictures+517,this.offsetPictures-445,"table_decor","parchados decor_e.png").setDepth(4)
        this.add.image(this.offsetPictures+500,this.offsetPictures+450,"table_decor","parchados decor_f.png").setDepth(4)

        //POSITIONS
        this.positions = []
        for(let i =0; i < this.boardSize*this.boardSize;i++){
            this.positions.push(i)
            
        }

        //CREATE LINECOUNTERS

        this.lineCounterX = [0,0,0,0,0,0,0,0]
        this.lineCounterY = [0,0,0,0,0,0,0,0]
        this.lineCounterXadd = [0,0,0,0,0,0,0,0]
        this.lineCounterYadd = [0,0,0,0,0,0,0,0]
        this.piecesToClear = []
        this.linesToClear = []
        this.colorsToRestore = []
        //CREATE BOARD
        this.board = []
        this.idleboard = []
        this.boardContainer = this.add.container(0,0)
        this.boardContainer.add(boardTable)
        for(let i = 0; i < this.boardSize; i++){
            this.board[i] = []
            this.idleboard[i] = []
            for(let j = 0; j < this.boardSize; j++){
                this.board[i][j] = this.add.sprite(((i-this.boardSize/2)*this.squareSize)+(this.squareSize/2), ((j-this.boardSize/2)*this.squareSize)+(this.squareSize/2),"piece", this.colorsList[0])
                this.idleboard[i][j] = this.add.sprite((i*this.squareSize)+this.offsetX, (j*this.squareSize)+this.offsetY,"piece", this.colorsList[0]).setDepth(4).setVisible(false)
                //this.board[i][j].visible = false
                this.board[i][j].name = i.toString()+j.toString()+this.colorsList[0]
                this.boardContainer.add(this.board[i][j])
                this.board[i][j].on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'bomb', function () {
                    this.board[i][j].setTexture(this.powerUpsList[0])
                        
                    this.SetName(this.board[i][j],this.powerUpsList[0])
                  
                }, this);
                this.board[i][j].on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'reduct', function () {
                    this.board[i][j].setTexture(this.powerUpsList[1])
                        
                    this.SetName(this.board[i][j],this.powerUpsList[1])
                  
                }, this);
            }
        }
        this.boardContainer.x += (this.boardSize/2*this.squareSize)+this.offsetX-(this.squareSize/2)
        this.boardContainer.y += (this.boardSize/2*this.squareSize)+this.offsetY-(this.squareSize/2)
        this.boardContainer.setDepth(3)
        this.boardMatrix = []
        for(let i = 0; i < this.boardSize; i++){
            this.boardMatrix[i] = []
            for(let j = 0; j < this.boardSize; j++){
                this.boardMatrix[i][j] = 0
            }
        }
        //ANIMATION BOARD
        this.animationBoard = []
        this.animationBoardContainer = this.add.container(0,0)
        for(let i = 0; i < this.boardSize; i++){
            this.animationBoard[i] = []
            for(let j = 0; j < this.boardSize; j++){
                this.animationBoard[i][j] = this.add.sprite(((i-this.boardSize/2)*this.squareSize)+(this.squareSize/2), ((j-this.boardSize/2)*this.squareSize)+(this.squareSize/2),"piece", this.colorsList[0]).setOrigin(.5)
                
                
                this.animationBoard[i][j].visible = false
                this.animationBoardContainer.add(this.animationBoard[i][j])
                this.animationBoard[i][j].on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'destroyFx', function () {
                    this.animationBoard[i][j].setVisible(false);
                }, this);
                this.animationBoard[i][j].on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'bombFx', function () {
                    this.animationBoard[i][j].setVisible(false);
                }, this);
            }
        }
        //this.MakeAnimation(1,7,"destroyFx")
        //this.MakeAnimation(3,7,"bombFx")
        this.animationBoardContainer.x += (this.boardSize/2*this.squareSize)+this.offsetX-(this.squareSize/2)
        this.animationBoardContainer.y += (this.boardSize/2*this.squareSize)+this.offsetY-(this.squareSize/2)-10
        this.animationBoardContainer.setDepth(4)

        this.option1anim = this.add.sprite(965-23, 340-27,"piece", this.colorsList[0]).setOrigin(.5).setDepth(6).setScale(2)
        this.option1anim.visible = false
        this.option1anim.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'reductFx', function () {
            this.option1anim.setVisible(false);
        }, this);
        this.option2anim = this.add.sprite(965-23, 590-27,"piece", this.colorsList[0]).setOrigin(.5).setDepth(6).setScale(2)
        this.option2anim.visible = false
        this.option2anim.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'reductFx', function () {
            this.option2anim.setVisible(false);
        }, this);
        this.option3anim = this.add.sprite(965-23, 840-27,"piece", this.colorsList[0]).setOrigin(.5).setDepth(6).setScale(2)
        this.option3anim.visible = false
        this.option3anim.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'reductFx', function () {
            this.option3anim.setVisible(false);
        }, this);


        this.vibrateTweens = []


        //SCORES
        this.scorePoints = 0
        //let scoreContainer = this.add.image(320, 1000, 'menuUI', 'Score.png')
        this.scoreText = this.add.text(200, 80,"SCORE: ", { 
            fontFamily: 'Bungee', fontSize: '60px',  color: '#f4f4f4', align: 'center' }).setOrigin(0.5).setDepth(4)
        this.scoreText.setStroke('#553b37', 8);

        //TIMER
        
        //this.currentTime = this.maxTimePerTurn
        //let timerContainer = this.add.image(980, 210, 'menuUI', 'Cronometro_fondo.png')
        
        //this.timerText = this.add.text(980,210,this.FormatTime(this.currentTime), { 
            //fontFamily: 'Bungee', fontSize: '34px',  color: '#f4f4f4', align: 'center' }).setOrigin(0.5)
        //this.timerText.setStroke('#553b37', 8);
        //this.time.addEvent({ delay: 1000, callback: this.UpdateTimer, callbackScope: this, loop: true })

        //SPECIALS
        this.time.addEvent({ delay: 5000, callback: this.ShineBlock, callbackScope: this, loop: true })
        this.time.addEvent({ delay: 5000, callback: this.SpecialBlock, callbackScope: this, loop: true })
        //CREATE PIECES AND COLORS
        this.piecesList = ["0010000100001000010000100", //Linea vertical
                            "0010000100001000010000000", //Linea vertical 4X4
                            "0000000100001000010000000", //Linea vertical 3X3
                            "0000000100001000000000000", //Linea vertical 2X2
                            "0000000000111110000000000", //Linea horizontal
                            "0000000000111100000000000", //Linea horizontal 4X4
                            "0000000000011100000000000", //Linea horizontal 3X3
                            "0000000000011000000000000", //Linea horizontal 2X2
                            "0000001110011100111000000", //Cuadrado 3x3
                            "0000001100011000000000000", //Cuadrado 2x2
                            "0000001100011000110000000", //Cuadrado 2x3
                            "0000000000011100111000000", //Cuadrado 3x2
                            "0000000000001000000000000", //Cuadrado 1x1
                            "0000000100011100000000000", //T invertida
                            "0000000000011100010000000", //T 
                            "0000001000011000100000000", //T der
                            "0000000100011000010000000", //T izq
                            "0000001000010000110000000", //L
                            "0000000010011100000000000", //L arriba
                            "0000001100001000010000000", //L izq
                            "0000000000011100100000000", //L abajo
                            "0000000100001000110000000", //LI
                            "0000001000011100000000000", //LI arriba
                            "0000001100010000100000000", //LI izq
                            "0000000000011100001000000", //LI abajo
                            "0000001000011000010000000", //S
                            "0000000110011000000000000", //SI
                            "0000000100011000100000000", //Z
                            "0000001100001100000000000", //ZI
                            "0000001000011000000000000", //l
                            "0000000100011000000000000", //l arriba
                            "0000001100001000000000000", //l izq
                            "0000001100010000000000000", //l der
                            "0000001000001000000000000", //dos diagonal
                            "0000000100010000000000000", //dos diagonal inv
                            "0000001000010000111000000", //L grande
                            "0000000010000100111000000", //L grande arriba
                            "0000001110000100001000000", //L grande izq
                            "0000001110010000100000000", //L grande der


                            ]
        this.ShuffleArray(this.piecesList)
        

        this.piece = this.GeneratePiece()
        this.piece.shape = this.piecesList[this.piecesList.length-3]
        this.piecesToDelete = []

        
        //SETTING BOARD
        this.InsertPiece(this.GeneratePiece(),0,0)
        this.InsertPiece(this.GeneratePiece(),3,3)
        this.isStarting=false
        this.scorePoints = 0
        this.scoreText.setText(this.scorePoints.toString().padStart(8, '0') )

        //CREATE LOADING BAR
        let barX = this.offsetPictures+30
        let barY = this.offsetPictures+450
        //this.add.image(barX,barY,"timerBar", "Base cronometro.png").setDepth(5)
        this.timeSlider = this.uiScene.rexUI.add.slider({
            x: barX,
            y: barY,
            width: 700,
            height: 50,
            orientation: 'x',
            reverseAxis: false,
            value: 1,
            end: 0, // Cambiado a 0 para que el valor máximo sea 0
            start: 1, // Cambiado a 1 para que el valor mínimo sea 1
            track: this.add.sprite(0,0,'timerBar','Delineado cronometro.png').setDisplaySize( 700,50),
            indicator: this.addCropResizeMethod( this.add.sprite(0,0,'timerBar','verde.png').setDisplaySize(690,35)),
            
            
            thumb: this.add.sprite(0,0,'timerBar','Reloj.png').setScale(1,1),
            space: {
                right:5,
                left:-5,
                bottom:3
            },
            input: 'none',
        }).layout().setDepth(3)


        

        //CREATE OPTIONS
        this.optionsBools = []
        
        this.optionsPieces = []
        this.CreateOptions()
        //this.option3.visible = false

        //CREATE POINTER
        this.pX = 0
        this.pY = 0
        this.pointer = []
        const pointerContainer = this.add.container(-800,-800)

        for(let i = 0; i < 5; i++){
            this.pointer[i] = []
            for(let j = 0; j < 5; j++){
                this.pointer[i][j] = this.add.image((i*this.squareSize), (j*this.squareSize), "square")
                pointerContainer.add(this.pointer[i][j])
            }
        }
        pointerContainer.visible = false
        pointerContainer.setDepth(5)


        //CREATE COUNTERS
        this.xCounters = []
        for(let i = 0; i < this.boardSize; i++){
            this.xCounters[i] = this.add.text((i*93)+150, 900,"i", { 
                fontFamily: 'Bungee', fontSize: '34px',  color: '#f4f4f4', align: 'center' })
            this.xCounters[i].visible = false
        }
        this.yCounters = []
        for(let i = 0; i < this.boardSize; i++){
            this.yCounters[i] = this.add.text(880, (i*93 )+170,"i",  { 
                fontFamily: 'Bungee', fontSize: '34px',  color: '#f4f4f4', align: 'center' })
            this.yCounters[i].visible = false
        }
        //CREATE BUTTONS
        this.pauseButton = this.add.image(1010, 73, 'inGameUI', 'Pausa_NonClicked.png').setInteractive().setDepth(6);
        this.pauseButton.setScale(.8);
        this.pauseButton.on('pointerdown', () => 
            {
                this.PauseGame();
                //this.uiScene.audioManager.playButtonClick.play();
            });

        this.settingsButton = this.add.image(910, 73, 'inGameUI', 'Reinicio_NonClicked.png').setInteractive().setDepth(6);
        this.settingsButton.setScale(.8);
        this.settingsButton.on('pointerdown', () => 
            {
                this.RestartGame()
                //this.uiScene.audioManager.playButtonClick.play();
            });
        
        
        this.pointerAdd = 0
        

        if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
            // Código específico para dispositivos móviles
            console.log("Ejecutando en un dispositivo móvil");
            this.pointerAdd = this.squareSize*2
            // Puedes agregar aquí el código específico que deseas ejecutar solo en dispositivos móviles
        } else {
            // Código para dispositivos no móviles
            console.log("Ejecutando en un dispositivo no móvil");
        }

       
        this.input.on('pointermove', function (pointer) {
                if (pointer.pointerType === 'touch') {
                    this.pX = pointer.touches[0].worldX
                    this.pY = pointer.touches[0].worldY
                } else {
                    this.pX = pointer.worldX
                    this.pY = pointer.worldY
                }
            }, this);
        
        this.input.on('dragstart', function (pointer, gameObject) {
            if(!this.isPaused){
                console.log(gameObject.parentContainer.name)
                gameObject.parentContainer.visible = false
                this.piece = this.optionsPieces[parseInt(gameObject.parentContainer.name)]
                this.optionsBools[parseInt(gameObject.parentContainer.name)]= false
                this.ChangePointer()
                
                if (pointer.pointerType === 'touch') {
                    this.pX = pointer.touches[0].worldX
                    this.pY = pointer.touches[0].worldY
                    
                } else {
                    this.pX = pointer.worldX
                    this.pY = pointer.worldY
                }
                pointerContainer.x = this.pX-2*this.squareSize 
                
                pointerContainer.y = (this.pY-2*this.squareSize)-this.pointerAdd
                pointerContainer.visible = true
                this.canCheck = true
            }
            
            
        }, this);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) =>
        {
            if(!this.isPaused){
                pointerContainer.x = this.pX-2*this.squareSize 
                
                pointerContainer.y = (this.pY-2*this.squareSize)-this.pointerAdd
            }

        });

        this.input.on('dragend', function (pointer, gameObject) {
            if(!this.isPaused){
                console.log(gameObject.parentContainer.name)
                this.canCheck = false
                pointerContainer.visible = false
                pointerContainer.x = -800
                
                pointerContainer.y =  -800
                if(this.CanPutPiece(this.piece.shape,this.pointerX, this.pointerY,this.boardMatrix)){
                    this.piecesToDelete = []
                    this.InsertPiece(this.piece,this.pointerX, this.pointerY)
                    
                    
                    
                    
                    
                }
                else{
                    gameObject.parentContainer.visible = true
                    this.optionsBools[parseInt(gameObject.parentContainer.name)]= true
                }
            }
            
        }, this);
        //this.ReductAnimation()

        setTimeout(() => {
                
            this.ShowTutorial()  
        }, 500);
                 
    }
    
      

    update(time, deltaTime){
        //console.log("CONV REFILL COUNTER "+ this.refillCounter)
        this.pointerX = Phaser.Math.Clamp((Phaser.Math.FloorTo((this.pX-this.offsetX+50)/this.squareSize)),0,10)-2
        this.pointerY = Phaser.Math.Clamp((Phaser.Math.FloorTo(((this.pY-this.pointerAdd)- this.offsetY+50)/this.squareSize)),0,10)-2
        
        if((this.lastPointerX != this.pointerX || this.lastPointerY != this.pointerY)&&!this.isPaused){
            this.lastPointerX = this.pointerX
            this.lastPointerY = this.pointerY

            this.lineCounterXadd = [0,0,0,0,0,0,0,0]
            this.lineCounterYadd = [0,0,0,0,0,0,0,0]
            this.linesToClear = []
            this.StopVibration()
            this.RestoreColors()
            
            
            if(this.canCheck){
                
                if(this.CanPutPiece(this.piece.shape,this.pointerX, this.pointerY,this.boardMatrix)){
                    this.piecesToDelete = this.DrawPiece(this.piece, this.pointerX,this.pointerY,this.board)
                }
            }
                

        }
        for(let i = 0; i < this.boardSize; i++){
            this.yCounters[i].setText(this.lineCounterX[i])
            this.xCounters[i].setText(this.lineCounterY[i])
        }

        //this.timeSlider.thumb.x = this.timeSlider.track.x + this.timeSlider.track.width * this.timeSlider.value - (this.timeSlider.thumb.width / 2);

    }
}
    
