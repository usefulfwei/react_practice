/**
 * Created by jwdn on 2016/12/9.
 */
import React from 'react';

export default class ImageFigure extends React.Component {
  render() {
    var {src,info} = this.props;
    var style = {};

    if(info.pos) {
      style = info.pos
    }
    var imgClass = info.active ? "active" : "";

    return (
        <img src={src} style={style} className={imgClass}/>
    )
  }
}