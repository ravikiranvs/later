var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var LiveReloadPlugin = require('webpack-livereload-plugin');

var BUILD_DIR = path.resolve(__dirname, '../../public');
var APP_DIR = path.resolve(__dirname, '../app');

// webpack options
module.exports = {
    entry: [APP_DIR + '/main.js'],
    output: {
        publicPath: '/',
        path: BUILD_DIR,
        filename: 'bundle.min.js'
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            { test: /\.js?$/, include: APP_DIR, loader: 'babel' },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.eot$/, loader: "file" },
            { test: /\.woff$/, loader: "file" },
            { test: /\.woff2$/, loader: "file" },
            { test: /\.ttf$/, loader: "file" },
            { test: /\.svg$/, loader: 'svg-inline' }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/app/index.html'
        })//,
        //new LiveReloadPlugin({})
    ]
}