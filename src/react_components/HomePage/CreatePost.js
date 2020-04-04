import React, { Component } from 'react'
import { Upload, Icon, message, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import '../../index.css';
import axios from 'axios';

const { TextArea } = Input;
const { Dragger } = Upload;


export default class CreatePost extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: null

        }
    }


    savePost() {  //save post to database - would be a server call
      axios.post(`http://localhost:3002/post`, // save post
          {
              'headers' : {
                  "Access-Control-Allow-Origin": "*"
              },
              'content-type': 'text/plain',
              'mode': 'no-cors',
              'ownerID': this.props.userID,
              'ownerName': this.props.username,
              'text': this.state.comments,
          }
      ).then( (response) => {
        this.props.updatePosts();
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })

    }

    render() {  //renders form to create post


        return (
            <div className="posting">
              <TextArea className='postInput' placeholder="What's on your mind?" onChange={(e) => this.setState({comments: e.target.value})} rows={4} />
              <div id='postSubmit'>
                <Button type="primary" onClick={() => this.savePost()}>Submit</Button>
              </div>
            </div>
        )
    }
}

CreatePost.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
