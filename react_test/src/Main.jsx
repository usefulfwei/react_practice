/**
 * Created by jwdn on 2016/12/7.
 */

import 'flex.css/dist/data-flex.css';
import './less/common.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';

import App from './App.jsx';

render(<App />, document.body.appendChild(document.createElement('div')));
//ReactDOM.render(<App />, document.body.appendChild(document.createElement('div')));