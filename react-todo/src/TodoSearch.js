/**
 * Created by jwdn on 2016/12/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import todoSearch from './todo-search.png';

export default class TodoSearch extends React.Component{
    searchUp(){
       let val = ReactDOM.findDOMNode(this.refs.inputSearch).value;
       this.props.searchTasks(val);
    }
    searchClick(){
        this.searchUp();
    }
    render(){
        return (
            <div className="todo-search">
                <input type="text" ref="inputSearch" onKeyUp={this.searchUp.bind(this)} placeholder="输入查询，enter键/搜索"/>
                <a href="javascript:;" onClick={this.searchClick.bind(this)}><img src={todoSearch} /></a>
            </div>
        )
    }
}