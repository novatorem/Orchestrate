import React, { Component } from 'react'
import axios from 'axios'
import {Button} from 'antd'

export default class FriendsListHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            song: {}
        }
    }

    async componentDidMount(){

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

    render() {
        return (
            <div className="friendsListEntry">
                <div className="avatarContainer">
                    <img className="avatar" src={this.state.song.album ? this.state.song.album.images[0].url: null} alt="profile"/>
                    <a href={this.state.song.external_urls ? this.state.song.external_urls.spotify : ""}>
                        <div className="after"></div>
                    </a>
                </div>
                <div className="textContainer">
                    <h1 className = "FriendName">{this.props.friendName}</h1>
                    <h2 className = "SongName">{this.state.song.name ? this.state.song.name : ""}</h2>
                </div>

            </div>
        )
    }
}
