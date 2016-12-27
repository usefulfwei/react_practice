/**
 * Created by jwdn on 2016/12/25.
 */
'use strict';

import React from 'react';
import TodoItem from './TodoItem'

export default class TodoMain extends React.Component {
  // 遍历显示任务，转发props
  render(){
    return (
      <ul className="todo-list">
        {this.props.todos.map((todo,index)=>{
          return <TodoItem key={index} {...todo} index={index} {...this.props}/>
        })}
      </ul>
    )
  }
}