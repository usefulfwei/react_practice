/**
 * Created by jwdn on 2016/12/9.
 */
import React from 'react';
import ImageFigure from './ImageFigure';

export  default class Controller extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {

  }
  render(){
    var {items,imageArrInfo} = this.props;
    var images = items.map(function(item,index) {
      return (
          <ImageFigure key={index} src={item.imageURL} info={imageArrInfo[index]} alt="图片似乎出了点问题" />
      )
    })
    return (
        <div className="controller">
          <a href="javascript:;" className="pre-controller" onClick={this.props.handlePreControl}>
            <i className="icon-circle-left"></i>
          </a>
          <div className="scroll-bar">
            {images}
          </div>
          <a href="javascript:;" className="next-controller" onClick={this.props.handleNextControl}>
            <i className="icon-circle-right"></i>
          </a>
        </div>
    )
  }
}