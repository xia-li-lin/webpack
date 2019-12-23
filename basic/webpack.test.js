const baseConfig = require('./webpack.base');
const devConfig = require('./webpack.dev');
const proConfig = require('./webpack.pro');
const webpackMerge = require('webpack-merge');

console.log(process.env.NODE_ENV);

const isPro = process.env.NODE_ENV === 'production';

module.exports = () => {
    if (isPro) {
        return webpackMerge(baseConfig, proConfig);
    } else {
        return webpackMerge(baseConfig, devConfig);
    }
};
