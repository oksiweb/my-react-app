import React from 'react';
import Styles from './styles.scss';
import { string } from 'prop-types';

const Postman = (props, { avatar, firstName }) => (
    <section className={Styles.postman}>
        <img src = { avatar } alt = 'postman' />
        <span>Welcome online, {firstName} </span>
    </section>
);

Postman.contextTypes = {
    avatar:    string.isRequired,
    firstName: string.isRequired
};

export default Postman;
