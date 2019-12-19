const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    console.log(entryFiles);
    entryFiles.map((item, index) => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/(.*)\/index\.js$/);
        console.log(item);
        const pathName = match && match[1];
        entry[pathName] = entryFile;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                title: pathName,
                template: path.join(__dirname, `src/${pathName}/index.html`),
                filename: `${pathName}.html`,
                chunks: [pathName],
                inject: true
            })
        )
    });

    return {
        entry,
        htmlWebpackPlugins
    }
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, './dist'),   // 绝对路径的字符串
        // filename: '[name]_[chunkhash:8].js'       // name是占位符
        filename: '[name].js'       // name是占位符
    },
    plugins: [
        ...htmlWebpackPlugins,
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}