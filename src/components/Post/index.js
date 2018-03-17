import React, { Component, Fragment } from 'react';

import post from '../../theme/assets/post.png';
import moment from 'moment';
import Styles from './styles.scss'

export default class Post extends Component {
  render(){
    return (
      <section className={Styles.post}>
        <img alt="post" src={ post } />
        <a>Oksana</a>
        <time>{moment().format('MMMM D h:mm:ss a')}</time>
        <p>Пора на обед!</p>
        <span className={Styles.cross} />
      </section>
    )
  }
}