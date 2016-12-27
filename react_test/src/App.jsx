/**
 * Created by jwdn on 2016/12/6.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';

/**
 * 转化数据
 *
 * @param {Object} data
 * @returns String
 */

function formData(data) {
  var arr = [];
  for(let key in data) {
    arr.push(`${key} = ${data[key]}`);
  }
  return arr.join('&');
}

export default class App extends Component {
  render() {
    return (
        <div>
          <div className="search" data-flex="main:center">
            <div>
              <input type="text" placeholder="支持全属性匹配搜索" onChange={this.searchName}/>
            </div>
          </div>
          <table className="table">
            <thead>
            <tr>
              <th>id</th>
              <th>photo</th>
              <th>name</th>
              <th>
                age(<a href="javescript:;" onClick={this.sortMax}>大</a> | <a href="javescript:;" onClick={this.sortMin}>小</a>)
              </th>
              <th>phone</th>
              <th>sign</th>
              <th>operation</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.list.map((item) => {
                return <List item={item} key={item.id} editItem={this.editItem} updataItem={this.updataItem} delItem={this.delItem}/>
              })
            }
            </tbody>
          </table>
          <div data-flex="main:center">
            <button className="adddata" onClick={this.addItem}>添加数据</button>
          </div>
        </div>
    )
  }
  constructor(props) {
    super(props);
    this.state = {
      list:[]//列表的数据
    };
    /*
     * searchName*/
    this.searchName = (e) => {
      var name = e.target.value;
      var {list} = this.state;
      //exec	检索字符串中指定的值。返回找到的值，并确定其位置。
      //new RegExp(pattern, attributes);
      //参数 pattern 是一个字符串，指定了正则表达式的模式或其他正则表达式。
      // new Boolean(value);	//构造函数
      // Boolean(value);		//转换函数
      list.map((item)=>{
        for(let key in item) {
          if(Boolean(new RegExp(name).exec(item[key]+''))) {
            return item.display = '';//匹配到了就显示
          }
        }
        item.display = 'none';
      });
      this.setState({list});
    };
    this.editItem = (data) => {
      var {list} = this.state;
      for(let i=0;i<list.length;i++) {
        if(list[i].id==data.id) {
          let { editState = true } = list[i];//获取该item中editState的值
          list[i].editState = !editState;/*取反*/
          return this.setState({list});
        }
      }
    };
    /*
     * 更新数据*/
    this.updataItem = (data) => {
      var {list} = this.state;
      for(let i=0;i<list.length;i++) {
        if(list[i].id == data.id) {
          list[i] = data;
          break;
        }
      }
      this.setState({list});
      fetch(`/api/edit/${data.id}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
//application/x-www-form-urlencoded是常用的表单发包方式，普通的表单提交，或者js发包，默认都是通过这种方式，
        },
        body:formData(data)
      }).then((res)=> {
            return res.json();
          })
        .then((res) => {
        alert(res.msg);//更新成功
        if(res.data) {
          data.id = res.data.id;
          this.setState({list});
        }
      }).catch((e)=>{
        alert('更新失败');
      })
    };

    this.delItem = (data) => {
      var {list} = this.state;
      for(let i=0; i< list.length;i++) {
        if(list[i].id == data.id) {
//arrayObject.splice(index,howmany,item1,.....,itemX)
//index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
//howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
            list.splice(i,1);
            break;
        }
      }
      this.setState({list});
      if(data.id>0) {
        /* fetch() 必须接受一个参数——资源的路径。
         无论请求成功与否，它都返回一个 promise 对象，
         resolve 对应请求的 Response。*/
        fetch(`/api/del/${data.id}`)
            .then((res)=>{
              return res.json();
            })
            .then((res)=>{
              alert(res.msg);//删除成功
            })
            .catch((e)=>{
              alert('删除失败');
            })
      }
    }

    var aid = 0;

    /*
     * 添加项目*/
    this.addItem = () => {
      var {list} = this.state;

      list.push({
        id:--aid, //-1
//添加时，必须保证唯一id，否则会报错，等用户保存时，
// 如果id < 0 则需要向服务器发送请求保存，保存成功后，
// 服务器返回id后将id再更新
        image:'http://localhost:3000/images/4.jpg',
        name:'',
        age:'18',
        phone:'',
        phrase:'',
        display:'',
        editState:false
      });
      this.setState({list});
    };

    this.sortMax = ()=>{
      var {list} = this.state;
      list.sort((o1,o2) => o1.age < o2.age ? 1 : -1);
      // 1 从大到小排列
      this.setState({list});
    };

    this.sortMin = ()=>{
      var {list} = this.state;
      list.sort((o1,o2) => o1.age > o2.age ? 1 : -1);
      this.setState({list});
    };
    /*
     *
     * var numbers = [4, 2, 5, 1, 3];
     numbers.sort(function(a, b) {
     return a - b;
     });
     a<b minus a b  从小到大 与原顺序相同 同向排序
     a>b +  b a  与原顺序相反 反向排序
     console.log(numbers);

     // [1, 2, 3, 4, 5]
     */
  }
  componentDidMount() {
    fetch('/api/list')
        .then((res)=>{
          return res.json();
        })
        .then((list)=> {
          this.setState({ list })
        })
        .catch((e)=>{
          alert('加载失败，请稍后重试！');
        })
  }
}

class List extends Component {
  render() {
    var {id,image,name,age,phone,phrase,display,editState = true} = this.props.item;
    var btnname = editState ? '修改' : '保存';
    return (
        <tr style={{display}}>
          <td>{ id>0 ? id : ''}</td>
          <td>
            <img className="headimg" src={image} alt=""/>
          </td>
          <td>
            <input type="text" disabled={editState} ref="name" defaultValue={name}/>
          </td>
          <td>
            <input type="number" disabled={editState} ref="age" defaultValue={age}/>
          </td>
          <td>
            <input type="tel" disabled={editState} ref="phone" defaultValue={phone}/>
          </td>
          <td>
            <textarea ref="phrase" defaultValue={phrase} disabled={editState} />
          </td>
          <td>
            <button onClick={this.editItem}>{btnname}</button>
            <button onClick={()=>this.props.delItem(this.props.item)}>删除</button>
          </td>
        </tr>
    )
  }
  constructor(props) {
    super(props);

    this.editItem = () => {
      var {id,image,editState = true,editItem} = this.props.item;
      /*这里是把item当中的属性传给一个object editState 因为是布尔值所以先写出来*/
      if(editState) {
        this.props.editItem(this.props.item);
      }else{
        let name = this.refs.name.value;
        let age = parseInt(this.refs.age.value);
        let phone = this.refs.phone.value;
        let phrase = this.refs.phrase.value;

        if(!name){
          return alert('姓名不能为空')
        }else if(!age || age <0) {
          return alert('年龄不合法')
        }else if(!/^\d+$/.test(phone)) {
          return alert('手机号码不合法');
        }

        this.props.updataItem({id,image,name,age,phone,phrase,editState:true})
      }
    }
  }
}

List.propTypes = {
  item: PropTypes.object,
  editItem: PropTypes.func,
  updataItem: PropTypes.func,
  delItem: PropTypes.func
};
List.defaultProps = {
  item: {}
};