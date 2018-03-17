import React, { Component, Fragment } from 'react';

import post from '../../theme/assets/post.png';
import moment from 'moment';

export default class Post extends Component {
  render(){
    return (
      <Fragment>
        <img alt="post" src={ post } />
        <br/>
        <a>Oksana</a>
        <br/>
        <time>{moment().format('MMMM D h:mm:ss a')}</time>
        <p>Пора на обед!</p>
      </Fragment>
    )
  }
}