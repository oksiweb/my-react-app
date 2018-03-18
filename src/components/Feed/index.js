import React, { Component } from 'react';
import { string } from 'prop-types';

import Composer from '../../components/Composer';
import Post from '../../components/Post';

export default class Feed extends Component {

    static propTypes = {
        avatar:    string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    render() {
        const { avatar, firstName, lastName } = this.props;

        return (
            <section>
                <Composer
                    avatar = { avatar }
                    firstName = { firstName }
                />
                <Post
                    avatar = { avatar }
                    firstName = { firstName }
                    lastName = { lastName }
                />
            </section>
        );
    }
};