# webpack
webpack是一个模块打包工具，编译文件
初始化：npm init -y
# 安装webpack V4+版本时，需要额外安装webpack-cli
npm install webpack webpack-cli -g
# 检查版本
webpack -v
# 卸载
npm uninstall webpack webpack-cli -g
# webpack不支持构件库
webpack启动函数 内置了很多函数功能，目的是为了让浏览器能解析我们的js（因为还有浏览器不支持require,export,module）
因为为了解决浏览器支持而内容的js功能，导致webpack不支持构件库
webpack适合构建项目工程，用强大的编译来提高开发率
spa 单页面应用 vue,react...
mpa 多页面应用
## 网站排名引流
seo 搜索引擎优化
sem 搜索引擎营销
## output filename: '[name][chunkhash:8].js' 不推荐使用hash，推荐使用chunkhash
hash:走的是构建版本,文件发生改变时，缺点用户的缓存没有用
hash:8 :8 指的是控制hash位数
chunkhash:
chunkhash:8 :8 指的是控制hash位数
contentHash: 针对内容改变，css推荐使用contentHash
## loader
安装模块 npm i style-loader css-loader -D
module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    }

npm install xxx -S 放在dependencies(应用依赖，业务依赖)      -S 是--save的缩写
npm install xxx -D 放在 devDependencies     -D 是--save -dev的缩写

## 通过webpack-dev-server 实现本地mock数据 服务器代理
