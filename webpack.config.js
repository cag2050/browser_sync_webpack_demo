/**
 * Created by chenanguo on 16/12/25.
 */
var fs = require("fs"),
    path = require("path");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

// 获得文件夹下的js文件
var getJsFiles = function () {
    var jsPath = path.resolve("src/js-css");
    var dirs = fs.readdirSync(jsPath);
    var matchs = [],
        files = {},
        all = [];
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        var _path = '';
        if (matchs) {
            _path = path.resolve("src/js-css", item);
            files[matchs[1]] = _path;
            all.push(_path);
        }
    });
    return files;
};
var config = {
    entry: getJsFiles(),
    output: {
        path: path.join(__dirname, "build/js-css"), //文件输出目录
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            },
            {test: /\.(png|jpg)$/, loader: 'url'},
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        // 配置browser-sync
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: './build',
            server: {
                baseDir: './build'
            }
        }),
        // 复制src/index.html,src/html和src/css文件夹下的文件到build
        new CopyPlugin([
            {
                from: __dirname + '/src/index.html',
                to: __dirname + '/build/index.html'
            },
            {
                from: __dirname + '/src/html',
                to: __dirname + '/build/html'
            }
        ]),
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("[name].css")
    ]
};

module.exports = config;