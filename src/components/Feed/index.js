import React, { Component } from 'react';
import { string, number } from 'prop-types';
import io from 'socket.io-client';

import Composer from '../../components/Composer';
import Counter from '../../components/Counter';
import Spinner from '../../components/Spinner';
import Post from '../../components/Post';
//import { getUniqueID } from '../../helpers';

import Catcher from '../Catcher';

export default class Feed extends Component {
    static contextTypes = {
        api:   string.isRequired,
        token: string.isRequired
    };

    static propTypes = {
        avatar:    string.isRequired,
        count:     number,
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    state = {
        posts:      [],
        isFetching: false
    };

    componentDidMount () {
        const socket = io('https://lab.lectrum.io/', {
            path: '/react/ws'
        });

        socket.on('connect', () => {
            console.log(`socket ${socket.id}`);
        });

        socket.on('disconnect', () => {
            console.error(`socket disconect ${socket.id}`);
        });

        socket.emit('join', '1fwfsc9M9A');

        socket.on('join_error', (message) => {
            console.error(JSON.parse(message));
        });

        socket.on('create', (data) => {
            const post = JSON.parse(data).data;

            this.setState(({ posts }) => ({
                posts: [post, ...posts]
            }));
        });

        this.getData();
    }

    _startFetch = () => {
        this.setState({
            isFetching: true
        });
    };

    _stopFetch = () => {
        this.setState({
            isFetching: false
        });
    };

    getData = () => {
        const { api } = this.context;

        this._startFetch();

        fetch(api, {
            method: 'GET'
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error();
                }

                return response.json();
            })
            .then(({ data }) => {
                this.setState(() => ({
                    posts: data
                }));
                this._stopFetch();
            })
            .catch((e) => {
                this._stopFetch();
                console.error(e.message);
            });
    };

    _createPost = (comment) => {
        const { api, token } = this.context;

        fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  token
            },
            body: JSON.stringify({ comment })
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error();
                }

                return response.json();
            })
            .catch((e) => console.error(e.message));
    };

    _deletePost = (id) => {
        this.setState(({ posts }) => ({
            posts: posts.filter((post) => post.id !== id)
        }));
    };

    render () {
        console.log('render');
        const { avatar, firstName, lastName } = this.props;
        const { posts: postData, isFetching } = this.state;
        const count = postData.length;

        const postsList = postData.map((post) => (
            <Catcher key = { post.id }>
                <Post
                    avatar = { avatar }
                    comment = { post.comment }
                    deletePost = { this._deletePost }
                    firstName = { post.firstName }
                    id = { post.id }
                    created = { post.created }
                    lastName = { post.lastName }
                />
            </Catcher>
        ));

        return (
            <section>
                <Spinner isFetching = { isFetching } />
                <Composer
                    avatar = { avatar }
                    createPost = { this._createPost }
                    firstName = { firstName }
                />
                <Counter count = { count } />
                {postsList}
            </section>
        );
    }
}
