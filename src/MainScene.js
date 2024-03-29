



class Piece {
    constructor(color, shape){
        this.color = color
        this.shape = shape
    }
}

class Queue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(element) {
      this.queue.push(element);
      return this.queue;
    }
  
    dequeue() {
      return this.queue.shift();
    }
  
    peek() {
      return this.queue[0];
    }
  
    size() {
      return this.queue.length;
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  
    print() {
      return this.queue;
    }
  }

export class MainScene extends Phaser.Scene{
    

    CreatePiece(piece, x, y, size, sizeM){
        size = size*sizeM
        const container = this.add.container(x,y)
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.shape.charAt((5*i)+j) == 1){
                    var s1 = this.add.image((size*j)-(size*2),(size*i)-(size*2) , "square")
                    s1.setTint(piece.color)
                    s1.setInteractive()
                    s1.setScale(sizeM)
                    this.input.setDraggable(s1)
                    container.add(s1)
                }
            }
        }
        return container
    }

    CanPutPiece(piece, x,y){
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.charAt((5*i)+j) == 1){
                    if(i+y > this.boardMatrix.length-1 || j + x >this.boardMatrix[0].length-1|| i+y<0||j+x<0){
                        
                        return false
                    }
                    else if(piece.charAt((5*i)+j) == this.boardMatrix[j+x][i+y]){
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
                if(piece.shape.charAt((5*i)+j) == 1){
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
                if(piece.shape.charAt((5*i)+j) == 1){
                    this.board[j+x][i+y].setTint(piece.color)
                    this.boardMatrix[j+x][i+y] = 1
                    this.lineCounterX[i+y] += 1
                    this.lineCounterY[j+x] += 1
                    this.scorePoints += 1
                }
                
                
            }
        }

        this.BreakLine()
    }
    GetRandomInt(max) {

        return Math.floor(Math.random() * max);
    }

    GeneratePiece(){
       return new Piece(this.colorsList[this.GetRandomInt(this.colorsList.length)],this.piecesList[this.GetRandomInt(this.piecesList.length)])
    }


    DeletePiece(pieces){
        pieces.forEach((element)=> element.setTint(0xffffff))
    }

    BreakLine(){
        
        
        for(let i = 0; i < this.piecesToClear.length; i++){
            var filas =this.piecesToClear[i].name.charAt(0)
            var columnas = this.piecesToClear[i].name.charAt(1)
            this.piecesToClear[i].setTint(0xffffff)
            this.boardMatrix[filas][columnas] = 0
            this.lineCounterX[columnas]=Phaser.Math.Clamp(this.lineCounterX[columnas]-1,0,8)
            this.lineCounterY[filas]=Phaser.Math.Clamp(this.lineCounterY[filas]-1,0,8)
            this.scorePoints+=1


            
            
        }
        this.colorsToRestore= []
        this.piecesToClear = []
        this.scoreText.setText("SCORE: " + this.scorePoints.toString().padStart(8, '0') )
        
        
    }

    ShowBreakingLines(){
        this.piecesToClear = []
        this.colorsToRestore = []
        var iterator = 0
        

        for(let i = 0; i < this.boardSize; i++){
            
            if(this.lineCounterXadd[i]+this.lineCounterX[i]== this.boardSize){
                
                for(let j = 0; j < this.boardSize; j++){
                    this.piecesToClear[iterator] = this.board[j][i]
                    this.colorsToRestore[iterator] = this.board[j][i].tintTopLeft
                    iterator += 1
                    this.board[j][i].setTint(this.piece.color)
                    

                    
                }
            }
            if(this.lineCounterYadd[i]+this.lineCounterY[i]== this.boardSize){
                
                for(let j = 0; j < this.boardSize; j++){
                    this.piecesToClear[iterator] = this.board[i][j]
                    this.colorsToRestore[iterator] = this.board[i][j].tintTopLeft
                    iterator += 1
                    this.board[i][j].setTint(this.piece.color)
                   
                    
                }
            }
            
        }
        
    }

    ChangePointer(){
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(this.piece.shape.charAt((5*i)+j) == 1){
                    this.pointer[j][i].alpha = 1
                    this.pointer[j][i].setTint(this.piece.color)

                }
                else{
                    this.pointer[j][i].alpha = 0
                }
                
                
            }
        }
    }

    RestoreColors(){
        
        for(let i = 0; i < this.colorsToRestore.length; i++){


            this.piecesToClear[i].setTint(this.colorsToRestore[i])


            
            
        }
        if(this.piecesToDelete.length > 0)this.DeletePiece(this.piecesToDelete)
        
    }
    CountPieceValue(piece){
        var counterPiece = 0
        for(let i = 0; i < 25; i++){
            if(piece.charAt(i) == 1)counterPiece+=1
        }
        return counterPiece
    }

    RecommendOptions(){
        var aux = 0
        var queue = new Queue()
        var maxValue = -1
        var maxPieceSize = 0
        var pieceSize = 0
        for(let i = -2; i < this.boardSize-2; i++){
            for(let j = -2; j < this.boardSize-2; j++){
                //console.log(j)
                if(this.boardMatrix[j+2][i+2] ==0){
                    this.ShuffleArray(this.piecesList)
                    for(let k = 0; k < this.piecesList.length; k++){
                        
                        aux = this.CheckValue(this.piecesList[k],j,i)
                        pieceSize = this.CountPieceValue(this.piecesList[k])
                        if(aux>maxValue || pieceSize > maxPieceSize){
                            
                            maxPieceSize = pieceSize
                            queue.enqueue(this.piecesList[k])
                            if(queue.size()>3){
                                maxValue +=1
                                queue.dequeue()
                                console.log(maxValue)
                                if(maxValue==2) {
                                    console.log(maxValue)
                                    return queue
                                }
                            }
                        }
                    }
                    
                }

            }
        }
        return queue
    }

    ShuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    CreateOptions(){
        this.optionsBools[0] = true
        this.optionsBools[1] = true
        this.optionsBools[2] = true
        
        //var queue = this.RecommendOptions()
        var listPieces = this.GetBestPieces()

        var pieceOption = this.GeneratePiece()
        pieceOption.shape = listPieces[0]
        this.option1 = this.CreatePiece(pieceOption, 1000,400,100,0.3)
        
        this.option1.name = "0"
        this.optionsPieces[0] = pieceOption
        pieceOption = this.GeneratePiece()
        pieceOption.shape = listPieces[1]
        this.option2 = this.CreatePiece(pieceOption, 1000,550,100,0.3)
        this.option2.name = "1"
        this.optionsPieces[1]=pieceOption
        pieceOption = this.GeneratePiece()
        pieceOption.shape = listPieces[2]
        this.option3 = this.CreatePiece(pieceOption, 1000,700,100,0.3)
        this.option3.name = "2"
        this.optionsPieces[2]=pieceOption
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
                    if(board[j-1][i] == 1 && board[j][i]==0){
                        positionArray.push((i*board.length)+j)
                        console.log((i*board.length)+j)
                    }
                }
                
                if(board[j][i]==1 ) lineCounter+=1
                if(j==0){
                    if(lineCounter>=3&&board[j][i]!=1){
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

                if(piece.charAt((5*i)+j) == 1){
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

                if(piece.charAt((5*i)+j) == 1){
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
            console.log("Test =========================================")
            //copiar el tablero
            var newBoard = []
            for (var i = 0; i < this.boardSize; i++)newBoard[i] = this.boardMatrix[i].slice()
            //Copiar counters
            var newLineCounterY = this.lineCounterX.slice()
            var newLineCounterX = this.lineCounterY.slice()
            console.log(newLineCounterX)
            console.log(newLineCounterY)
            console.log(newBoard)

            var scoreAcum = 0
            
            for(let i = 0; i < 3; i++){
                
                //Obtener las posiciones y randomizarlas
                this.positions = this.ObtainPositions(newBoard)
                this.ShuffleArray(this.positions)
                var iterator = 0
                var y = ~~(this.positions[i]/this.boardSize)
                
                var x = this.positions[i]%this.boardSize
                console.log("coordenadas " + x.toString() + " y " + y.toString() )
                this.ShuffleArray(this.piecesList)
                //Revisar si las pieza entran
                for(let j = 0; j<this.piecesList.length; j++){
                    if(this.CheckPiece(newBoard,this.piecesList[j],x,y)){
                        var score = this.InsertPieceBoard(newBoard,newLineCounterX,newLineCounterY,this.piecesList[j],x,y)
                        console.log(newLineCounterX)
                        console.log(newLineCounterY)
                        console.log(newBoard)
                        listPieces.push(this.piecesList[j])
                        scoreAcum+= score
                        console.log("selected piece is " + this.piecesList[j])
                        console.log("sum " + scoreAcum.toString() + " mas " + score.toString())
                        break
                    }
                    
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
        
        

        return trueList
    }


    CheckValue(piece, x,y){
            this.lineCounterXadd = [0,0,0,0,0,0,0,0]
            this.lineCounterYadd = [0,0,0,0,0,0,0,0]
            
            var counterPoints = 0
            for(let i = 0; i < 5; i++){
                for(let j = 0; j < 5; j++){
                    if(piece.charAt((5*i)+j) == 1){
                        if(i+y > this.boardMatrix.length-1 || j + x >this.boardMatrix[0].length-1|| i+y<0||j+x<0){
                            
                            return -1
                        }
                        else if(piece.charAt((5*i)+j) == this.boardMatrix[j+x][i+y]){
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
    

    preload(){
       this.load.image("square","src/images/BBSquare.png")
       
    }

   

    create(){
        
        this.pointerX = 0
        this.pointerY = 0

        this.lastPointerX = 0
        this.lastPointerY = 0

        this.piecesList = []

        this.counter = 0
        
        this.boardSize = 8
        this.squareSize = 90
        this.offsetX = 230
        this.offsetY = 220
        this.canCheck = false
        this.refillCounter = 0

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
                this.board[i][j] = this.add.image((i*this.squareSize)+this.offsetX, (j*this.squareSize)+this.offsetY, "square")
                this.board[i][j].name = i.toString()+j.toString()
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

        this.scoreText = this.add.text(230, 950,"SCORE: ", {fontSize:  70})
        this.gameover = this.add.text(250, 400,"", {fontSize:  100})

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
                            "0000000100001100010000000", //T der
                            "0000000100011000010000000", //T izq
                            "0000000100001000011000000", //L
                            "0000000010011100000000000", //L arriba
                            "0000001100001000010000000", //L izq
                            "0000000000011100100000000", //L abajo
                            "0000000100001000110000000", //LI
                            "0000001000011100000000000", //LI arriba
                            "0000000110001000010000000", //LI izq
                            "0000000000011100001000000", //LI abajo
                            "0000000100001100001000000", //S
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

        this.colorsList = [0xff0000,0x00ff00,0x0000ff]

        this.piece = this.GeneratePiece()
        this.piece.shape = this.piecesList[this.piecesList.length-3]
        this.piecesToDelete = []
        
        //SETTING BOARD
        this.InsertPiece(this.GeneratePiece(),0,0)
        this.InsertPiece(this.GeneratePiece(),3,3)
        this.scorePoints = 0
        this.scoreText.setText("SCORE: " + this.scorePoints.toString().padStart(8, '0') )

        //CREATE OPTIONS
        this.optionsBools = []
        
        this.optionsPieces = []
        this.CreateOptions()
        //this.option3.visible = false

        //CREATE POINTER

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
            this.xCounters[i] = this.add.text((i*100)+30, 800,"i", {fontSize:  50})
            this.xCounters[i].visible = false
        }
        this.yCounters = []
        for(let i = 0; i < this.boardSize; i++){
            this.yCounters[i] = this.add.text(800, (i*100)+30,"i", {fontSize:  50})
            this.yCounters[i].visible = false
        }

        

        //const container = this.CreatePiece(this.piece, 200,200,100)
       

        
        this.input.on('dragstart', function (pointer, gameObject) {
            console.log(gameObject.parentContainer.name)
            gameObject.parentContainer.visible = false
            this.piece = this.optionsPieces[parseInt(gameObject.parentContainer.name)]
            this.optionsBools[parseInt(gameObject.parentContainer.name)]= false
            this.ChangePointer()
            pointerContainer.visible = true
            this.canCheck = true
            
        }, this);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) =>
        {
            pointerContainer.x = this.input.mousePointer.x-2*this.squareSize
            
            pointerContainer.y = this.input.mousePointer.y-4*this.squareSize

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
                
                if(this.CheckGameOver() && this.refillCounter <3)this.gameover.setText("GAME OVER")
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
        
        this.pointerX = Phaser.Math.Clamp((Phaser.Math.FloorTo((this.input.mousePointer.x-this.offsetX+50)/this.squareSize)),0,10)-2
        this.pointerY = Phaser.Math.Clamp((Phaser.Math.FloorTo((this.input.mousePointer.y- this.offsetY+50)/this.squareSize)),0,10)-4
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
    
