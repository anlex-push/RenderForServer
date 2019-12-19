/**
 * 
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const publicPath = '/';
const buildPath = 'build';
//引入了html-webpack-plugin模块来构建动态的html页面7

module.exports={
    //js入口文件我们默认以多入口为例子，其他用法可以关注我的文章后续会发出来
    entry:{
        index:'./frame/index.js',
        base:'./frame/base.js'
    },
    //打包输出的js文件位置［name］会按照模块的名称自动生成两个js文件
    output:{
        //这里没有使用 path模块来构建目录的路径有需要的可以单独修改
        path:path.resolve(__dirname, 'build'),//__dirname+'/build'
        filename:'js/[name].js',//[name]-bundle.js
        //publicPath非常重要它可以放置页面的依赖关系在生成之后出现路径问题'http://localhost:3000'
        //publicPath:publicPath
    },

    //html页面扩展
    plugins:[
        new HtmlWebpackPlugin({

            //这个是根据哪个页面模版来打包文件
            template:'./frame/index.html',
            //这个是生成的html文件名，我们把它直接放在views中覆盖原有的欢迎页面
            filename:'index.html',//./views/index.html
            //chunks代表当前页面需要引入上述哪个依赖文件，我们直接将两个都引入
            //chunks:['index']
        }),
        new HtmlWebpackPlugin({

            //这个是根据哪个页面模版来打包文件
            template:'./frame/index.html',
            //这个是生成的html文件名，我们把它直接放在views中覆盖原有的欢迎页面
            filename:'base.html',//./views/index.html
            //chunks代表当前页面需要引入上述哪个依赖文件，我们直接将两个都引入
            chunks:['base']
        })
    ],

    //loader加载器
    module:{
        /*rules: [ //配置加载器 旧版用loaders
            {
                test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
                loader: 'babel-loader', //使用的加载器名称
                query: { //babel的配置参数，可以写在.babelrc文件里也可以写在这里
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.css/,
                loader: 'style-loader!css-loader'
            },
            {
                test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 10000, //1w字节以下大小的图片会自动转成base64
                },
            }


        ],*/
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react'],
                },
            },
        },
            {   //css加载器
                test:/\.css$/,
                loader:'style-loader!css-loader'
            }],



        // webpack版本不同，写法不同  rules和loaders
        /*rules:[
            {   //css加载器
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.js/,
                loader:'babel-loader'
            },
            {   //html加载器（html－webpack－plugin默认以ejs加载页面防止报错我们需要html加载器）
                test:/\.html$/,
                loader:'html-loader'
            }
        ]*/
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    resolveLoader: {
        modules: ['node_modules', 'bower_components'],
    }

}