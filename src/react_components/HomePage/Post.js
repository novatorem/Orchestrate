import React, { Component } from 'react'
import avatar from '../../images/avatar.png'
import axios from 'axios'
import { Button } from 'antd'

export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            song: {}
        }
    }

    async componentDidMount(){  //grabs song data from db

        console.log("Getting info about: " + this.props.songName)
        await axios.get(`http://localhost:3002/song/${this.props.songName}`, // !!!!!!
            {
                'headers' : {
                    "Access-Control-Allow-Origin": "*"
                },
                'content-type': 'text/plain',
                'mode': 'no-cors'
            }
        ).then( (response) => this.setState(
            {
                song: response.data
            }
        ), (err) => console.log(err))

    }

    drawDelete(){ //admins can delete
        if (!this.props.isAdmin){
            return
        }
        return (
            <button class="adminButton" onClick={() => this.props.handleDeletePost(this.props.post)}>×</button>
        )
    }
    //renders the post
    render() {
        return (
            <div className="postEntry">
                <div className="avatarContainer">
                    <img className="avatar" src={this.state.song.album ? this.state.song.album.images[0].url: null} alt="profile"/>
                </div>
                <div className="textContainer">
                    <h1>{this.props.ownerName}</h1>
                    <h2>{this.props.text}</h2>
                </div>

                {this.drawDelete()}
            </div>
        )
    }
}
