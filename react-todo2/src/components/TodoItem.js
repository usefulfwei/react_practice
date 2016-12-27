/**
 * Created by jwdn on 2016/12/25.
 */
'use strict';
import React from 'react'
export default class TodoItem extends React.Component {
  handleMouseOver(){
    React.findDOMNode(this.refs.deleteBtn).style.display = 'inline'
  }
  handleMouseOut(){
    React.findDOMNode(this.refs.deleteBtn).style.display = 'none'
  }
  handleChange(){
    let isDone = !this.props.isDone;
    this.props.changeTodoState(this.props,index,isDone)
  }
  handleDelete(){
    this.props.deleteTodo(this.props.index)
  }
  render(){
    let doneStyle = this.props.isDone ? {textDecoration:'line-through'} : {textDecoration:"none"}

    return (
      <li
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
      >
        <input type="checkbox" checked={this.props.isDone} onChange={this.handleChange.bind(this)}/>
        <span style={doneStyle}>this.props.text</span>
        <button ref="deleteBtn" onClick={this.handleDelete.bind(this)} style={{'display':'none'}} className="fr">delete</button>
      </li>
    )
  }
}