/**
 * Created by jwdn on 2016/12/8.
 */
import React from 'react';
import { Link } from 'react-router';
import styles from './navigation.css';
import commonCss from './common.css';
import cx from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ProfileDropdown = React.createClass({
  getInitialState: function() {
    return {
      dropdownIsShow: this.props.isShow
    }
  },
  render: function() {
    if(this.props.isShow) {
      return (
          <ul className={cx(styles['header-nav-profile-dropdown']) }>
            <li><a><i className={cx(styles['icon-home']) }></i>我的主页</a></li>
            <li><a><i className={cx(styles['private-message']) }></i>私信</a></li>
            <li><a><i className={cx(styles['profile-setting']) }></i>设置</a></li>
            <li><a><i className={cx(styles['profile-exit']) }></i>退出</a></li>
          </ul>
      )
    }else {
      return (<div></div>)
    }
  }
});

const Navigation = React.createClass({
  getInitialState: function() {
    return {
      dropdownIsShow:false
    }
  },
  handleProfileHover: function() {
    this.setState({
      dropdownIsShow: true
    })
  },
  handleProfileOut: function() {
    this.setState({
      dropdownIsShow: false
    })
  },
  render: function() {
    return (
        <div className={cx(styles['header-wrap']) }>
          <div className={cx(styles['header-content']) }>
            <a className={cx(styles['header-brand']) }></a>
            <div className={cx(styles['header-nav-content']) }>
              <ul>
                <li className={cx(styles['header-nav-li-selected']) }><a>首页</a></li>
                <li><a>话题</a></li>
                <li><a>发现</a></li>
                <li><a>消息</a></li>
              </ul>
            </div>

            <div className={cx(styles['header-nav-user-profile'])} onMouseLeave={this.handleProfileOut} onMouseEnter={this.handleProfileHover}>
              <img className={cx(styles['header-nav-user-profile-avatar'])} src="http://7xqokn.com1.z0.glb.clouddn.com/1/test1"/>
              <span className={cx(styles['header-nav-user-profile-name'])}>bugall</span>
              <ProfileDropdown isShow={this.state.dropdownIsShow}/>
            </div>
            <div className={cx(styles['header-nav-button'])}>
              <button className={cx(commonCss['primary-button'])}>提问</button>
            </div>
          </div>
        </div>
    )
  }
})

export default Navigation;