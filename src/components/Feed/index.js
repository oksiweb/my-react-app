import React, { Component } from 'react';
import { string } from 'prop-types';

import Composer from '../../components/Composer';
import Post from '../../components/Post';
import { getUniqueID } from '../../helpers';

import Catcher from '../Catcher';

export default class Feed extends Component {
    static propTypes = {
        avatar: string.isRequired,
        firstName: string.isRequired,
        lastName: string.isRequired
    };

    state = {
        posts: []
    };

    _createPost = (c) => {
        this.setState(({ posts }) => ({
            posts: [
                {
                    id: getUniqueID(),
                    comment: c
                },
                ...posts
            ]
        }));
    };

    _deletePost = (id) => {
        this.setState(({ posts }) => ({
            posts: posts.filter((post) => post.id !== id)
        }));
    };

    componentDidUpdate(){
        console.log('------->componentDidUpdate');
    }

    componentWillUpdate(){
        console.log('------->componentWillUpdate');
    }

    componentDidMount(){
        console.log('------->componentDidMount');
    }

    componentWillMount(){
        console.log('------->componentWillMount');
    }

    render() {
        console.log('render');
        const { avatar, firstName, lastName } = this.props;
        const { posts: postData } = this.state;

        const posts = postData.map(post => (
            <Catcher  key = {post.id}>
                <Post
                    avatar = {avatar}
                    comment = {post.comment}
                    deletePost = {this._deletePost}
                    firstName = {post.firstName}
                    id = {post.id}
                    lastName = {lastName}
                />
            </Catcher>
        ));

        return (
            <section>
                <Composer
                    avatar={avatar}
                    firstName={firstName}
                    createPost={this._createPost}
                />
                    {posts}
            </section>
        );
    }
}
