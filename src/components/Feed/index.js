import React, { Component, Fragment } from 'react';
import { string, number } from 'prop-types';
import io from 'socket.io-client';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

import Composer from '../../components/Composer';
import Counter from '../../components/Counter';
import Spinner from '../../components/Spinner';
import Post from '../../components/Post';
import Postman from '../../components/Postman';

//import { getUniqueID } from '../../helpers';
import Styles from './styles.scss';

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
        isFetching: false,
        postman: true
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

        // fetch(api, {
        //     method: 'GET'
        // })
        //     .then((response) => {
        //         if (response.status !== 200) {
        //             throw new Error();
        //         }
        //
        //         return response.json();
        //     })
        //     .then(({ data }) => {
        //         this.setState(() => ({
        //             posts:      data,
        //             isFetching: false
        //         }));
        //         this._stopFetch();
        //     })
        //     .catch((e) => {
        //         this._stopFetch();
        //         console.error(e.message);
        //     });
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

    // _handleComposerAppear = (composer) => {
    //     fromTo(
    //         composer,
    //         1,
    //         {
    //             y:         -200,
    //             x:         500,
    //             opacity:   0,
    //             rotationY: 360
    //         },
    //         {
    //             y:         0,
    //             x:         0,
    //             opacity:   1,
    //             rotationY: 0
    //         }
    //     );
    // }

    // _handleCounterAppear = (counter) => {
    //     fromTo(
    //         counter,
    //         1,
    //         {
    //             x:         -1000,
    //             y:         -300,
    //             opacity:   0,
    //             rotationY: 360
    //         },
    //         {
    //             y:         0,
    //             x:         0,
    //             opacity:   1,
    //             rotationY: 0
    //         }
    //     );
    // }

    _handlePostmanAppear = (postman) => {
        fromTo(
            postman, //анимируемый елемент
            2, // длительность анимации
            {
                x:       500,
                opacity: 0
            },
            {
                x:       0,
                opacity: 1,
                onComplete: () => {
                    setTimeout(() => {
                        this.setState({
                            postman: false
                        })
                    }, 1000)
                }
            }
        );
    }

    _handlePostmanDisappear = (postman) => {
        fromTo(
            postman,
            2,
            {
                x:       0,
                opacity: 1
            },
            {
                x:       500,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
            }
        );
    }

    render () {
        console.log('render');
        const { avatar, firstName, lastName } = this.props;
        const { posts: postData, isFetching, postman } = this.state;
        const count = postData.length;

        const postsList = postData.map((post) => (
            <CSSTransition
                //classNames
                classNames = { {
                    enter:       Styles.postInStart,
                    enterActive: Styles.postInEnd,
                    exit:        Styles.postEndStart,
                    exitActive:  Styles.postEnd
                } }
                key = { post.id }
                timeout = { 700 }>
                <Catcher>
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
            </CSSTransition>
        ));

        return (
            <section className={Styles.feed}>
                <Spinner isFetching = { isFetching } />
                <Transition
                    appear // анимация первоначальное появления
                    in = {postman} // переключатель для onEnter and onExit
                    onEnter = {this._handlePostmanAppear}
                    onExit = {this._handlePostmanDisappear}
                    timeout={ 2000 }>
                    <Postman/>
                </Transition>
                <Composer
                    avatar = { avatar }
                    createPost = { this._createPost }
                    firstName = { firstName }
                />
                <Counter count = { count } />
                <TransitionGroup>
                    {postsList}
                </TransitionGroup>

            </section>
        );
    }
}
