import React, { Component } from "react";
import { string, func } from "prop-types";

import Styles from "./styles.scss";

export default class Composer extends Component {
    static propTypes = {
        avatar: string.isRequired,
        createPost: func.isRequired
    };

    constructor() {
        super();
        this.handleSubmit = ::this._handleSubmit;
    }

    state = {
        comment: ""
    };

    _handleSubmit(event) {
        event.preventDefault();
        this.props.createPost(this.state.comment);
        this.setState(() => ({
            comment: ''
        }));
    }

    _handleTextAreaChange = ({ target: { value } }) => {
        this.setState(() => ({
            comment: value
        }));
    };

    render() {
        const { avatar, firstName } = this.props;
        const { comment } = this.state;

        return (
            <section className={Styles.composer}>
                <img alt="lisa" src={avatar} />
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        value={comment}
                        placeholder={`What do you think about, ${firstName}?`}
                        onChange={this._handleTextAreaChange}
                    />
                    <input type="submit" value="Post"  disabled={!comment} />
                </form>
            </section>
        );
    }
}
