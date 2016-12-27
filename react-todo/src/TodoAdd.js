/**
 * Created by jwdn on 2016/12/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';

export default class TodoAdd extends React.Component{
  addEnter(event){
      if(event.keyCode === 13)//13就是enter键
      {
        console.log('addEnter13');
        this.addOne();
      }
  }
  addClick(){
    this.addOne();
  }
  addOne(){
      // let task = this.refs.inputTask.value.val();
      let task = ReactDOM.findDOMNode(this.refs.inputTask).value;
      if(!task) return;
      let newTask = {
        task: task,
        isDone: false
      }
      this.props.addTask(newTask);
      ReactDOM.findDOMNode(this.refs.inputTask).value='';
      ReactDOM.findDOMNode(this.refs.inputTask).focus();
  }
    render(){
        return(
            <div className="todo-add">
                <input type="text" ref="inputTask" onKeyUp={this.addEnter.bind(this)} placeholder="输入任务，enter键/新增"/>
                <a href="javascript:;" onClick={this.addClick.bind(this)}>新增</a>
            </div>
        )
    }
}