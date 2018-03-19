import React from 'react';
import { createPortal } from 'react-dom';

import Styles from './styles.scss';

const portal = document.getElementById('spinner');

const Spinner = ({ isFetching }) =>
    createPortal(isFetching
        ? <section className = { Styles.spinner } />
        : null,
    portal
    );

export default Spinner;
