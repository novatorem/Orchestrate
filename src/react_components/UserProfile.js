import React, { Component } from 'react'
import { Button } from 'antd';
import avatar from '../images/avatar.png'
import Header from './UserProfile/Header'
// import PlaylistPage from './UserProfile/PlaylistPage'

import PlaylistPage from './PlayList/PlaylistPage'
import PlaylistFront from './PlayList/PlaylistFront'
import FriendList from './HomePage/FriendsList'
import axios from 'axios'

const log = console.log

class UserProfile extends Component {
    // every state hardcoded for now
    state = {
        playListName: "",
        createPlayList: false,
        uName: "",
        bestSong: "",
        songName:"",
        currUser: {},
        request: [],
        playlists:[],
        inEdit: false,
        playlistSongs: [],
        getSongs: false,
        currSong: "",
    }

    componentDidMount = async () => {
        let user = await axios.get(`http://localhost:3002/users/${this.props.userID}`, {
            'headers': {
                "Access-Control-Allow-Origin": "*"
            },
            'content-type': 'text/plain',
            'mode': 'no-cors'
        })
        this.setState({ currUser: user.data })
       // console.log(user)

        let pList = await axios.get(`http://localhost:3002/${this.props.userID}/playlist`,{
            'headers': {
                "Access-Control-Allow-Origin": "*"
            },
            'content-type': 'text/plain',
            'mode': 'no-cors'
        });
        this.setState({playlists:pList.data});

    };

    storeChanges = (e) => {
        const t = e.target;
        //console.log(t.value)
        const res = t.value;
        const name = t.name

        this.setState({
            [name]: res
        });
    }



    editProfile = () => {
        this.setState({ inEdit: !this.state.inEdit })
        //log(this.state)
    }

    saveProfile = async () => {
        //console.log('save profile');
        console.log("saving")
        const newU = this.state.currUser
        if (this.state.uName !== "") {
            newU.name = this.state.uName
            localStorage.setItem('username', this.state.uName)
        }
        if (this.state.bestSong !== "") {
            console.log(this.state.bestSong)
            newU.song = this.state.bestSong
        }
        await axios.patch(`http://localhost:3002/users/${this.props.userID}`, {
            name: newU.name,
            song: newU.song
        }, {
            'headers': {
                "Access-Control-Allow-Origin": "*"
            },
            'content-type': 'text/plain',
            'mode': 'no-cors',
        })
        this.editProfile()
        //log(this.state)
        this.setState({ currUser: newU })
    }

    createPlayList = async () => {
        if (this.state.playListName === "") {
            this.setCreatePlayList();
            return
        }
        await axios.post('http://localhost:3002/playlist', {
            name: this.state.playListName,
            owner: this.state.currUser._id,
            songs: this.state.playlistSongs
        }, {
            'headers': {
                "Access-Control-Allow-Origin": "*"
            },
            'content-type': 'text/plain',
            'mode': 'no-cors',
        })
        // console.log(response)
        this.setCreatePlayList();

        await axios.get(`http://localhost:3002/${this.props.userID}/playlist`, {
            name: this.state.playListName,
            owner: this.state.currUser._id
        }, {
            'headers': {
                "Access-Control-Allow-Origin": "*"
            },
            'content-type': 'text/plain',
            'mode': 'no-cors',
        }).then(response=>{
            this.setState({playlists:response.data})
        })
    }

    addnewPlayList = () => {
        return (<input value="" />);
    }
    setCreatePlayList = () => {
        this.setState({ createPlayList: !this.state.createPlayList })
    }
    setPlayListName = (event) => {
        this.setState({ playListName: event.target.value });
    }

    updatePlaylistSongs() {
      const newPlaylist = this.state.playlistSongs
      newPlaylist.push(this.state.currSong)
      this.setState({playlistSongs: newPlaylist})
      console.log(this.state.currSong)
      console.log("curr song^")
      console.log(this.state.playlistSongs)
      console.log("playlist song^")
    }


    render () {
        let addPlayList
        if (!this.state.createPlayList) {
            addPlayList = <div className="profileTxt"><button onClick={this.setCreatePlayList} className="ant-btn ant-btn-primary">Create playlist</button></div>

        } else {
          if (this.state.getSongs == true) {
            addPlayList = (<div className="profileTxt"><input placeholder="Song Name" className="profileInputE" onChange={(e) => this.setState({currSong: e.target.value })} />
                <button onClick={() => this.updatePlaylistSongs()} className="ant-btn ant-btn-primary">Add Song</button>
                <button onClick={() => this.createPlayList()} className="ant-btn ant-btn-primary">Publish Playlist</button></div>)
          }
          else {
            addPlayList = (<div className="profileTxt"><input placeholder="Playlist Name" className="profileInputE" onChange={this.setPlayListName} />
                <button onClick={() => this.setState({getSongs: true})} className="ant-btn ant-btn-primary">New playlist</button></div>)

          }

        }

        return (
            <div>
                <Header
                    currUser={this.state.currUser}
                    userName={this.state.uName}
                    favSong={this.state.bestSong}
                    photo={avatar}
                    inEdit={this.state.inEdit}
                    toEdit={this.editProfile}
                    playList = {this.state.playlist}
                    onChanges={this.storeChanges}
                    save={this.saveProfile}
                />
                <div id="profileContent">

                    <div className='playList'>
                        <div id='playListTitle'>My Playlists</div>
                        {
                            this.state.playlists.map((curr) => <PlaylistFront key={curr._id} playlist={curr._id} curruserid={this.props.userID}clickPlaylist={(p) => {this.props.clickPlaylist(p) }} />)
                        }
                        {addPlayList}
                    </div>

                    <FriendList
                        userID = {this.props.userID}
                    />
                </div>
            </div>
        )
    }
}

export default UserProfile;
