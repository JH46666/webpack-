var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');




module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname, './dist ')
    },
    module:{
        rules:[{
            test: /\.css$/,
            // use:['style-loader', 'css-loader'],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use:"css-loader123"
            })
        }]
    },
    plugins:[
        //压缩代码
        new UglifyJsPlugin(),
        // CSS 文件分离出来，构建后目录单独有一个 style.css 文件
        new ExtractTextPlugin('styles.css'),
        //加入html模板任务
        new HtmlWebpackPlugin({
            //模板文件
            template:'src/index.html',
            //打包后文件名称，会自动放到output指定的dist目录
            filename:'index.html'
        }),
        //复制图片资源
        new CopyWebpackPlugin([{
            from: __dirname + '/src/images',
            to: './images',
        }]),
        //清除build后的文件
        new CleanWebpackPlugin(['dist'],{
           "root":__dirname,//一个根的绝对路径.
            "verbose": true,//将log写到 console.
            "dry": false,//不要删除任何东西，主要用于测试.
            "exclude": ["files","to","ignore"]//排除不删除的目录，主要用于避免删除公用的文件
        }),

    ]
}