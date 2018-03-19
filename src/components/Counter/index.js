import React from 'react';
import Styles from './styles.scss';

const Counter = ({ count }) => (
    <section className = { Styles.counter }>Posts count: {count}</section>
);

export default Counter;
