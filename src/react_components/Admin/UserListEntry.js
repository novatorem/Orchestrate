import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import avatar from '../../images/avatar.png'
import {Button} from 'antd'

export default class UserListEntry extends Component {
    render() {
        const user = {
            id:this.props.id,
            name:this.props.userName
        }
       // console.log(user)
        return (
            <div className="userListEntry">
                <div className="avatarContainer">
                    <img className="avatar" src={avatar} alt="profile"/>
                </div>
                <div className="textContainer">
                    <h1 className = "userName">{this.props.userName}</h1>
                </div>
                <div className='buttonContainer'>
                <Button type='default' onClick = {this.props.banUser.bind(this,user)}>Ignore</Button>
                <Button type='danger' onClick = {this.props.banUser.bind(this,user)}>Ban</Button>
                </div>
            </div>
        )
    }
}