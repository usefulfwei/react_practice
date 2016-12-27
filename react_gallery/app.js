/**
 * Created by jwdn on 2016/12/10.
 */
var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PROT || 1337

app.use(express.static(path.join(__dirname,'')))

app.use(function(req,res,next) {
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  next()
})

app.get('*',function(req,res) {
  res.sendFile(path.join(__dirname,'index.html'))
})

app.listen(port,function() {
  console.log('is running on 1337')
})