import React, { Component } from 'react'
import { Input, Dropdown, Menu, Icon, Checkbox} from 'antd';
import FriendsListEntry from '../HomePage/FriendsListEntry';
import UsersListEntry from '../HomePage/UsersListEntry';
import PlaylistFront from '../PlayList/PlaylistFront'
import Post from '../HomePage/Post.js'
import axios from 'axios'
export default class SearchPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            search: "",
            users: [],
            friends: [],
            playlists: [],
            posts: [],
            searchType: "users",
            currUserData: {
                isAdmin: false
            }

        };

        this.handleDeleteUser = this.handleDeleteUser.bind(this)
        this.handleDeletePost = this.handleDeletePost.bind(this)
        this.handleDeletePlaylist = this.handleDeletePlaylist.bind(this)
    }

    async componentDidMount(){  //get all data from db

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
                currUserData: response.data,
                friends: response.data.friends
            }

        ), (err) => console.log(err))



        await axios.get(`http://localhost:3002/playlist`,
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
                playlists: response.data
            }

        ), (err) => console.log(err))



        await axios.get(`http://localhost:3002/post`,
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
                posts: response.data
            }

        ), (err) => console.log(err))

        console.log(this.state);
    }

    async handleDeleteUser(userId){
        if (!this.state.currUserData.isAdmin){return}
        console.log(`Admin deleting user ${userId}`);

        await axios.delete(`http://localhost:3002/users/${userId}`,
        {
            'headers' : {
                "Access-Control-Allow-Origin": "*"
            },
            'content-type': 'text/plain',
            'mode': 'no-cors',
        }
        ).then(response => {
            console.log("deleted user", userId, response.data);
            this.setState({users:this.state.users.filter(user=>user._id !== userId)})
            console.log(this.state);})
        .catch( (error) => {console.log("error deleting user", error); return})
    }

    async handleDeletePlaylist(playlistId){
        if (!this.state.currUserData.isAdmin){return}
        console.log(`Admin deleting playlist ${playlistId}`);

        await axios.delete(`http://localhost:3002/playlist/${playlistId}`,
        {
            'headers' : {
                "Access-Control-Allow-Origin": "*"
            },
            'content-type': 'text/plain',
            'mode': 'no-cors',
        }
        ).then(response => {
            console.log("deleted playlist", playlistId, response.data);
            this.setState({playlists:this.state.playlists.filter(playlist=>playlist._id !== playlistId)})
            console.log(this.state);})
        .catch( (error) => {console.log("error deleting playlist", error); return})
    }

    async handleDeletePost(postId){
        if (!this.state.currUserData.isAdmin){return}
        console.log(`Admin deleting post ${postId}`);

        await axios.delete(`http://localhost:3002/post/${postId}`,
        {
            'headers' : {
                "Access-Control-Allow-Origin": "*"
            },
            'content-type': 'text/plain',
            'mode': 'no-cors',
        }
        ).then(response => {
            console.log("deleted post", postId, response.data);
            this.setState({posts:this.state.posts.filter(post=>post._id !== postId)})
            console.log(this.state);})
        .catch( (error) => {console.log("error deleting post", error); return})
    }

    updateState() { //refreshes data after changes to db are made
      axios.get(`http://localhost:3002/users`, // friendslist needs to pass this user's id
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

      axios.get(`http://localhost:3002/users/${this.props.userID}`, // friendslist needs to pass this user's id
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
              currUserData: response.data,
              friends: response.data.friends
          }

      ), (err) => console.log(err))
    }

    updateResults() {

        //Modes selected for search panel

        if (this.state.searchType === "users"){ //all users are shown
            return (
                this.state.users.filter( (user) =>
                (user._id.includes(this.state.search) ||
                user.name.toLowerCase().includes(this.state.search) ||
                user.song.toLowerCase().includes(this.state.search)) &&
                (user._id !== this.props.userID)
                ).map( (user) => <UsersListEntry isFriend={this.state.friends.includes(user._id)}
                      updateState={() => this.updateState()}
                      userID={this.props.userID} addID={user._id}
                      friendName={user.name} songName={user.song}
                      handleDeleteUser={this.handleDeleteUser}
                      isAdmin={this.state.currUserData.isAdmin}/>
                )
            );
        }
        else if (this.state.searchType === "friends"){ //only friends are shown
            return (
                this.state.users.filter( (friend) =>
                (friend.name.toLowerCase().includes(this.state.search) ||
                friend.song.toLowerCase().includes(this.state.search)) &&
                this.state.friends.includes(friend._id) &&
                (this.props.userID !== friend._id)
            ).map((friend) => <FriendsListEntry
                            userID={this.props.userID}
                            updateState={() => this.updateState()}
                            deleteID={friend._id}
                            friendName={friend.name}
                            songName={friend.song}
                            handleDeleteUser={this.handleDeleteUser}
                            isAdmin={this.state.currUserData.isAdmin}/>) );
        }
        else if (this.state.searchType === "playlists"){ //all playlists are shown
            return (this.state.playlists.filter( (playlist) =>
            playlist._id.includes(this.state.search) ||
            playlist.name.toLowerCase().includes(this.state.search)
          ).map( (playlist) => <PlaylistFront key={playlist._id}
                                playlist={playlist._id}
                                clickPlaylist={(p)=>{this.props.clickPlaylist(p)}}
                                handleDeletePlaylist={this.handleDeletePlaylist}
                                currentuserid={this.props.userID}
                                isAdmin={this.state.currUserData.isAdmin}/>) );     // TODO make this link to playlist
        }
        else if (this.state.searchType === "posts"){ //all posts are shown
            return (this.state.posts.filter( (post) =>
            post.ownerID.includes(this.state.search) ||
            post.ownerName.toLowerCase().includes(this.state.search) ||
            post.text.toLowerCase().includes(this.state.search)
            ).map( (post)=> <Post
            // posterName={post.name}
            text={post.text}
            ownerName={post.ownerName}
            id={post._id}
            handleDeletePost={this.handleDeletePost}
            isAdmin={this.state.currUserData.isAdmin}/>) );
        }


    }



    menu = (  //menu for what to display from search
        <Menu>
          <Menu.Item onClick = {()=>this.setState({searchType: "users"})}>
            <a>All Users</a>
          </Menu.Item>
          <Menu.Item onClick = {()=>this.setState({searchType: "friends"})}>
            <a>Friends Only</a>
          </Menu.Item>
          <Menu.Item onClick = {()=>this.setState({searchType: "playlists"})}>
            <a>Playlists</a>
          </Menu.Item>
          <Menu.Item onClick = {()=>this.setState({searchType: "posts"})}>
            <a>Posts</a>
          </Menu.Item>
        </Menu>
      );



    render() {  //renders searchpage
        return (
            <div id='searcher'>
                <Dropdown overlay={this.menu}>
                    <a className="dropdown" href="#">
                    Search Type <Icon type="down" />
                    </a>
                </Dropdown>

                <div className='searchBar'>
                    <Input className = 'searchValue' placeholder="Search" onChange={(e) => {this.setState({search: e.target.value.toLowerCase()});}}/>
                    {this.updateResults()}
                </div>
            </div>
        )
    }
}
