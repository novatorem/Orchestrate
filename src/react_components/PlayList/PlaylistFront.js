import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'antd'
export default class PlaylistFront extends Component {
    constructor(props){
        super(props)
        this.state = {
            playlist: null,
        }
        this.handleUserDelete = this.handleUserDelete.bind(this)
    }

    async componentDidMount(){
        console.log(this.props);
        
        await axios.get(`http://localhost:3002/playlist/${this.props.playlist}`,//${this.props.playlistID},
            {
                'headers' : {
                    "Access-Control-Allow-Origin": "*"
                },
                'content-type': 'text/plain',
                'mode': 'no-cors'
            }
        ).then( (response) => {console.log(response); this.setState({playlist: response.data})})
        
    }
    drawDeleteForAdmin(){
        if (!this.props.isAdmin){
            return
        }
        return (<button class="adminButton" onClick={() => this.props.handleDeleteUser(this.props.addID)}>×</button>)
    }

    async handleUserDelete(){
        await axios.delete(`http://localhost:3002/playlist/${this.props.playlist}`,//${this.props.playlistID},
        {
            'headers' : {
                "Access-Control-Allow-Origin": "*"
            },
            'content-type': 'text/plain',
            'mode': 'no-cors'
        }
        ).then( (response) => {
            console.log(response);
            this.state.playlist.name = "[DELETED]"
            this.setState(this.state) // forces re-rendering
        })
    }


    drawDeleteForUser(){
        if (!this.state.playlist){
            return
        }

        if (this.props.currentuserid === this.state.playlist.owner){
            return 
        }   
        return (<button className="deleteButton" onClick={this.handleUserDelete}>×</button>)
    }

    render() {
        return ( 
            <div className="friendsListEntry"> 
                <div className="textContainer" onClick={()=>this.props.clickPlaylist(this.props.playlist)}>
                <h1 className="FriendName">{this.state.playlist  ? this.state.playlist.name : ""}</h1>
                <h2 className="SongName">{this.state.playlist  ? this.state.playlist.author : ""}</h2>
                </div>
                <div >{this.drawDeleteForAdmin()}</div>
                <div>{this.drawDeleteForUser()}</div>
            </div>
        )
    }
}
