const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');

const setMpa = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './pages/*/index.js'));

    entryFiles.map((item, index) => {
        const entryFile = item;
        const match = entryFile.match(/pages\/(.*)\/index\.js$/);
        const pageName = match && match[1];

        entry[pageName] = entryFile;

        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            title: pageName,
            template: path.join(__dirname, `pages/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: [pageName],
            inject: true
        }));
    });
    console.log(entry);
    return {
        entry,
        htmlWebpackPlugins
    };
};

const { entry, htmlWebpackPlugins } = setMpa();

module.exports = {
    mode: 'development',
    entry: entry,
    output: {
        path: path.resolve(__dirname, './mpa'),
        filename: "[name].js"
    },
    plugins: [
        ...htmlWebpackPlugins,
        new CleanWebpackPlugin()
    ]
};