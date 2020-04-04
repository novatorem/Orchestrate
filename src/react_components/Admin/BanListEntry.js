import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import avatar from '../../images/avatar.png'
import {Button} from 'antd';

export default class BanListEntry extends Component {
    render() {
        const banned = {
            id:this.props.id
        }
        const release = this.props.delete

        return (
            <div className="banListEntry">
                <div className="avatarContainer">
                    <img className="avatar" src={avatar} alt="profile"/>
                </div>
                <div className="textContainer">
                    <h1 className = "userName">{this.props.userName}</h1>
                </div>
                <Button type='primary' id='banLButton' onClick={release.bind(this,banned)}>Release</Button>
            </div>
        )
    }
}
