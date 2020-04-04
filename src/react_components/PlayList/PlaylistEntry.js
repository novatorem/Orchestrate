import React, { Component } from 'react'
import avatar from '../../images/avatar.png'
import axios from 'axios'
import { Button } from 'antd'

export default class PlaylistEntry extends Component {
    // When the component is created
    constructor(props) {
        super(props)
        this.state = {
            song: {}
        }
    }

    async componentDidMount(){
        console.log(this.props.songid);
        
        await axios.get(`http://localhost:3002/song/${this.props.songid}`, // !!!!!!
            {
                'headers' : {
                    "Access-Control-Allow-Origin": "*"
                },
                'content-type': 'text/plain',
                'mode': 'no-cors'
            }
        ).then( (response) => {console.log("received song",response.data); this.setState({song: response.data});})
        .catch( (error) => console.log(error))

    }
    
    render() {
        // TODO: spotify integration
        return (
            <div className="PlaylistEntry">
                <div className="avatarContainer">
                    <img className="avatar" src={this.state.song.album ? this.state.song.album.images[0].url: null} alt="profile"/>
                    <a href={this.state.song.external_urls ? this.state.song.external_urls.spotify : ""}> 
                        <div className="after"></div>
                    </a>
                </div>
                <div className="textContainer">
                <h2 className = "SongName">{this.state.song.name ? this.state.song.name : ""}</h2>
                <h2 className = "ArtistName">{this.state.song.artists ? this.state.song.artists[0].name : ""}</h2>
                <button className="deleteButton" onClick={() => this.props.handleDeleteSong(this.props.songid)}>×</button>
                </div>
                <div className="deleteSongButtonContainer">
                
                </div>
            </div>
        )
    }
}
