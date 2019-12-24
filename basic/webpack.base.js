const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');   //! 优化loader的时间处理！！！
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });  // 共享进程

module.exports = {
    entry: './src/react-test.js',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
    },
    optimization: {
        usedExports: true,
        splitChunks: {
            /**
             * chunks:
             * all 代表同步引入的数据和异步引入的数据都支持
             */
            chunks: "all",
            name: true,
            cacheGroups: {   // 缓存组
                react: {
                    test: /react|react-dom/,
                    name: "react",
                    priority: 10
                },
                lodash: {
                    test: /lodash/,
                    name: "lodash",
                    priority: 5
                },
                default: {
                    name: "other",
                    priority: 1
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, './src'),
                // use: ['style-loader', 'css-loader']  //! 用happyPack替代
                use: ['happypack/loader?id=css']
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
                use: ['happypack/loader?id=pics']
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, './src'),
                use: ['happypack/loader?id=babel']
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
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash:6].css',
            chunkFilename: "[id].css"
        }),
        new HappyPack({
            id: 'css',
            loaders: ['style-loader', 'css-loader'],
            threadPool: happyThreadPool       // 处理模式的时候，开启几个子进程
        }),
        new HappyPack({
            id: 'pics',
            loaders: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]',
                    }
                }
            ],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader'],
            threadPool: happyThreadPool
        })
    ]
}
