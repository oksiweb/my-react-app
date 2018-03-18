// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Styles from './styles.scss';

import Feed from '../../components/Feed';

import avatar from '../../theme/assets/lisa.png';

const options = {
    firstName: 'Oksana',
    lastName:  'Barylo',
    avatar
};

export default class App extends Component {

    static childContextTypes = {
        firstName: string.isRequired
    };

    getChildContext() {
        return {
            firstName: options.firstName
        };
    }

    render () {
        return (
            <section className = { Styles.app }>
                <Feed { ...options } />
            </section>
        );
    }
}
