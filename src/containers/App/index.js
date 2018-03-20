// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Styles from './styles.scss';

import Feed from '../../components/Feed';
import Catcher from '../../components/Catcher';

import avatar from '../../theme/assets/lisa.png';

const options = {
    firstName: 'Барило',
    lastName:  'Оксана',
    avatar,
    api:       'https://lab.lectrum.io/react/api/1fwfsc9M9A',
    token:     '5b9jrxnzx4'
};

export default class App extends Component {
    static childContextTypes = {
        api:       string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired,
        avatar:    string.isRequired,
        token:     string.isRequired,
        avatar:    string.isRequired
    };

    getChildContext () {
        return options;
    }

    render () {
        return (
            <section className = { Styles.app }>
                <Catcher>
                    <Feed { ...options } />
                </Catcher>
            </section>
        );
    }
}
