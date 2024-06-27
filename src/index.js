import { MainScene } from "./scripts/scenes/MainScene.js";
import { MenuScene } from "./scripts/scenes/MenuScene.js";
import { UIScene } from "./scripts/scenes/UIScene.js";
import { BootScene } from "./scripts/scenes/BootScene.js";
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import * as Phaser from 'phaser';


// -------------------------------------------
// Initializing Phaser Game
// -------------------------------------------
/**
 * Runs the game with the specified options.
 * @param {Object} opts - The options for the game.
 * @param {Function} opts.onGameStart - The callback function to be executed when the game starts.
 * @param {Function} opts.onGameEnd - The callback function to be executed when the game ends.
 */
function run(opts) {
    const metadata = {
        highScore: opts?.highScore || 0,
        sponsor: opts?.sponsor || true,
        onGameStart: opts?.onGameStart || (() => {}),
        onGameEnd: opts?.onGameEnd || (() => {}),
    };

    const gameOptions = {
        
        type: Phaser.AUTO,
        parent: 'phaser-div',
        width: 1080,
        height: 1080,

        dom: {
            createContainer: true
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: [BootScene, UIScene, MenuScene, MainScene],

        fps: { target: 60 },

        // Overwrite the default game options with the provided options
        ...opts,
        
        plugins: {
            global: [{
                key: 'rexWebFontLoader',
                plugin: WebFontLoaderPlugin,
                start: true
            }],
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            }]
        },
        }


    // gama instance
    const game = new Phaser.Game(gameOptions);
    game.config.metadata = metadata;
}

// Attach the game to the window object
if (typeof window !== 'undefined') {
    if (!window.BlockBlast) {
      window.BlockBlast = {
        run,
      };
    }
}