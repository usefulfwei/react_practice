/**
 * Created by jwdn on 2016/12/10.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  header: {
    'Access-Control-Allow-Origin': '*'
  }
}).listen(3000,'localhost',function(err,result) {
  if(err) {
    return console.log(err)
  }
  console.log('Listen at http://localhost:3000')
});