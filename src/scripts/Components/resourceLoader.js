const prodRoute =  'https://static.pchujoy.com/public/games-assets/parchados';


export class ResourceLoader{
 
    static isProd = false;

    constructor(scene){
        this.scene = scene;
    }

    static ReturnPath(){
        if(this.isProd){
            return prodRoute
        }
        else{
            return './src'
        }
    }
    
}