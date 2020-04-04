import React, { Component } from 'react'
import axios from 'axios'
import {Button} from 'antd'

export default class FriendsListEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            song: {}
        }
    }

    async componentDidMount(){  //updates song names

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

    deleteFriend(deleteID) {  //deletes friend from db
      console.log("delete " + deleteID + " from " + this.props.userID)

      //append user's array in db with new freind's deleteID

      //get user's curreny array of friends
      axios.patch(`http://localhost:3002/users/${this.props.userID}/friends`, // friendslist needs to pass this user's id
          {
              'headers' : {
                  "Access-Control-Allow-Origin": "*"
              },
              'content-type': 'text/plain',
              'mode': 'no-cors',
              'deleteID': deleteID
          }
      )
      .then((response) => {
        console.log(response)
      }, (err) => console.log(err))

      this.props.updateState()

    }

    drawDelete(){ //admins can delete
        if (!this.props.isAdmin){
            return
        }
        return (
            <button class="adminButton" onClick={() => this.props.handleDeleteUser(this.props.addID)}>×</button>
        )
    }
    //renders list of friends
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
                    <div className="addFriend">
                        <button className="deleteButton" onClick={() => this.deleteFriend(this.props.deleteID)}>×</button>
                        {this.drawDelete()}
                    </div>
                </div>

            </div>
        )
    }
}
