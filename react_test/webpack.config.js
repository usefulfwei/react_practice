/**
 * Created by jwdn on 2016/12/6.
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');
//生成html
var folderName = process.env.npm_lifecycle_event;
//获取当前执行的命令，编译到对应的目录

var plugins = [];

if(process.argv.indexOf('-p')>-1){
  //匹配到了-p 生产环境
  {
    //编译出生产版本
    plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }))
  }
}

plugins.push(new ExtractTextPlugin('[name].css'));//css单独打包

plugins.push(new HtmlWebpackPlugin({
  //根据模板插入css/js等生成最终HTML
  filename: './index.html',
  template: './src/template/index.html',
  hash:true, //为静态资源生成hash值
}));

module.exports = {
  entry: {
    app: './src/Main.jsx',//入口文件
  },
  output: {
    publicPath: '/dist/',
    path: __dirname + '/dist/',
    filename:'[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /^node_modules$/,
        loader: 'babel?presets=es2015'
      },{
        test: /\.css$/,
        exclude: /^node_modules$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
      }, {
        test: /\.less/,
        exclude: /^node_modules$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
      }, {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        exclude: /^node_modules$/,
        loader: 'file-loader?name=[name].[ext]'
      }, {
        test: /\.(png|jpg)$/,
        exclude: /^node_modules$/,
        loader: 'url?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
      }, {
        test: /\.jsx$/,
        exclude: /^node_modules$/,
        loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
      }
    ]
  },
  plugins: plugins,
  resolve: {
    extension: ['','js','jsx','json'],//后缀名自动补全
  }
}