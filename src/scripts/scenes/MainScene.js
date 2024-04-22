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
    //MENUS 
    OpenSettings(){
        if(!this.isPaused){
            this.isPaused = true
            this.panel.showOptions();
        }
    }

    PauseGame(){
        if(!this.isPaused){
            this.isPaused = true
            this.panel.showPause();
        }
        else{
            this.isPaused = false
            this.panel.hidePause()
        }
        
    }
    RestartGame(){
        this.audioManager.stopMusic()
        this.isPaused = false
        this.scene.restart([this.data, false])
    }

    BackMenu(){
        this.scene.start('MenuScene', this.data);
    }

    //UTILITIES
    ObtainInt(letter){
        return  letter.charCodeAt(0)-97
    }
    GetRandomInt(max) {

        return Math.floor(Math.random() * max);
    }
    SetName(object, newName){
        var tempName = object.name
        var fila = tempName.charAt(0)
        var colummna = tempName.charAt(1)
        object.name = fila + colummna + newName
        
    }

    GetTexture(object){
        return object.name.substring(2)
    }
    CountPieceValue(piece){
        var counterPiece = 0
        for(let i = 0; i < 25; i++){
            if(piece.charAt(i) == 1)counterPiece+=1
        }
        return counterPiece
    }
    CountPieceX(piece){
        var counterPiece = 0
        var counterAux= 0
        var startCount = false
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
        var counterPiece = 0
        var counterAux= 0
        var startCount = false
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
                this.posOptionX = 12
                break
            case 3:
                this.posOptionX = 25
                break
            case 4:
                this.posOptionX = 10
                break
            case 5:
                this.posOptionX = 25
                break
            default:
                this.posOptionX = 0
          }
        //Y
        switch (this.CountPieceX(piece)) {
            case 1:
                this.posOptionY = 10
                break
            case 2:
                this.posOptionY = 30
                break
            case 3:
                this.posOptionY = 30
                break
            case 4:
                this.posOptionY = 30
                break
            case 5:
                this.posOptionY = 30
                break
            default:
                this.posOptionY = 10
          }
       
    }






    //PIECE GENERATORS
    CreatePiece(piece, x, y, size, sizeM){
        size = size*sizeM
        const container = this.add.container(x,y)
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.shape.charAt((5*i)+j) != 0){
                    if(this.ObtainInt(piece.shape.charAt((5*i)+j))<-10){
                        var s1 = this.add.image((size*j)-(size*2),(size*i)-(size*2) , "powerUps", this.powerUpsList[piece.shape.charAt((5*i)+j)-1])
                        //s1.setInteractive()
                        s1.setScale(sizeM)
                        //this.input.setDraggable(s1)
                        container.add(s1)
                    }
                    else{
                        var s1 = this.add.image((size*j)-(size*2),(size*i)-(size*2) , "piece", this.colorsList[this.ObtainInt(piece.shape.charAt((5*i)+j))])
                        //s1.setInteractive()
                        s1.setScale(sizeM)
                        //this.input.setDraggable(s1)
                        container.add(s1)
                    }
                    
                }
                if(i==2&&j==2){
                    var s2 = this.add.image((size*j)-(size*2),(size*i)-(size*2) , "piece",this.colorsList[this.ObtainInt(piece.shape.charAt((5*i)+j))])
                    s2.setAlpha(0.000001)
                    s2.setScale(1.7)
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
                        
                        this.pointer[j][i].setTexture("powerUps", this.powerUpsList[this.piece.shape.charAt((5*i)+j)-1])
                    }
                    else{
                        this.pointer[j][i].setTexture("piece", this.colorsList[this.ObtainInt(this.piece.shape.charAt((5*i)+j))])
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
        var pShape = this.piecesList[this.GetRandomInt(this.piecesList.length)]

        var pTexture = this.GetRandomInt(this.colorsList.length-1)+1
        var chr = String.fromCharCode(97 + pTexture)
        var newPShape = ""
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
        
        var pTexture = this.GetRandomInt(this.colorsList.length-1)+1
        var chr = String.fromCharCode(97 + pTexture)
        var newPShape = ""
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
        
        var pp = this.GetRandomInt(3)+1
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
        var list = new Array()
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.shape.charAt((5*i)+j) != 0){
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
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.shape.charAt((5*i)+j) != 0){
                    if(this.ObtainInt(piece.shape.charAt((5*i)+j))<-10){
                        this.board[j+x][i+y].setTexture("powerUps", this.powerUpsList[piece.shape.charAt((5*i)+j)-1]).setTint(0xffffff).visible = true
                        this.SetName(this.board[j+x][i+y],this.powerUpsList[piece.shape.charAt((5*i)+j)-1])
                    }
                    else{
                        this.board[j+x][i+y].setTexture("piece",this.colorsList[this.ObtainInt(piece.shape.charAt((5*i)+j))]).setTint(0xffffff).visible = true
                        this.SetName(this.board[j+x][i+y],this.colorsList[this.ObtainInt(piece.shape.charAt((5*i)+j))])
                    }
                    
                    this.boardMatrix[j+x][i+y] = 1
                    this.lineCounterX[i+y] += 1
                    this.lineCounterY[j+x] += 1
                    this.scorePoints += 1
                }
                
                
            }
        }
        console.log("CHECK=========================================")
        this.BreakLine()
        for(let i = 0; i < 8; i++){
            var line = "CHECK"
            for(let j = 0; j < 8; j++){
                //console.log(this.board[j][i].name.length)
                if(this.board[j][i].name.length < 3 || this.board[j][i].name.length > 27)line+="0|"
                else line+= this.board[j][i].name.charAt(19) +"|"

            }
            console.log(line)
        }
        //this.currentTime += (this.secondsToAdd*2)
        
    }
 
    DeletePiece(pieces){
        pieces.forEach((element)=> element.setTint(0xffffff))
        pieces.forEach((element)=> element.setTexture("piece",this.colorsList[0]))
    }

    BreakLine(){
        
        
        for(let i = 0; i < this.piecesToClear.length; i++){

            var filas =this.piecesToClear[i].name.charAt(0)
            var columnas = this.piecesToClear[i].name.charAt(1)
            if(this.GetTexture(this.board[filas][columnas])=='powerup_convertidor.png'){
                //POWERUP CONVERTIDOR
                this.ConverterPowerUp()

            }
            this.piecesToClear[i].setTint(0xffffff)
            this.piecesToClear[i].setTexture("piece",this.colorsList[0])
            this.SetName(this.piecesToClear[i],this.colorsList[0])
            //console.log("CHECK" + this.piecesToClear[i].name)
            this.boardMatrix[filas][columnas] = 0
            //this.lineCounterX[columnas]=Phaser.Math.Clamp(this.lineCounterX[columnas]-1,0,8)
            //this.lineCounterY[filas]=Phaser.Math.Clamp(this.lineCounterY[filas]-1,0,8)
            this.scorePoints+=1


            
            
        }
        this.RecountLineCounters()
        this.colorsToRestore= []
        this.piecesToClear = []
        this.scoreText.setText(this.scorePoints.toString().padStart(5, '0') )
        
        
    }

    RecountLineCounters(){
        for(let i = 0; i < 8; i++){
            var counterX = 0
            var counterY = 0
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
        this.piecesToClear = []
        this.colorsToRestore = []
        
        this.secondsToAdd = 0
        for(let i = 0; i < this.boardSize; i++){
            
            if(this.lineCounterXadd[i]+this.lineCounterX[i]== this.boardSize){
                
                for(let j = 0; j < this.boardSize; j++){
                    if(this.GetTexture(this.board[j][i])=='powerup_bomba.png'){
                        this.BombBreakingLines(j,i)
                        console.log("BOOM")
                    }
                    this.piecesToClear.push(this.board[j][i])
                    this.colorsToRestore.push(this.GetTexture(this.board[j][i]))
                    this.board[j][i].setTexture("piece",this.piece.color)

                    

                    
                }
            }
            if(this.lineCounterYadd[i]+this.lineCounterY[i]== this.boardSize){
                
                for(let j = 0; j < this.boardSize; j++){
                    if(this.GetTexture(this.board[i][j])=='powerup_bomba.png'){
                        this.BombBreakingLines(i,j)
                        console.log("BOOM")
                    }
                    this.piecesToClear.push(this.board[i][j])
                    this.colorsToRestore.push(this.GetTexture(this.board[i][j]))
                    this.board[i][j].setTexture("piece",this.piece.color)
                   
                    
                }
            }
            
        }
        
    }

    RestoreColors(){
        
        for(let i = 0; i < this.colorsToRestore.length; i++){

            console.log(this.colorsToRestore[i])
            if(this.colorsToRestore[i][0]=='p') this.piecesToClear[i].setTexture("powerUps",this.colorsToRestore[i])
            else this.piecesToClear[i].setTexture("piece",this.colorsToRestore[i])


            
            
        }
        if(this.piecesToDelete.length > 0)this.DeletePiece(this.piecesToDelete)
        
    }

    //POWERUPS

    ConverterPowerUp(){
        //limpiamos la cola
        this.queuePieces = new Queue()
        //calculamos cuantas piezas necesitamos
        var remainingPieces = 0
        for(let k = 0; k < 3; k++){
            if(this.optionsBools[k]){
                remainingPieces++
            }                   
        }
        console.log("CONV"+remainingPieces)
        this.RemoveOptions()
        //SI YA NO QUEDAN PIEZAS
        if(remainingPieces === 0){
            console.log("CONV"+ " ENTRO AL CONVERTER")
            remainingPieces = 3
            //aniadimos piezas de 1
            for(let k = 0; k < remainingPieces; k++){
                this.queuePieces.enqueue("0000000000001000000000000")
            
            }
            
            this.CreateOptions()
            this.refillCounter = -1
        }else{
            //SI QUEDAN
            var pieceOption = this.RegeneratePiece("0000000000001000000000000", false)
            if(this.optionsBools[0]){
                //creamos pieza
                
                this.SetPiecePosition(pieceOption.shape)
                this.option1 = this.CreatePiece(pieceOption, 1000-this.posOptionX,400-this.posOptionY,100,0.25)
                this.option1.name = "0"
                this.optionsPieces[0] = pieceOption
            }
            if(this.optionsBools[1]){
                //creamos pieza
                this.SetPiecePosition(pieceOption.shape)
                this.option2 = this.CreatePiece(pieceOption, 1000-this.posOptionX,570-this.posOptionY,100,0.25)
                this.option2.name = "1"
                this.optionsPieces[1] = pieceOption
            }
            if(this.optionsBools[2]){
                //creamos pieza
                this.SetPiecePosition(pieceOption.shape)
                this.option3 = this.CreatePiece(pieceOption, 1000-this.posOptionX,720-this.posOptionY,100,0.25)
                this.option3.name = "2"
                this.optionsPieces[2] = pieceOption
            }
            
            
        }
        
        
        
    }
   
    BombBreakingLines(fila,columna){
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                // Calculamos las nuevas coordenadas
                const nuevaFila = fila + i;
                const nuevaColumna = columna + j;
    
                // Verificamos si las nuevas coordenadas están dentro de los límites de la matriz
                if (nuevaFila >= 0 && nuevaFila < 8 && nuevaColumna >= 0 && nuevaColumna < 8) {
                    // Agregamos las coordenadas válidas a la lista de variables circundantes
                    //variablesCircundantes.push([nuevaFila, nuevaColumna]);
                    if(this.GetTexture(this.board[nuevaFila][nuevaColumna])!=this.colorsList[0]){
                        this.piecesToClear.push(this.board[nuevaFila][nuevaColumna])
                        this.colorsToRestore.push(this.GetTexture(this.board[nuevaFila][nuevaColumna]))
                        this.board[nuevaFila][nuevaColumna].setTexture("piece",this.piece.color)
                    }
                }
            }
        }
    }

    

    

    
    

    CreateOptions(){
        this.optionsBools[0] = true
        this.optionsBools[1] = true
        this.optionsBools[2] = true

        this.posOptionX = 700
        this.posOptionY = 400
        console.log(this.posOptionX )
        
        if(this.queuePieces.isEmpty)this.queuePieces = this.GetBestPieces()
        console.log(this.queuePieces.length)
        this.probArray = [false,false,false]
        console.log(this.probArray)
        var probPowerUp = this.GetRandomInt(10)
        if(probPowerUp <1){
            this.probArray = [true,false,false]
        } 
        this.ShuffleArray(this.probArray)
        
        
        console.log(this.probArray)
        var pieceOption = this.RegeneratePiece(this.queuePieces.dequeue(), this.probArray[0])
        this.SetPiecePosition(pieceOption.shape)
        this.option1 = this.CreatePiece(pieceOption, 1000-this.posOptionX,400-this.posOptionY,100,0.25)
        this.option1.name = "0"
        this.optionsPieces[0] = pieceOption

        pieceOption = this.RegeneratePiece(this.queuePieces.dequeue(), this.probArray[1])
        this.SetPiecePosition(pieceOption.shape)
        this.option2 = this.CreatePiece(pieceOption, 1000-this.posOptionX,570-this.posOptionY,100,0.25)
        this.option2.name = "1"
        this.optionsPieces[1]=pieceOption

        pieceOption = this.RegeneratePiece(this.queuePieces.dequeue(), this.probArray[2])
        this.SetPiecePosition(pieceOption.shape)
        this.option3 = this.CreatePiece(pieceOption, 1000-this.posOptionX,720-this.posOptionY,100,0.25)
        this.option3.name = "2"
        this.optionsPieces[2]=pieceOption

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
                        if(this.CanPutPiece(this.optionsPieces[k].shape,i,j))return false
                    }                   
                }
            }
        }
        return true
    }
    
    ObtainPositions(board){
        var positionArray = []
        for(let i = 0; i < board.length; i++){
            var lineCounter = 0
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
        var auxX = 0
        var startChecking = false
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

    InsertPieceBoard(board,linecounterX, linecounterY, piece,x,y){
        var auxX = 0
        var startChecking = false
        var deleteX = false
        var deleteY = false
        var score = 0
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
        var trueList = []
        var listPieces = []
        var actualScore = 0
        var numDif = 50

        

        for(let it = 0; it < numDif; it++){
            listPieces = []
            //ciclo para buscar las 3 piezas
            //console.log("Test =========================================")
            //copiar el tablero
            var newBoard = []
            for (var i = 0; i < this.boardSize; i++)newBoard[i] = this.boardMatrix[i].slice()
            //Copiar counters
            var newLineCounterY = this.lineCounterX.slice()
            var newLineCounterX = this.lineCounterY.slice()
            //console.log(newLineCounterX)
            //console.log(newLineCounterY)
            //console.log(newBoard)

            var scoreAcum = 0
            
            for(let i = 0; i < 9; i++){
                var forBreak = false
                //Obtener las posiciones y randomizarlas
                this.positions = this.ObtainPositions(newBoard)
                this.ShuffleArray(this.positions)
                var iterator = 0
                var y = ~~(this.positions[i]/this.boardSize)
                
                var x = this.positions[i]%this.boardSize
                //console.log("coordenadas " + x.toString() + " y " + y.toString() )
                this.ShuffleArray(this.piecesList)
                //Revisar si las pieza entran
                for(let j = 0; j<this.piecesList.length; j++){
                    if(this.CheckPiece(newBoard,this.piecesList[j],x,y)){
                        var score = this.InsertPieceBoard(newBoard,newLineCounterX,newLineCounterY,this.piecesList[j],x,y)
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
        
        var q = new Queue()
        for(let j = 0; j < trueList.length;j++){
            q.enqueue(trueList[j])
        }

        return q
    }


    CheckValue(piece, x,y){
        this.lineCounterXadd = [0,0,0,0,0,0,0,0]
        this.lineCounterYadd = [0,0,0,0,0,0,0,0]
            
        var counterPoints = 0
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
    FormatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var secs = seconds - minutes * 60;
        // Asegurarse de que los segundos estén en dos dígitos
        secs = secs < 10 ? '0' + secs : secs;
        return minutes + ':' + secs;
    }
    UpdateTimer() {
        // Reducir el tiempo restante
        if(!this.isPaused)this.currentTime--;
        console.log("update timer" + this.currentTime)
        // Actualizar el texto del temporizador en la pantalla
        if (this.currentTime > 0) this.timerText.text = this.FormatTime(this.currentTime)
    
        // Verificar si el tiempo ha llegado a cero
        if (this.currentTime === 0 && !this.isPaused) {
            // Aquí puedes agregar cualquier acción que desees cuando el temporizador llegue a cero
            this.time.removeEvent(this.UpdateTimer)
            this.timerText.text = this.FormatTime(this.currentTime)
            console.log("¡Tiempo agotado!")
            this.MakeGameOver()
            
        }
    }
    
    MakeGameOver(){
        this.isPaused = true
        this.finishTime = this.time.now * 0.001
        this.panel.showScore(this.scorePoints,this.scorePoints)
        
    }

    preload(){
       this.load.image("square","src/images/BBSquare.png")
       this.load.image("table_shadow", "src/images/blockblast_backgroud_table_shadow.png")
       this.load.image("table", "src/images/blockblast_backgroud_table.png")
       this.load.image("b_chess", "src/images/blockblast_backgroud_chess.png")
       this.load.image("b_box", "src/images/blockblast_backgroud_box.png")
       //TABLE DECOR
       this.load.atlas("table_decor", "src/images/blockblast_backgroud_table_decor/sprites.png", "src/images/blockblast_backgroud_table_decor/sprites.json") 
       //PREVIEW SPACE
       this.load.atlas("preview_space", "src/images/blockblast_backgroud_previewspace/sprites.png", "src/images/blockblast_backgroud_previewspace/sprites.json") 

       //DECOR B
       this.load.atlas("decor_b", "src/images/blockblast_decor_b/sprites.png", "src/images/blockblast_decor_b/sprites.json") 

       //PIECES
       this.load.atlas("piece", "src/images/blockblast_piece/sprites.png", "src/images/blockblast_piece/sprites.json") 
       //POWER UPS
       this.load.atlas("powerUps", "src/images/BlockBlastPowerUps/sprites.png", "src/images/BlockBlastPowerUps/sprites.json")
    }

   

    create(){


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
        this.queuePieces = new Queue()

        this.counter = 0
        
        this.boardSize = 8
        this.squareSize = 88
        this.offsetX = 182
        this.offsetY = 220
        this.canCheck = false
        this.refillCounter = 0
        this.secondsToAdd = 0
        this.isPaused = false

        //THE FIRST ELEMENT MUST BE THE EMPTY SPACE
        this.colorsList = ["blockblast_piece_woodpiece.png","blockblast_piece_a.png","blockblast_piece_b.png","blockblast_piece_c.png","blockblast_piece_d.png","blockblast_piece_e.png"
        ,"blockblast_piece_f.png","blockblast_piece_g.png","blockblast_piece_h.png","blockblast_piece_i.png","blockblast_piece_j.png"
        ,"blockblast_piece_k.png","blockblast_piece_m.png","blockblast_piece_n.png","blockblast_piece_l.png"]
        //POWERUPS
        this.powerUpsList =["powerup_bomba.png","powerup_convertidor.png","powerup_girador.png"]
        //PICTURES
        this.offsetPictures = 540

        this.add.image(this.offsetPictures,this.offsetPictures,"table")
        this.add.image(this.offsetPictures,this.offsetPictures-1,"table_shadow")

        //TABLE DECOR
        this.add.image(this.offsetPictures-11,this.offsetPictures-507,"table_decor","blockblast_backgroud_table_decor_a.png")
        this.add.image(this.offsetPictures-11,this.offsetPictures+437,"table_decor","blockblast_backgroud_table_decor_b.png")
        this.add.image(this.offsetPictures-11,this.offsetPictures-440,"table_decor","blockblast_backgroud_table_decor_c.png")
        
        //DECOR
        this.add.image(this.offsetPictures-463,this.offsetPictures+397,"decor_b", "blockblast_decor_b_a.png")
        this.add.image(this.offsetPictures-560,this.offsetPictures+10,"decor_b", "blockblast_decor_b_b.png")
        this.add.image(this.offsetPictures-563,this.offsetPictures-140,"decor_b", "blockblast_decor_b_c.png")
        this.add.image(this.offsetPictures-520,this.offsetPictures-490,"decor_b", "blockblast_decor_b_d.png")
        this.add.image(this.offsetPictures-545,this.offsetPictures+185,"decor_b", "blockblast_decor_b_e.png")
        //PREVIEW
        this.add.image(this.offsetPictures+491,this.offsetPictures,"preview_space","blockblast_backgroud_previewspace_a.png")
        this.add.image(this.offsetPictures+436,this.offsetPictures,"preview_space","blockblast_backgroud_previewspace_b.png")
        this.add.image(this.offsetPictures+382,this.offsetPictures,"preview_space","blockblast_backgroud_previewspace_c.png")

        this.add.image(this.offsetPictures-50,this.offsetPictures-12,"b_box")
        this.add.image(this.offsetPictures-50,this.offsetPictures-12,"b_chess")

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
        this.colorsToRestore = []
        //CREATE BOARD
        this.board = []


        for(let i = 0; i < this.boardSize; i++){
            this.board[i] = []
            for(let j = 0; j < this.boardSize; j++){
                this.board[i][j] = this.add.image((i*this.squareSize)+this.offsetX, (j*this.squareSize)+this.offsetY,"piece", this.colorsList[0])
                //this.board[i][j].visible = false
                this.board[i][j].name = i.toString()+j.toString()+this.colorsList[0]
            }
        }

        this.boardMatrix = []
        for(let i = 0; i < this.boardSize; i++){
            this.boardMatrix[i] = []
            for(let j = 0; j < this.boardSize; j++){
                this.boardMatrix[i][j] = 0
            }
        }
        //SCORES
        this.scorePoints = 0
        this.gameoverBool = false
        var scoreContainer = this.add.image(320, 1000, 'menuUI', 'Score.png')
        this.scoreText = this.add.text(400, 997,"SCORE: ", { 
            fontFamily: 'Bungee', fontSize: '34px',  color: '#f4f4f4', align: 'center' }).setOrigin(0.5)
        this.scoreText.setStroke('#553b37', 8);

        //TIMER
        this.maxTimePerTurn = 15
        this.currentTime = this.maxTimePerTurn
        var timerContainer = this.add.image(980, 210, 'menuUI', 'Cronometro_fondo.png')
        
        this.timerText = this.add.text(980,210,this.FormatTime(this.currentTime), { 
            fontFamily: 'Bungee', fontSize: '34px',  color: '#f4f4f4', align: 'center' }).setOrigin(0.5)
        this.timerText.setStroke('#553b37', 8);
        this.time.addEvent({ delay: 1000, callback: this.UpdateTimer, callbackScope: this, loop: true })

        

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
                            "0000000010001100010000000", //Z
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
        this.scorePoints = 0
        this.scoreText.setText(this.scorePoints.toString().padStart(5, '0') )

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
        this.pauseButton = this.add.image(1010, 73, 'menuUI', 'Pausa_NonClicked.png').setInteractive();
        this.pauseButton.setScale(.8);
        this.pauseButton.on('pointerdown', () => 
            {
                this.PauseGame();
                //this.uiScene.audioManager.playButtonClick.play();
            });

        this.settingsButton = this.add.image(910, 73, 'menuUI', 'Ajustes_NonClicked.png').setInteractive();
        this.settingsButton.setScale(.8);
        this.settingsButton.on('pointerdown', () => 
            {
                this.OpenSettings();
                //this.uiScene.audioManager.playButtonClick.play();
            });
        

        //const container = this.CreatePiece(this.piece, 200,200,100)
       
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
            
            pointerContainer.y = this.pY-2*this.squareSize
            pointerContainer.visible = true
            this.canCheck = true
            
        }, this);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) =>
        {
            pointerContainer.x = this.pX-2*this.squareSize 
            
            pointerContainer.y = this.pY-2*this.squareSize

        });

        this.input.on('dragend', function (pointer, gameObject) {
            console.log(gameObject.parentContainer.name)
            this.canCheck = false
            pointerContainer.visible = false
            pointerContainer.x = -800
            
            pointerContainer.y =  -800
            if(this.CanPutPiece(this.piece.shape,this.pointerX, this.pointerY,this.boardMatrix)){
                this.piecesToDelete = []
                this.InsertPiece(this.piece,this.pointerX, this.pointerY)
                
                this.refillCounter +=1
                
                if(this.CheckGameOver() && this.refillCounter <3)this.MakeGameOver()
                if(this.refillCounter>2){
                    this.RemoveOptions()
                    this.CreateOptions()
                    this.refillCounter = 0
                }
                
            }
            else{
                gameObject.parentContainer.visible = true
                this.optionsBools[parseInt(gameObject.parentContainer.name)]= true
            }
            
        }, this);
               
           
    }
    
      

    update(time, deltaTime){
        console.log("CONV REFILL COUNTER "+ this.refillCounter)
        this.pointerX = Phaser.Math.Clamp((Phaser.Math.FloorTo((this.pX-this.offsetX+50)/this.squareSize)),0,10)-2
        this.pointerY = Phaser.Math.Clamp((Phaser.Math.FloorTo((this.pY- this.offsetY+50)/this.squareSize)),0,10)-2
        
        if(this.lastPointerX != this.pointerX || this.lastPointerY != this.pointerY){
            this.lastPointerX = this.pointerX
            this.lastPointerY = this.pointerY

            this.lineCounterXadd = [0,0,0,0,0,0,0,0]
            this.lineCounterYadd = [0,0,0,0,0,0,0,0]
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

    }
}
    