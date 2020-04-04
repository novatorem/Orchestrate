import React, { Component } from 'react'
import FriendsListHome from './FriendsListHome'
import { Input } from 'antd';
import axios from 'axios';

export default class FriendsList extends Component {
    constructor(props){
        super()
        this.state={
            users: [],
            friends:[],
            search: ""
        }
    }


    async componentDidMount(){  //gets user and friends data

        await axios.get(`http://localhost:3002/users`, // friendslist needs to pass this user's id
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

                users: response.data.Users
            },

        ), (err) => console.log(err))

        await axios.get(`http://localhost:3002/users/${this.props.userID}`, // friendslist needs to pass this user's id
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
                friends: response.data.friends
            }

        ), (err) => console.log(err))

        console.log(this.state.friends)
        console.log("friends^")
        console.log(this.state.users)
        console.log("users^")
    }


    render() {  //renders a list of friends
        return (
            <div>
                <div className="searchBar">
                    <Input className="searchValue" placeholder="Search Friends" onChange={(e) => this.setState({search: e.target.value})}/>
                </div>
              {this.state.users.filter((friend) =>
                this.props.userID !== friend._id &&
                this.state.friends.includes(friend._id) &&
                (friend._id.toLowerCase().includes(this.state.search.toLowerCase()) ||
                friend.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
                friend.song.toLowerCase().includes(this.state.search.toLowerCase())) )
                .map((friend) => <FriendsListHome key={friend._id} friendName={friend.name} songName={friend.song}/>
              )}
            </div>
        )
    }
}
