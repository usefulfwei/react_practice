/**
 * Created by jwdn on 2016/12/25.
 */
'use strict'

// import React from 'react'
import React from "react";
export default class TodoFooter extends React.Component {
  handleAllState(e){
    this.props.changeTodoState(null,e.target.checked,true);
  }
  handleClick(){
    this.props.clearDone();
  }
  render(){
    return (
      <div className="clearfix todo-footer">
        <input type="checkbox" className="f1" checked={this.props.isAllChecked} onChange={this.handleAllState.bind(this)}/>
        <span className="f1">{this.props.todoDoneCount}已完成 / {this.props.todoCount} 总数</span>
        <button onClick={this.handleClick.bind(this)} className="fr">清除已完成</button>
      </div>
    )
  }
}