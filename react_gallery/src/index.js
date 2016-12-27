/**
 * Created by jwdn on 2016/12/9.
 */
import React from 'react';
import 'normalize.css';

import Controller from './components/Controller';
import Scene from './components/Scene';

import ReactDom from 'react-dom';

var imageDatas = require('./data/imageDatas.json');

// 利用自执行函数， 将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {
  for(var i=0;i<imageDatasArr.length;i++) {
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('./images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

class GalleryContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageArrInfo:[]
    };
    this.handleCenter = this.handleCenter.bind(this);
    this.handlePreControl = this.handlePreControl.bind(this);
    this.handleNextControl = this.handleNextControl.bind(this);
  }
  handlePreControl() {
    var imageNewInfo = this.state.imageArrInfo;
    var length = imageNewInfo.length;
    var index;
    for(var i=0;i<imageNewInfo.length;i++) {
      if(imageNewInfo[i].active) {
        index = i;
        if(i>0) {
          imageNewInfo[i].active = false;
          imageNewInfo[i-1].active = true;
          break;
        }
      }
    }

    if(index!=length-1&&index!=length-2&&index!=0&&index!=1){
      for(var i=0;i<imageNewInfo.length;i++) {
        imageNewInfo[i].pos.left += 234;
      }
    }

    this.setState({
      imageArrInfo:imageNewInfo
    })
  }

  handleNextControl() {
    var imageNewInfo = this.state.imageArrInfo;
    var index;
    var length = imageNewInfo.length;
    for(var i=0;i<length;i++) {
      if(imageNewInfo[i].active){
        index = i;
        imageNewInfo[i].active = false;
        imageNewInfo[i+1].active = true;
        break;
      }
    }
    if(index!=length&&index!=length-1&&index!=length-2&&index!=0&&index!=1){
      for(var i=0;i<imageNewInfo.length;i++) {
        imageNewInfo[i].pos.left -= 234;
      }
    }
    this.setState({
      imageArrInfo:imageNewInfo
    })
  }
  handleCenter(){

  }
  render() {
    var {imageArrInfo} = this.state;
    console.log(this.state);
    imageDatas.forEach(function(value,index) {
      if(!this.state.imageArrInfo[index]) {
        this.state.imageArrInfo[index] = {
          pos: {
            left: (index-2) * 234 + 10
          },
          active: index == 4
        }
      }
    }.bind(this))

    for(var i=0;i<imageArrInfo.length;i++) {
      if(imageArrInfo[i].active) {
        break;
      }
    }
    return (
      <div className="stage" ref="stage">
        <Scene item={imageDatas[i]}/>
        <Controller items={imageDatas} imageArrInfo={this.state.imageArrInfo} handlePreControl={this.handlePreControl} handleNextControl={this.handleNextControl} handleCenter={this.handleCenter}/>
      </div>
    )
  }
}
ReactDom.render(
    <GalleryContainer />,
    document.querySelector('#content')
)