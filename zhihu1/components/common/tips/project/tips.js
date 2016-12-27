/**
 * Created by jwdn on 2016/12/8.
 */
import React from 'react';
import { Link } from 'react-router';
import styles from './tips.css';
import commonCss from '../../../common.css';
import cx from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const TipsProjectCard = React.createClass({
  componentDidMount() {
    console.log('didmount');
  },
  HandlerShowDom: function(isShow) {
    console.log(isShow);
    if (this.props.isShow) {
      return (
          <div key="456" className={styles['tips-wrap']}>
            <span className={styles['triangle-up']}></span>
            <span className={styles['triangle-up2']}></span>
            <div className={styles['tips-content']}>
              <div className={styles['up']}>
                <div className={styles['avatar']}>
                  <img src="http://qzapp.qlogo.cn/qzapp/101253342/2FEE87B83611201A90A846486B3C6917/50"></img>
                </div>
                <div className={styles['description']}>
                  <a className={styles['name']}>恋爱</a>
                  <div className={styles['content']}>
                    电影是一种视听媒介，利用胶卷、录像带或数位媒体将影像和声音捕捉，再加上后期的编辑工作而成。
                  </div>
                </div>
              </div>
              <div className={styles['down']}>
                <a>
                  <span>5959</span>
                  <span className={styles['tag']}>关注</span>
                </a>
                <a className={styles['tag-second']}>
                  <span>999</span>
                  <span className={styles['tag']}>精华</span>
                </a>
                <a>
                  <span>47K</span>
                  <span className={styles['tag']}>关注者</span>
                </a>
                <div className={styles['focus-btn-wrap']}>
                  <button className={cx(styles['focus-btn'],commonCss['base-btn'])}>关注</button>
                </div>
              </div>
            </div>
          </div>
      )
    } else {
      return (
          <span key="123"></span>
      )
    }
  },
  render: function() {
    let self = this;
    return (
        <div>
          <ReactCSSTransitionGroup transitionName="example">
            {
              self.HandlerShowDom(self.props.isShow)
            }
          </ReactCSSTransitionGroup>
        </div>
    )
  }
})

export default TipsProjectCard;