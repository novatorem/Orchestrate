import React, { Component } from 'react'
import avatar from '../../images/avatar.png'
import {Button} from 'antd'

export default class Post extends Component {
    render() {
        const currP = {
            id:this.props.id
        }
        return (
            <div className="postEntry">
                <div className="avatarContainer">
                    <img className="avatar" src={avatar} alt="profile"/>
                </div>
                <div className="textContainer">
                    <h1>{this.props.ownerName}</h1>
                    <h2>{this.props.text}</h2>
                </div>
                <div className='buttonContainer'>
                  <Button type='default' onClick = {this.props.rmPost.bind(this,currP)}>Ignore</Button>
                  <Button type='danger' onClick = {this.props.rmPost.bind(this,currP)}>Ban</Button>
                </div>
            </div>
        )
    }
}
