import React, { Component } from 'react';
import { string } from 'prop-types';
import io from 'socket.io-client';

const withState = (Injectable) => {

    class Enchancer extends Component {
        static contextTypes = {
            api:   string.isRequired,
            token: string.isRequired
        };

        state = {
            posts:      [],
            isFetching: false,
            postman:    true
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
                const post = JSON.parse(data);

                this.setState(({ posts }) => ({
                    posts: [post, ...posts]
                }));
            });

            socket.on('remove', (postId) => {
                this.setState(({ posts }) => ({
                    posts:      posts.filter((post) => postId !== post.id),
                    isFetching: false
                }));
            });

            this.getData();
        }

        getData = async () => {
            const { api } = this.context;

            try {
                this._startFetch();
                const response = await fetch(api, {
                    method: 'GET'
                });

                if (response.status !== 200) {
                    throw new Error();
                }
                const { data } = await response.json();

                this.setState(() => ({
                    posts:      data,
                    isFetching: false
                }));
            } catch (e) {
                console.error(message);
                this._stopFetch();
            }
        };

        _likePost = async (id) => {
            const { api, token } = this.props;

            const response = await fetch(`${api}/${id}`, {
                method:  'PUT',
                headers: {
                    Authorization: token
                }
            });

            const { data } = await response.json();

            this.setState(({ posts }) => ({
                posts: posts.map((post) => {
                    if (post.id === id) {
                        return data;
                    }

                    return post;

                })
            }));
        };

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

        _deletePost = async (id) => {
            try {
                this._startFetch();
                const { api, token } = this.context;

                const response = await fetch(`${api}/${id}`, {
                    method:  'DELETE',
                    headers: {
                        Authorization: token
                    }
                });

                if (response.status !== 204) {
                    throw new Error();
                }
            } catch ({ message }) {
                this._stopFetch();
                console.error(message);
            }

            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post.id !== id)
            }));
        };

        render () {
            return (
                <Injectable
                    deletePost = { this._deletePost }
                    likePost = { this._likePost }
                    createPost = { this._createPost }
                    { ...this.state }
                />
            );
        }
    }

    return Enchancer;
};

export default withState;
