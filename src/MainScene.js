class Fruit {
    constructor(name, radius, type) {
      this.name = name
      this.radius = radius
      this.type = type
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

    addFruit(x, y, fruit) {

        var fruitObject = this.matter.add
        .image(x, y, fruit.name)
        .setName(fruit.name)
        .setDisplaySize(fruit.radius * 2, fruit.radius * 2)
        .setFriction(0.005)
        .setBounce(0.2)
        .setDepth(-1)
        
        if(fruit.type === "c"){        
            fruitObject.setCircle(fruit.radius)
        }

        return fruitObject
      }
    

    preload(){
       this.load.image("pato","src/images/pato.png")
       this.load.image("fruit1","src/images/fruit1.png")
       this.load.image("fruit2","src/images/fruit2.png")
       this.load.image("fruit3","src/images/fruit3.png")
       this.load.image("fruit4","src/images/fruit4.png")
       this.load.image("fruit5","src/images/fruit5.png")
       this.load.image("fruit6","src/images/fruit6.png")
       this.load.image("fruit7","src/images/fruit7.png")
       this.load.image("fruit8","src/images/fruit8.png")
       this.load.image("fruit9","src/images/fruit9.png")
       this.load.image("platform","src/images/platform.png")
       
    }

    UpdatePointer(pointerImage, newFruit){
        pointerImage.setDisplaySize(newFruit.radius*2, newFruit.radius*2)
        pointerImage.setTexture(newFruit.name)

    }

    create(){
        const fruits =  [ new Fruit("fruit1", 20, "s"), 
                        new Fruit("fruit2", 40, "s"),
                        new Fruit("fruit3", 60, "c"),
                        new Fruit("fruit4", 80, "c"),
                        new Fruit("fruit5", 90, "c"),
                        new Fruit("fruit6", 100, "s"),
                        new Fruit("fruit7", 130, "c"),
                        new Fruit("fruit8", 160, "c"),
                        new Fruit("fruit9", 200, "c")] 

        var pointerImage = this.add.image(170, 200, "pato")
        pointerImage.setOrigin(0.5,0.5)

        this.matter.add.image(100, 950, 'platform', null, { isStatic: true }).setName('wall').rotation += 1.57
        this.matter.add.image(400, 950, 'platform', null, { isStatic: true }).setName('wall')
        this.matter.add.image(700, 950, 'platform', null, { isStatic: true }).setName('wall').rotation += 1.57      
        var self = this

        var limiteIzquierdo = 170
        var limiteDerecho = 600
        var pointerX = 0
        var nextFruitIndex = 0

        this.UpdatePointer(pointerImage, fruits[nextFruitIndex])

        this.input.on('pointermove', function (pointer) {
            // Obtiene la posición del mouse en el eje X
            pointerX = pointer.x
            pointerImage.x = Phaser.Math.Clamp(pointer.x, limiteIzquierdo, limiteDerecho)
        },this);
        this.input.on('pointerdown', function (pointer, event) {
            if (pointer.leftButtonDown()) {
                this.addFruit(pointerX, -100, fruits[nextFruitIndex])
                nextFruitIndex = Math.floor(Math.random() * 3)
                this.UpdatePointer(pointerImage, fruits[nextFruitIndex])
            }
        }, this);
        this.matter.world.on(
            "collisionactive",
            function(event){
                for (var i = 0; i < event.pairs.length; i++) {
                    var bodyA = event.pairs[i].bodyA;
                    var bodyB = event.pairs[i].bodyB;
                    if (bodyA.gameObject != null && bodyB.gameObject != null) {
                        if (bodyA.gameObject.name != 'wall' && bodyB.gameObject.name != 'wall') {
                            if (bodyA.gameObject.name == bodyB.gameObject.name){
                                const fruitIndex = fruits.findIndex(
                                    (fruit) => fruit.name === bodyA.gameObject.name
                                )
                                console.log(fruitIndex)
                                bodyA.gameObject.destroy()
                                bodyB.gameObject.destroy()
                                
                                const newFruit = fruits[fruitIndex + 1]
            
                                self.addFruit(bodyA.position.x, bodyA.position.y, newFruit)
                            }
                        }
                    }
                }

                /*
                if(bodyA.gameObject.name === bodyB.gameObject.name){
                    const fruitIndex = fruits.findIndex(
                        (fruit) => fruit.name === bodyA.gameObject.name
                    )
                    console.log(fruitIndex)
                    bodyA.gameObject.destroy()
                    bodyB.gameObject.destroy()
                    
                    const newFruit = fruits[fruitIndex + 1]

                    self.addFruit(bodyA.position.x, bodyA.position.y, newFruit)
                }      
                */    
            } 
          )

        }
      }
    
