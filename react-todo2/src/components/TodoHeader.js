/**
 * Created by jwdn on 2016/12/25.
 */
'use strict';

// import React from 'react';
import React from "react";
class TodoHeader extends React.Component {
  handleKeyUp(e){
    if(e.keyCode === 13){
      let value = e.target.value;
      if(!value) return false

      let newTodoItem = {
        text: value,
        isDone: false
      };
      e.target.value = " ";
      this.props.addTodo(newTodoItem)
    }
  }
  render(){
    return (
      <div className="panel-header">
        <input type="text" onKeyUp={this.handleKeyUp.bind(this)}/>
      </div>
    )
  }
}