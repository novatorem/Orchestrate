import React, { Component } from 'react'
import Post from './Post'
import { Input } from 'antd';
import PropTypes from 'prop-types';


export default class PostList extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }



    render() {
        //console.log('reported post',this.props.posts)
        return (
            <div>
                <div className="searchBar">
                    <Input className="searchValue" placeholder="Search Posts" onChange={this.props.onSearchChange}/>
                </div>
                {this.props.posts.filter((post) => post.id.toLowerCase().includes(this.props.search.toLowerCase()) || post.posterName.toLowerCase().includes(this.props.search.toLowerCase()) || post.postText.toLowerCase().includes(this.props.search.toLowerCase()) ).map(
                  (post) => <Post key={post.id} id = {post.id} posterName={post.posterName} postText={post.postText} rmPost={this.props.banPost} />
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
