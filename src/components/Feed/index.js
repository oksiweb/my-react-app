import React, { Component, Fragment } from 'react';
import { string, number } from 'prop-types';
import Styles from './styles.scss';

import {
    CSSTransition,
    TransitionGroup,
    Transition
} from 'react-transition-group';
import { fromTo } from 'gsap';

import Composer from '../../components/Composer';
import Counter from '../../components/Counter';
import Spinner from '../../components/Spinner';
import Post from '../../components/Post';
import withState from '../../components/withState';
import Postman from '../../components/Postman';
import Catcher from '../Catcher';

//import { getUniqueID } from '../../helpers';

@withState
export default class Feed extends Component {
    static contextTypes = {
        avatar:    string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    _handleComposerAppear = (composer) => {
        fromTo(
            composer,
            1, // timer в секундах
            {
                y:         -200,
                x:         500,
                opacity:   0,
                rotationY: 360
            },
            {
                y:         0,
                x:         0,
                opacity:   1,
                rotationY: 0
            }
        );
    };

    _handleCounterAppear = (counter) => {
        fromTo(
            counter,
            1,
            {
                x:         -1000,
                y:         -300,
                opacity:   0,
                rotationY: 360
            },
            {
                y:         0,
                x:         0,
                opacity:   1,
                rotationY: 0
            }
        );
    };

    _handlePostmanAppear = (postman) => {
        fromTo(
            postman, //анимируемый елемент
            2, // длительность анимации
            {
                x:       500,
                opacity: 0
            },
            {
                x:          0,
                opacity:    1,
                onComplete: () => {
                    setTimeout(() => {
                        this.setState({
                            postman: false
                        });
                    }, 1000);
                }
            }
        );
    };

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
                x:       0,
                opacity: 1
            }
        );
    };

    render () {
        const { avatar, firstName, lastName } = this.context;
        const {
            deletePost,
            createPost,
            likePost,
            posts: postData,
            isFetching,
            postman
        } = this.props;
        // const { posts: postData, isFetching, postman } = this.state;
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
                        avatar = { post.avatar }
                        comment = { post.comment }
                        deletePost = { deletePost }
                        firstName = { post.firstName }
                        id = { post.id }
                        created = { post.created }
                        lastName = { post.lastName }
                        likes = { post.likes }
                        likePost = { likePost }
                    />
                </Catcher>
            </CSSTransition>
        ));

        return (
            <section className = { Styles.feed }>
                <Spinner isFetching = { isFetching } />
                <Transition
                    appear // анимация первоначальное появления
                    in = { postman } // переключатель для onEnter and onExit
                    onEnter = { this._handlePostmanAppear }
                    onExit = { this._handlePostmanDisappear }
                    timeout = { 2000 }>
                    <Postman />
                </Transition>
                <Transition
                    appear // анимация первоначальное появления
                    onEnter = { this._handleComposerAppear }
                    timeout = { 1000 }>
                    <Composer
                        avatar = { avatar }
                        createPost = { createPost }
                        firstName = { firstName }
                    />
                </Transition>
                <Counter count = { count } />
                <TransitionGroup>{postsList}</TransitionGroup>
            </section>
        );
    }
}
