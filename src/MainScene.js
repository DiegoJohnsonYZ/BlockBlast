

class Piece {
    constructor(color, shape){
        this.color = color
        this.shape = shape
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
                if(piece.shape.charAt((5*i)+j) == 1){
                    if(i+y > this.boardMatrix.length-1 || j + x >this.boardMatrix[0].length-1|| i+y<0||j+x<0){
                        
                        return false
                    }
                    else if(piece.shape.charAt((5*i)+j) == this.boardMatrix[j+x][i+y]){
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
                }
                
                
            }
        }
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
                }
                
                
            }
        }
        this.CanBreakLine()
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

    CanBreakLine(){
        
        //HORIZONTAL
        for(let i = 0; i < this.boardSize; i++){
            
            if(this.lineCounterX[i]== this.boardSize){
                
                for(let j = 0; j < this.boardSize; j++){
                    this.board[j][i].setTint(0xffffff)
                    this.boardMatrix[j][i] = 0
                    this.lineCounterX[i]=0
                    this.lineCounterY[j]-=1
                    
                }
            }
            if(this.lineCounterY[i]== this.boardSize){
                
                for(let j = 0; j < this.boardSize; j++){
                    this.board[i][j].setTint(0xffffff)
                    this.boardMatrix[i][j] = 0
                    this.lineCounterY[i]=0
                    this.lineCounterX[j]-=1
                    
                }
            }
            
        }
        console.log(this.lineCounterX)
        console.log(this.lineCounterY)
        
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

    CreateOptions(){
        var pieceOption = this.GeneratePiece()
        this.option1 = this.CreatePiece(pieceOption, 950,200,100,0.5)
        this.option1.name = "0"
        this.optionsPieces[0] = pieceOption
        pieceOption = this.GeneratePiece()
        this.option1.piece = this.GeneratePiece()
        this.option2 = this.CreatePiece(pieceOption, 950,500,100,0.5)
        this.option2.name = "1"
        this.optionsPieces[1]=pieceOption
        pieceOption = this.GeneratePiece()
        this.option3 = this.CreatePiece(pieceOption, 950,800,100,0.5)
        this.option3.name = "2"
        this.optionsPieces[2]=pieceOption
    }

    RemoveOptions(){
        this.option1.destroy()
        this.option2.destroy()
        this.option3.destroy()
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
        var squareSize = 100
        this.offset = 50
        this.canCheck = false
        this.refillCounter = 0

        //CREATE LINECOUNTERS

        this.lineCounterX = [0,0,0,0,0,0,0,0]
        this.lineCounterY = [0,0,0,0,0,0,0,0]
        this.lineCounterXadd = [0,0,0,0,0,0,0,0]
        this.lineCounterYadd = [0,0,0,0,0,0,0,0]
        //CREATE BOARD
        this.board = []


        for(let i = 0; i < this.boardSize; i++){
            this.board[i] = []
            for(let j = 0; j < this.boardSize; j++){
                this.board[i][j] = this.add.image((i*squareSize)+this.offset, (j*squareSize)+this.offset, "square")
            }
        }

        this.boardMatrix = []
        for(let i = 0; i < this.boardSize; i++){
            this.boardMatrix[i] = []
            for(let j = 0; j < this.boardSize; j++){
                this.boardMatrix[i][j] = 0
            }
        }

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


                            ]

        this.colorsList = [0xff0000,0x00ff00,0x0000ff]

        this.piece = this.GeneratePiece()
        this.piece.shape = this.piecesList[this.piecesList.length-3]
        this.piecesToDelete = []
        
        //SETTING BOARD
        this.InsertPiece(this.GeneratePiece(),0,0)
        this.InsertPiece(this.GeneratePiece(),3,3)
            
       

        //CREATE OPTIONS
        this.optionsPieces = []
        this.CreateOptions()
        //this.option3.visible = false

        //CREATE POINTER

        this.pointer = []
        const pointerContainer = this.add.container(-800,-800)

        for(let i = 0; i < 5; i++){
            this.pointer[i] = []
            for(let j = 0; j < 5; j++){
                this.pointer[i][j] = this.add.image((i*squareSize), (j*squareSize), "square")
                pointerContainer.add(this.pointer[i][j])
            }
        }
        pointerContainer.visible = false


        
        

        //const container = this.CreatePiece(this.piece, 200,200,100)
       

        
        this.input.on('dragstart', function (pointer, gameObject) {
            console.log(gameObject.parentContainer.name)
            gameObject.parentContainer.visible = false
            this.piece = this.optionsPieces[parseInt(gameObject.parentContainer.name)]
            this.ChangePointer()
            pointerContainer.visible = true
            this.canCheck = true

        }, this);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) =>
        {
            pointerContainer.x = this.input.mousePointer.x-2*squareSize
            
            pointerContainer.y = this.input.mousePointer.y-4*squareSize

        });

        this.input.on('dragend', function (pointer, gameObject) {
            console.log(gameObject.parentContainer.name)
            this.canCheck = false
            pointerContainer.visible = false
            pointerContainer.x = -800
            
            pointerContainer.y =  -800
            if(this.CanPutPiece(this.piece,this.pointerX, this.pointerY,this.boardMatrix)){
                this.piecesToDelete = []
                this.InsertPiece(this.piece,this.pointerX, this.pointerY)
                this.refillCounter +=1
                if(this.refillCounter>2){
                    this.RemoveOptions()
                    this.CreateOptions()
                    this.refillCounter = 0
                }
                
            }
            else{
                gameObject.parentContainer.visible = true
            }
            
            
        }, this);
               
           
        }
      

    update(time, deltaTime){
        
        this.pointerX = Phaser.Math.Clamp((Phaser.Math.FloorTo(this.input.mousePointer.x/100)),0,10)-2
        this.pointerY = Phaser.Math.Clamp((Phaser.Math.FloorTo((this.input.mousePointer.y/100))),0,10)-4
        if(this.lastPointerX != this.pointerX || this.lastPointerY != this.pointerY){
            this.lastPointerX = this.pointerX
            this.lastPointerY = this.pointerY
            if(this.piecesToDelete.length > 0)this.DeletePiece(this.piecesToDelete)
            if(this.canCheck){
                if(this.CanPutPiece(this.piece,this.pointerX, this.pointerY,this.boardMatrix)){
                    this.piecesToDelete = this.DrawPiece(this.piece, this.pointerX,this.pointerY,this.board)
                }
            }
                

        }

    }
}
    
