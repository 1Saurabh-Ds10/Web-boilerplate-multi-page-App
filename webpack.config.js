/* eslint-disable */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack');
const glob = require('glob');
let path = require('path');

let isProd =  process.argv.indexOf('-p') !== -1;
let cssDev = ['style-loader', 'css-loader'];
let cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader'
  });

module.exports = {
    entry: {
        page1: './src/js/pages/page1.js',
        page2: './src/js/pages/page2.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
        //    publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'es2016', 'es2017']
                        }
                    }
                ]
            },  {
                test: /\.css$/,
                use: isProd ? cssProd : cssDev

            },/* {
                test: /\.html$/,
                use: ['ejs-loader', 'html-loader'] //

            }, */ {
                test: /\.(jpg|png|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                           // publicPath: 'img/' // remove this, if get error
                        }
                    }
                ]

            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,   // gzip compression
        stats: 'errors-only',
        port: 8080,
        hot: (isProd) ? true : false,
        open: true
    },
    plugins: [
        new webpack
            .optimize
            .UglifyJsPlugin({}),
        new webpack.ProvidePlugin({
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'LoopArabia',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['page1'],
            template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new HtmlWebpackPlugin({
            filename: 'index2.html',
            title: 'LoopArabia',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['page2'],
            template: './src/index2.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new ExtractTextPlugin({filename: 'css/style_[name].css', disable: !isProd, allChunks: true}),
        new webpack.HotModuleReplacementPlugin({
            // Options...
        }),
        new webpack.NamedModulesPlugin(), 
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
            minimize: true
        }),
        new CleanWebpackPlugin(['dist'])
       /* new BrowserSyncPlugin({
            host: 'localhost',
            //host: '192.168.1.102',  //ip of local wifi - for other devices
            port: 8081,
            server: { baseDir: ['dist'] },
            reload: false
        }) */
    ]
}