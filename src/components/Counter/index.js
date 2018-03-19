import React from 'react';
import { number } from 'prop-types';
import Styles from './styles.scss';

const Counter = ({ count }) => (
    <section className = { Styles.counter }>Posts count: {count}</section>
);

Counter.propTupes = {
    count: number.isRequired
};

export default Counter;
