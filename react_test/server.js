/**
 * Created by jwdn on 2016/12/7.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var bodyParser = require('body-parser');
var fs = require('fs');

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  stats: {
    color: require('supports-color')
  }
});

var dataurl = __dirname + '/data.json';
var {app} = server;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
/*express项目中通常使用body-parser进行post参数的解析，
最常用的是其中的json和urlencoded的parser，
可分别对以JSON格式的post参数和urlencoeded的post参数进行解析，
均可获得一个JSON化的req.body，*/

app.get('/api/list',function(req,res) {
  res.sendFile(dataurl);
});

app.get('/api/del/:id',function(req,res) {
  fs.readFile(dataurl,'utf-8',function(err,text) {
    if(err){
      return res.json({
        msg: '获取内容失败',
        data: null,
        status: false
      });
    }
    var list = JSON.parse(text);
    //JSON.parse() 方法将一个 JSON字符串解析成一个javascript值。
    //JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串。
    var {id} = req.params;
    for(let i=0;i<list.length;i++) {
      if(list[i].id == id) {
        list.splice(i,1);
        fs.writeFile(dataurl,JSON.stringify(list));
        //保存删除后的文件
        return res.json({
          msg:'删除成功',
          data:null,
          status: true
        })
      }
    }
    return res.json({
      msg:'删除失败，数据不存在',
      data:null,
      status:false
    })
  })
});
/**
 * 修改或新增数据
 */
app.post('/api/edit/:id',function(req,res) {
  fs.readFile(dataurl,'utf-8',function(err,text) {
    if(err){
      return res.json({
        msg: '修改失败',
        data:null,
        status:false
      })
    }

    var list = JSON.parse(text);
    var{id,image,name,age,phone,phrase} = req.body;
    var data = { id,image,name,age,phone,phrase };

    for(let i=0;i<list.length;i++) {
      if(list[i].id==id) {
        list[i] = data;
        fs.writeFile(dataurl,JSON.stringify(list));
        return res.json({
          msg:'修改成功',
          data: data,
          status: true
        })
      }
    }

    //id<0 说明是新增
    if(req.params.id<0) {
      data.id = new Date().getDate();
      list.push(data);
      fs.writeFile(dataurl,JSON.stringify(list));
      return res.json({
        msg:'保存成功',
        data:data,
        status:true
      })
    }else {
      return res.json({
        msg:'操作失败，数据不存在',
        data:null,
        status:false
      })
    }
  })
});

app.listen(3000);