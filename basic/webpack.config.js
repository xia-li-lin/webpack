// webpack配置文件
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    entry: './src/index.js',
    mode: 'development', // development 开发模式; production 生产模式; none 报警告
    output: {
        path: path.resolve(__dirname, './dist'),   // 绝对路径的字符串
        // filename: '[name]_[chunkhash:8].js'       // name是占位符
        filename: '[name].js'       // name是占位符
    },
    devtool: 'cheap-module-eval-source-map',      // none:不开启sourceMap source-map：开启
    module: {
        rules: [
            {
                test: /\.css$/,
                /**
                 * loader 执行顺序 自右往左
                 * css-loader 把代码编译到js里
                 * style-loader 把代码以DOM的方式插入到head标签里
                 */
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack',
            template: './index.html',        // 使用哪个模版
            filename: 'kkb.html'             // 模版存放在出口文件夹中的文件名
        }),
        new CleanWebpackPlugin()
    ]
}
