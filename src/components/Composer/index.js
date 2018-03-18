import React, { Component } from 'react';
import { string } from 'prop-types'

import Styles from './styles.scss';

export default class Composer extends Component {

    static propTypes = {
        avatar: string.isRequired
    };

    render() {
        const { avatar, firstName } = this.props;

        return (
            <section className = {Styles.composer} >
                <img
                    alt = 'lisa'
                    src = { avatar }
                />
                <form>
                    <textarea placeholder = {`What do you think about, ${firstName}?`} />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}