// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import moment from 'moment';
import Composer from '../../components/Composer';
import Post from '../../components/Post';

export default class App extends Component {

    timer = setInterval(() => this.forceUpdate(), 1000);

    render () {
        return (
            <section className = { Styles.app }>
                <h1>Welcome!</h1>
                <p>It is {moment().format('MMMM D h:mm:ss a')}.</p>
                <Composer />
                <Post />
            </section>
        );
    }
}
