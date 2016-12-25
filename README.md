# browser-sync_webpack_demo

说明：  
1.在项目目录运行命令：webpack -w，会复制src/index.html文件,src/html文件夹下的文件到build下，并监控src下内容的变化；因此在src下编辑相应的文件。  
2.在项目目录运行命令：webpack -w，会打开webpack.config.js中设置的baseDir目录下的index.html。若访问其他文件，需要自己补充网址。例如：http://localhost:3000/html/[filename].html
