import React, { Component } from 'react';
import Post from './Post';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';


export default class PostList extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    //renders the list of posts from all users
    render() {
        return (
            <div>
                <div className="searchBar">
                    <Input className="searchValue" placeholder="Search Posts" onChange={(e) => this.props.onSearchChange(e)}/>
                </div>
                {this.props.posts.filter((post) => post.ownerName.toLowerCase().includes(this.props.search.toLowerCase()) || post.text.toLowerCase().includes(this.props.search.toLowerCase()) ).map(
                  (post) => <Post id={post._id} ownerName={post.ownerName} text={post.text}/>
                )}
            </div>
        )
    }
}

PostList.propTypes = {
    search: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    onSearchChange: PropTypes.func.isRequired,
}
