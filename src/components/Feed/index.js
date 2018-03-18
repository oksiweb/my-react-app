import React, { Component } from 'react';
import { string } from 'prop-types';

import Composer from '../../components/Composer';
import Post from '../../components/Post';
import { getUniqueID } from '../../helpers';

import Catcher from '../Catcher';

export default class Feed extends Component {

    static contextTypes = {
        api: string.isRequired,
        token: string.isRequired
    }

    static propTypes = {
        avatar: string.isRequired,
        firstName: string.isRequired,
        lastName: string.isRequired
    };

    state = {
        posts: []
    };

    getData = () => {
        const { api} = this.context;
        fetch(api, {
            method:  'GET'
        }).then((response) => {
            if (response.status !== 200){
                throw new Error();
            }

            return response.json();
        }).then(({ data }) => {
            this.setState(({ posts }) => ({
                posts: [
                    ...data,
                    ...posts
                ]
            }));
        }).catch(e => console.error(e.message));
    }

    componentDidMount(){
        this.getData();
    }

    _createPost = (comment) => {
        const { api, token } = this.context;
        fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': token
            },
            body: JSON.stringify({comment})
        }).then((response) => {
            if (response.status !== 200){
                throw new Error();
            }

            return response.json();
        }).then(({ data }) => {
            this.setState(({ posts }) => ({
                posts: [
                    ...data,
                    ...posts
                ]
            }));
        }).catch(e => console.error(e.message));
    };

    _deletePost = (id) => {
        this.setState(({ posts }) => ({
            posts: posts.filter((post) => post.id !== id)
        }));
    };

    render() {
        console.log('render');
        const { avatar, firstName, lastName } = this.props;
        const { posts: postData } = this.state;

        const postsList = postData.map(post => (
            <Catcher  key = {post.id}>
                <Post
                    avatar = {avatar}
                    comment = {post.comment}
                    deletePost = {this._deletePost}
                    firstName = {post.firstName}
                    id = {post.id}
                    created = {post.created}
                    lastName = {post.lastName}
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
                    {postsList}
            </section>
        );
    }
}
