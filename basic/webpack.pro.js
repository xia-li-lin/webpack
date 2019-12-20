const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const path = require('path');

const proConfig = {
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'js/[name]_[hash:6].js'
    },
    mode: 'production', // development 开发模式; production 生产模式; none 报警告
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
            filename: "index.html",
            minify: {
                // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空⽩白符与换⾏行行符
                minifyCSS: true // 压缩内联css
            }
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            }
        })
    ]
}

module.exports = webpackMerge(baseConfig, proConfig);
