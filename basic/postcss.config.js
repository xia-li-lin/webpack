module.exports = {
    plugins: [
        require('autoprefixer')({
            /**
             * overrideBrowserslist 覆盖浏览器兼容列表 
             * last 2 versions:浏览器最近的两个版本
             * >1% 大于市场份额1%的版本
             */
            overrideBrowserslist: ["last 2 versions", ">1%"]
        })
    ]
};
