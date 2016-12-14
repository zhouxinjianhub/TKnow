const webpack = require("webpack"),
    path = require("path"),
    fs = require("fs"),
    // HtmlWebpackPlugin = require('html-webpack-plugin'), // 自动生成html文件
    ExtractTextPlugin = require("extract-text-webpack-plugin");// 独立css

// const node_modules_dir = path.join(__dirname, 'node_modules'); // 获取某个路径

const TIME = new Date();
const fileNamed = "app";
const env = process.env.NODE_ENV;
// console.log('当前开发环境是：'+ env);

module.exports = {
    // devtool: "source-map", // 便于调试
    entry: {
        main: "./common/module/"+fileNamed+".js",
        common: ["react", "react-dom", 'react-router']
    },
    output: {
        publicPath: "../build/",
        path: path.join(__dirname, "build"),
        filename: "main.min.js",
        // chunkFilename: '[chunkhash:20].js'
        chunkFilename: 'chunk/[name].chunk.js'
    },
    module: {
        preLoaders: [

        ],
        loaders: [
            {
               test: /\.less$/,
               loader: ExtractTextPlugin.extract('style-loader',  "css-loader!less-loader")
            },
            // {
            //     test: /\.less$/,
            //     loader: "style-loader!css-loader!autoprefixer-loader!less-loader?sourceMap"
            // }, 
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader"
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/, loader: 'file-loader?limit=1000&name=font/[hash].[ext]'
            },
            {
　　　　　　    test: /\.(png|jpg)$/,
    　　　　　　loader: 'url-loader?limit=1000&name=images/[hash:8].[name].[ext]'
    　　　　},
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            // 使用暴露全局加载器来暴露压缩版的 React JS
            // {
            //     test: path.resolve(node_modules_dir, 'react'),
            //     loader: "expose?React"
            // }
        ]
        
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require']
                //以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
            },
            compress: {
                warnings: false //去除警告
            }
        }), // 压缩
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),// 环境部署
        new webpack.optimize.CommonsChunkPlugin('common', "common.min.js"), //提取多个页面之间的公共模块
        new webpack.BannerPlugin( TIME.toLocaleString() + ' , zhouxinjian'), // 头部注释
        new ExtractTextPlugin("main.min.css"),
        // new HtmlWebpackPlugin({
        //     title: 'App',
        //     filename: 'index.html'
        // }) // html文件配置

        //全局引入，避免每个页面重复书写
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // })

    ],
    resolve: {
        //查找module路径
        root: path.resolve(__dirname),
        //后缀名自动补全，即require模块可以省略不写后缀名
        extensions: ['', '.jsx', '.js', '.less', '.css'],
        // 模块别名定义，方便后续直接引用别名
        alias: {
            'nav': "common/module/nav",
            'footer': "common/module/footer",
            'loginState': "view/common/loginState"
        }
    }
};