

class Piece {
    constructor(color, shape){
        this.color = color
        this.shape = shape
    }
}



export class MainScene extends Phaser.Scene{
    constructor()
    {
        super({
            key: "main",
            physics: {
                arcade: {
                    gravity: {y:200},
                    debug: true,
                    fps: 60,
                },
                matter: {
                    debug: true,
                    gravity: { y:2}
                }
            },
        })
    }

    CreatePiece(piece, x, y, size){
        const container = this.add.container(x,y)
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                console.log(piece.shape.type)
                if(piece.shape.charAt((5*i)+j) == 1){
                    var s1 = this.add.image((size*j)-200,(size*i)-200 , "square")
                    s1.setTint(piece.color)
                    s1.setInteractive()
                    this.input.setDraggable(s1)
                    container.add(s1)
                }
            }
        }
        return container
    }

    CanPutPiece(piece, x,y, boardMatrix){
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.shape.charAt((5*i)+j) == 1){
                    if(i+y > boardMatrix.lenght || j + x >boardMatrix[0].lenght|| i+y<0||j+x<0){
                        return false
                    }
                    if(piece.shape.charAt((5*i)+j) == boardMatrix[j+x][i+y]){
                        return false
                    }
                
                }
                
                
            }
        }
        return true
    }

    DrawPiece(piece,x,y,board){
        console.log("drawing")
        var list = new Array()
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(piece.shape.charAt((5*i)+j) == 1){
                    board[j+x][i+y].setTint(899499)
                    list.push(board[j+x][i+y])
                    console.log("h")
                }
                
                
            }
        }
        return list

    }
    DeletePiece(pieces){
        pieces.forEach((element)=> element.setTint(0xffffff))
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
        this.piece = new Piece(0xffff00, "0010000100001000010000100")
        var boardSize = 8
        var squareSize = 100
        this.offset = 50
        this.board = []

        for(let i = 0; i < boardSize; i++){
            this.board[i] = []
            for(let j = 0; j < boardSize; j++){
                this.board[i][j] = this.add.image((i*squareSize)+this.offset, (j*squareSize)+this.offset, "square")
            }
        }

        this.boardMatrix = []
        for(let i = 0; i < boardSize; i++){
            this.boardMatrix[i] = []
            for(let j = 0; j < boardSize; j++){
                this.boardMatrix[i][j] = 0
            }
        }
        
        

            
        
       

        

        //const container = this.CreatePiece(this.piece, 200,200,100)
       

        
        this.input.on('dragstart', function (pointer, gameObject) {

            //  This will bring the selected gameObject to the top of the list
            //this.children.bringToTop(gameObject);

        }, this);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) =>
        {
            console.log("drag")
            console.log(gameObject.parentContainer)
            gameObject.parentContainer.x = this.input.mousePointer.x
            console.log(dragX)
            
            gameObject.parentContainer.y = this.input.mousePointer.y-200
            console.log(dragY)

        });
        
        this.input.on('dragend', function (pointer, gameObject) {

            //  This will bring the selected gameObject to the top of the list
            //this.children.bringToTop(gameObject);

        }, this);
               
           
        }
      

    update(time, deltaTime){
        
        this.pointerX = Phaser.Math.Clamp((Phaser.Math.FloorTo(this.input.mousePointer.x/100)),0,8)
        this.pointerY = Phaser.Math.Clamp((Phaser.Math.FloorTo((this.input.mousePointer.y/100))),0,8)
        if(this.lastPointerX != this.pointerX || this.lastPointerY != this.pointerY){
            this.lastPointerX = this.pointerX
            this.lastPointerY = this.pointerY
            console.log("change")
            //if(this.piecesList.length > 0)this.DeletePiece(this.piecesList)
            if(this.CanPutPiece(this.piece,this.pointerX, this.pointerY,this.boardMatrix))
                //this.piecesList = this.DrawPiece(this.piece, 0,0,this.board)

        }

    }
}
    
