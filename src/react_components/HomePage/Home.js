import React, { Component } from 'react'
import FriendsList from './FriendsList'
import PostList from './PostList'
import CreatePost from './CreatePost'
import '../../index.css'
import axios from 'axios'

export default class Home extends Component {
    // this is basically just a container component for logged in features
    constructor() {
      super()
      this.state = {
        posts: [],
        search: "",
        username: null
      }
    }

    componentDidMount() {
      this.updatePosts()
      axios.get(`http://localhost:3002/users/${this.props.userID}`, // save post
          {
              'headers' : {
                  "Access-Control-Allow-Origin": "*"
              },
              'content-type': 'text/plain',
              'mode': 'no-cors',
          }
      ).then((response) => this.setState({
        username: response.data.name
      }), (err) => console.log(err))

    }

    updatePosts() {
      console.log("updating post")
      axios.get(`http://localhost:3002/post`, // !!!!!!
          {
              'headers' : {
                  "Access-Control-Allow-Origin": "*"
              },
              'content-type': 'text/plain',
              'mode': 'no-cors'
          }
      ).then((response) => this.setState({
        posts: response.data
      }), (err) => console.log(err))

      // .then( (response) => {
      //     this.setState({posts: response.data});
      // })
      // .catch( (error) =>
      //     console.log(error)
      // )
    }

    onSearchChange(e) {
      this.setState({search: e.target.value})
    }

    render() {

        return (
            <div id="body">
              <div id="friendSide">
                <div className="title">Friends</div>
                <FriendsList userID={this.props.userID}/>
              </div>

              <div id="postSide">
                <div className="title">Posts</div>
                  <CreatePost
                    updatePosts={() => this.updatePosts()}
                    userID={this.props.userID}
                    username={this.state.username}
                  />
                  <PostList
                    posts={this.state.posts}
                    search={this.state.search}
                    onSearchChange={(s) => this.onSearchChange(s)}
                  />
              </div>
            </div>
        )
    }
}
