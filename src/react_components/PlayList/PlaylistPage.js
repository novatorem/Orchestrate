import React, { Component } from 'react'
import PlayListEntry from './PlaylistEntry'
import axios from 'axios'
import { Input, Button } from 'antd';


export default class PlaylistPage extends Component {
    constructor(props){
        super()
        this.state = {
            playlist: {
                songs: [],
            },
            addSongName: "",
            addSongArtist: "",
            canEdit: false
            

        }

        this.defaultHeader = {
            'headers' : {
                "Access-Control-Allow-Origin": "*"
            },
            'content-type': 'text/plain',
            'mode': 'no-cors'
        }

        this.handleAddSong = this.handleAddSong.bind(this)
        this.handleDeleteSong = this.handleDeleteSong.bind(this)
    }

    async componentDidMount(){
        
        console.log(this.props);
        await axios.get(`http://localhost:3002/playlist/${this.props.playlist}`, // !!!
        this.defaultHeader)
        .then( (response) => {console.log(response.data); 
            this.setState({
                playlist: response.data, 
                canEdit: this.props.user == response.data.owner
            })
            
        })
        .catch( (error) => console.log(error))
        
    }
    
    async handleAddSong(){
        if (!this.state.canEdit){
            alert("Cannot edit another user's playlist!")
            return
        }

        console.log(this.state)
        let newsongid;
        await axios.get(`http://localhost:3002/song/${this.state.addSongName}/${this.state.addSongArtist}`, // !!!
        this.defaultHeader)
        .then( 
            (response) => {                
                newsongid = response.data.tracks.items[0].id
                this.state.playlist.songs.push(newsongid)// gotta update db as well. 
                this.setState(this.state) // forces re-rendering

                if (response.data.tracks.items.length === 0){
                    return 
                }
                console.log("newsongid", newsongid);
                
                return axios.post( // chaining axios calls 
                    `http://localhost:3002/playlist/${this.props.playlist}/song`, {
                        'headers' : {
                            "Access-Control-Allow-Origin": "*"
                        },
                        'content-type': 'text/plain',
                        'mode': 'no-cors',
                        'song': newsongid
                        
                    }, 
                )
        })
        .then(response => {console.log("added song",response.data);})
        .catch( (error) => {console.log("error adding song", error); alert("error adding song")})
    }

    async handleDeleteSong(songId){
        if (!this.state.canEdit){
            alert("Cannot edit another user's playlist!")
            return
        }

        console.log("song to delete ",songId);
        console.log("playlist to delete from", this.props.playlist);
        await axios.delete(`http://localhost:3002/playlist/${this.props.playlist}/song`,
        {
            'headers' : {
                "Access-Control-Allow-Origin": "*"
            },
            'content-type': 'text/plain',
            'mode': 'no-cors',
            'data':{
                'song': songId
            }
        }
        ).then(response => {console.log("deleted song", songId, response.data);})
        .catch( (error) => {console.log("error deleting song", error); return})

        this.state.playlist.songs = this.state.playlist.songs.filter((id) => id !== songId)
        this.setState(this.state)
    }


    // to handle adding song: just make axios request with the new song details
    // to delete song: put delete button on each playlist entry. pass function to each which handles it inside of playlistpage
    // need to re-render after each operation
    
    render() {
        // console.log(this.props.playlist); // ID of the playlist 
        
        // need to let users search spotify and add songs to this guy 
        return (
            <div className="playList">
                {console.log(this.state.playlist)}
                
                <div id="playListTitle"> {this.state.playlist.name} </div>
                <div id="addSongForm">
                    <div className="searchBar">
                        <Input className="searchValue" placeholder="Song name" onChange={(e)=>this.setState({addSongName:e.target.value})} value={this.state.addSongName}/>
                        <Input className="searchValue" placeholder="Artist name" onChange={(e)=>this.setState({addSongArtist:e.target.value})} value={this.state.addSongArtist}/>
                        <button class="addButton" onClick={this.handleAddSong}>Add Song</button>
                    </div>
                    
                </div>
                <div>
                    {this.state.playlist.songs.map(
                    (song) => <PlayListEntry key={song} songid={song} handleDeleteSong={this.handleDeleteSong}/> )}
                </div>
            </div>
        )
    }
}
