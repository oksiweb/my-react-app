import React, { Component, Fragment } from "react";
import { string } from "prop-types";

import moment from "moment";
import Styles from "./styles.scss";

export default class Post extends Component {
    static propTypes = {
        avatar: string.isRequired,
        lastName: string.isRequired
    };

    static contextTypes = {
        firstName: string.isRequired
    };

    render() {
        const { avatar, lastName } = this.props;
        const { firstName } = this.context;

        return (
            <section className={Styles.post}>
                <img alt="post" src={avatar} />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment().format("MMMM D h:mm:ss a")}</time>
                <p>Пора на обед!</p>
                <span className={Styles.cross} />
            </section>
        );
    }
}
