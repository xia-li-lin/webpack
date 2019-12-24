const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const { DllReferencePlugin } = require('webpack');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const HappyPack = require('happypack');   //! 优化loader的时间处理！！！

const devConfig = {
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name]_[hash:6].js'
    },
    mode: 'development', // development 开发模式; production 生产模式; none 报警告
    devtool: 'cheap-module-eval-source-map',      // none:不开启sourceMap source-map：开启
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "京东商城",
            template: "./index.html",
            filename: "index.html"
        }),
        new DllReferencePlugin({
            manifest: require('./dll/react-manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, './dll/react.dll.js')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '/dist'),
        open: true,
        port: 9090,
        hot: true,          // 开启热模块
        hotOnly: true,      // 强制浏览器不刷新
        proxy: {
            '/api': {
                target: 'http://localhost:9092'
            }
        }
    }
}

module.exports = webpackMerge(baseConfig, devConfig);
