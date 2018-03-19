import React, { Component, Fragment } from 'react';
import { string, func, number } from 'prop-types';

import moment from 'moment';
import Styles from './styles.scss';

export default class Post extends Component {
    static propTypes = {
        avatar:     string.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        deletePost: func.isRequired,
        id:         string.isRequired,
        lastName:   string.isRequired
    };

    static contextTypes = {
        firstName: string.isRequired
    };

    _deletePost = () => {
        const { deletePost, id } = this.props;

        deletePost(id);
    };

    render () {
        const { avatar, firstName, lastName, created, comment } = this.props;

        return (
            <section className = { Styles.post }>
                <img alt = 'post' src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>
                    {comment.substring(0, 4) === 'http' ? (
                        <img src = { comment } alt = '' />
                    ) : (
                        <span>{comment}</span>
                    )}
                </p>
                <span className = { Styles.cross } onClick = { this._deletePost } />
            </section>
        );
    }
}
