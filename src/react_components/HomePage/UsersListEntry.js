import React, { Component } from 'react'
import axios from 'axios'
import {Button} from 'antd'


export default class UsersListEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            song: {}
        }
    }

    async componentDidMount(){  //gets user data from db 
        console.log(this.props)
        console.log("props^")
        await axios.get(`http://localhost:3002/users/${this.props.friendid}`, // friendslist needs to pass this user's id
            {
                'headers' : {
                    "Access-Control-Allow-Origin": "*"
                },
                'content-type': 'text/plain',
                'mode': 'no-cors'
            }
        )
        .then((response) => this.setState(
            {
                profilePic: response.data.songPic,
                songUrl: response.data.songUrl
            },

        ), (err) => console.log(err))

        console.log("Getting info about: " + this.props.songName)
        await axios.get(`http://localhost:3002/song/${this.props.songName}`, // !!!!!!
            {
                'headers' : {
                    "Access-Control-Allow-Origin": "*"
                },
                'content-type': 'text/plain',
                'mode': 'no-cors'
            }
        ).then( (response) => {
            this.setState({song: response.data});
        })
        .catch( (error) =>
            console.log(error)
        )

    }

    addFriend(addID) {
      console.log("add " + addID + " to " + this.props.userID)

      //append user's array in db with new freind's addID

      //get user's curreny array of friends
      axios.post(`http://localhost:3002/users/${this.props.userID}/friends`, // friendslist needs to pass this user's id
          {
              'headers' : {
                  "Access-Control-Allow-Origin": "*"
              },
              'content-type': 'text/plain',
              'mode': 'no-cors',
              'friendId': addID
          }
      )
      .then((response) => {
        console.log(response)
      }, (err) => console.log(err))

      this.props.updateState()
    }

    isFriend(friend) {  //check if he is already a friend. if not return delete button
      if (!friend) {

        return (<button class="addButton" onClick={() => this.addFriend(this.props.addID)}>+</button>)
      }
    }

    drawDelete(){ //admins can delete
        if (!this.props.isAdmin){
            return
        }
        return (<button class="adminButton" onClick={() => this.props.handleDeleteUser(this.props.addID)}>×</button>)
    }
    //renders all users
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
                    <div className="addFriend">{this.isFriend(this.props.isFriend)}{this.drawDelete()}</div>
                    {/* <div className="addFriend">{this.drawDelete()}</div> */}
                </div>
            </div>
        )
    }
}
