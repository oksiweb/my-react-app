import React, { Component, Fragment } from 'react';
import { string, func, number } from 'prop-types';

import moment from 'moment';
import Styles from './styles.scss';

export default class Post extends Component {
    static propTypes = {
        avatar: string.isRequired,
        comment: string.isRequired,
        deletePost: func.isRequired,
        id: string.isRequired,
        lastName: string.isRequired,
        created: number.isRequired
    };

    static contextTypes = {
        firstName: string.isRequired
    };

    _deletePost = () => {
        const {deletePost, id} = this.props;
        deletePost(id)
    }

    componentWillUnmount() {
        console.log('=======>componentWillUnmount');
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
        return false;
    }

    render() {
        const { avatar,
            firstName,
            lastName,
            created,
            comment } = this.props;

        return (
            <section className={Styles.post}>
                <img alt="post" src={avatar} />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment.unix(created).format("MMMM D h:mm:ss a")}</time>
                <p>{comment}</p>
                <span onClick={this._deletePost} className={Styles.cross} />
            </section>
        );
    }
}
