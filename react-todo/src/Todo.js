import React from 'react';
import ReactDOM from 'react-dom';

import todoDb from './todoDb';
import TodoSearch from './TodoSearch';
import TodoMain from './TodoMain';
import TodoAdd from './TodoAdd';

import './todo.scss';

class Todo extends React.Component {
    constructor(props) {
        super();
        //初始化实例，localStorage命名为todoDb
        this.todoDb = new todoDb('todoDb');
        this.state = {
            tasks: this.todoDb.get() || [],
            isAllDone:false
        }
    }
    addTask(newTask) {
        this.state.tasks.unshift(newTask);
        this.todoDb.set(this.state.tasks);
        this.setState({
            tasks: this.state.tasks,
            isAllDone: false
        })
    }
    deleteTask(index) {
        this.state.tasks.splice(index,1);
        this.todoDb.set(this.state.tasks);
        this.setState({
            tasks: this.state.tasks,
            isAllDone: false
        })
    }
    changeDone(index,isDone){
        this.state.tasks[index].isDone = isDone;
        this.todoDb.set(this.state.tasks);
        this.setState({
            tasks: this.state.tasks,
            isAllDone: false
        })
    }
    deleteDone(){
        let tasks = this.todoDb.get().filter(task=> !task.isDone);
        this.state.tasks = tasks;
        this.todoDb.set(this.state.tasks);
        this.setState({
            tasks: this.state.tasks,
            isAllDone: false
        })
    }
    searchTasks(val) {
        let searchResult = this.todoDb.get().filter((tasks) => tasks.task.includes(val));
        this.state.tasks = searchResult;
        this.setState({
            tasks: this.state.tasks,
            isAllDone: false
        })
    }
    render() {
      var count = {
        countAll: this.state.tasks.length || 0,
        countDone: (this.state.tasks && this.state.tasks.filter((task) => task.isDone)).length || 0
      }
        return(
            <div className="todo-cont">
                <TodoSearch searchTasks={this.searchTasks.bind(this)}/>
                <TodoMain tasks={this.state.tasks} deleteTask={this.deleteTask.bind(this)} changeDone={this.changeDone.bind(this)} deleteDone={this.deleteDone.bind(this)}/>
                <TodoAdd addTask={this.addTask.bind(this)}/>
            </div>
        )
    }
}

ReactDOM.render(<Todo />,document.getElementById('content'));

