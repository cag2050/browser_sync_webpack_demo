/**
 * Created by chenanguo on 16/12/25.
 */
var fs = require("fs"),
    path = require("path");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

// 获得文件夹下的js文件
var getJsFiles = function () {
    var jsPath = path.resolve("src/js");
    var dirs = fs.readdirSync(jsPath);
    var matchs = [],
        files = {},
        all = [];
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        var _path = '';
        if (matchs) {
            _path = path.resolve("src/js", item);
            files[matchs[1]] = _path;
            all.push(_path);
        }
    });
    return files;
};
var config = {
    entry: getJsFiles(),
    output: {
        path: path.join(__dirname, "build/js"), //文件输出目录
        filename: "[name].js"
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
            },
            {
                from: __dirname + '/src/css',
                to: __dirname + '/build/css'
            }
        ])
    ]
};

module.exports = config;