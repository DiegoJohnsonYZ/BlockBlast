const { merge } = require('webpack-merge'); // For merging this config        // with base.js
const TerserPlugin = require('terser-webpack-plugin'); // To minify       // your JS file in the build folder
const CopyPlugin = require('copy-webpack-plugin'); // To copy your        // assets to the build folder
const JavaScriptObfuscator = require('webpack-obfuscator')
const base = require('./base'); // Importing base.js file
module.exports = merge(base, { // Merging this config with base.js        // config 
   mode: 'production', // enable webpack's built-in optimizations         // that correspond to production
   output: {    
      filename: 'bundle.min.js', // The name of the built JS file
   },  
   devtool: false, // We don't need this in our production
   performance: {    
      maxEntrypointSize: 900000, 
      maxAssetSize: 900000, // These configure the file size limit         // of your build, webpack send you warnings if it is exceeded
   },  
   optimization: {
      minimizer: [
         new TerserPlugin({
            terserOptions: {
               output: {
                  comments: false, // Tell Terser Plugin to remove        // comments in your minified file
               },
            },
         }),
      ],
   },  
   plugins: [
      // new CopyPlugin({
      //    patterns: [
      //       {from: './src/images', to: './src/images'},
      //       {from: './src/audios', to: './src/audios'},
      //    ]
      // }),
      new JavaScriptObfuscator({
         compact: true, // Minimiza el código, reduciendo el tamaño del archivo
         stringArray: true, // Convierte cadenas en un array para dificultar su lectura
         stringArrayEncoding: ['base64'], // Codifica las cadenas en base64
         stringArrayThreshold: 0.75, // Proporción de cadenas que se deben ofuscar
         disableConsoleOutput: true, // Desactiva las salidas de consola (opcional)
         selfDefending: true, // Hace que el código ofuscado sea más resistente a la manipulación
      }),
   ],
});