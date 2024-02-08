import { MainScene } from "./MainScene.js";
// -------------------------------------------
// Initializing Phaser Game
// -------------------------------------------

// game configuration
var config = {
    type: Phaser.AUTO,
    parent: 'phaser',
    width: 1080,
    height: 1080,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
        createContainer: true
    },
    scene: [ MainScene],

    

    fps: { forceSetTimeOut: true, target: 60 }
}

// gama instance
var game = new Phaser.Game(config);