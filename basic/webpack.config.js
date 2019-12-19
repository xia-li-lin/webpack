// webpack配置文件
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mpa = require('./mpa.js');
let onoff = true;  // true 单入口打包配置    false 多入口打包配置

module.exports = {
    /**
     * 入口文件：
     * 支持字符串如：'./src/index.js'
     * 数组如：['./src/index.js']/['./src/index.js','./src/other.js']
     * 对象：对于构建多入口是很有效的
     */
    // entry: {
    //     main: './src/index.js',
    //     other: './src/other.js',
    //     test: './src/test.js'
    // },
    entry: onoff ? './src/react-test.js' : mpa.entry,
    mode: 'development', // development 开发模式; production 生产模式; none 报警告
    output: mpa.output,
    devtool: 'cheap-module-eval-source-map',      // none:不开启sourceMap source-map：开启
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                /**
                 * loader 执行顺序 自右往左
                 * css-loader 把代码编译到js里
                 * style-loader 把代码以DOM的方式插入到head标签里
                 */
                include: path.resolve(__dirname, './src'),
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, './src'),
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                include: path.resolve(__dirname, './src'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, './src'),
                // exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, './node_modules')],
        alias: {
            '@': path.join(__dirname, './src/pages'),
            'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
        },
        extensions: ['.js', '.json', '.jsx', '.ts']
    },
    plugins: onoff ? [
        new HtmlWebpackPlugin({
            title: "京东商城",
            template: "./index.html",
            filename: "index.html"
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash:6].css',
            chunkFilename: "[id].css"
        })
    ] : mpa.plugins,
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
