import React, { Component } from 'react'
import UserList from './UserList'
import PostList from './PostList'
import BanList from './BanList'
import '../../index.css'

export default class Admin extends Component {
    state = {
    	search:'',
       posts: [{
                id: "0",
                posterName: "John Smith",
                postText: "Average songs for an average person"

            },
            {
                id: "1",
                posterName: "Karen Joe",
                postText: "I demand the best of the best song"

            },
            {
                id: "2",
                posterName: "Chad Thunder",
                postText: "My songs are sooooo good"

            },
            {
                id: "3",
                posterName: "Dan Man",
                postText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque justo vel turpis pellentesque, eu bibendum dolor tempor. In quam dolor, dignissim nec urna non, porttitor efficitur urna. Maecenas elementum tristique massa, finibus posuere felis ultrices eget. Praesent mollis quis lacus in lobortis. Proin ultrices magna ex, non eleifend tellus hendrerit rutrum. Praesent laoreet venenatis elit non fringilla. Aliquam vel congue tellus, pretium rutrum odio. Donec at urna ex."
            }
        ],
        users: [
            {
                id: "0",
                name: "Kyle West"
            },
            {
                id: "1",
                name: "Lucy Anderson"
            },
            {
                id: "2",
                name: "Dylan Sherlock"
            },
            {
                id: "3",
                name: "Alex Rhee"
            }
        ], reportedUser:[
            {
                id: "0",
                name: "Kyle West"
            },
            {
                id: "1",
                name: "Lucy Anderson"
            },
            {
                id: "2",
                name: "Dylan Sherlock"
            },
            {
                id: "3",
                name: "Alex Rhee"
            },
            {
                id: "4",
                name: "Sylvia Kate"
            },
            {
                id: "5",
                name: "Victorian Bill"
            }
        ]
    }

    banUser = (u) =>{
    	//console.log(u)
    	const  newReports = this.state.reportedUser.filter(a =>a.id!==u.id)
    	//console.log(newReports)
    	const newBanlist = this.state.users.filter(b=>b.id!==u.id)
    	this.setState({reportedUser:newReports})
    	if(newBanlist.length===this.state.users.length){
    		newBanlist.push(u)
    		this.setState({users:newBanlist})
    	}
    }

    releaseUser = (user)=>{
        const updateUsers = this.state.users.filter(u => u.id!==user.id);
        //console.log(updateUsers)
        this.setState({users:updateUsers})
    }

    onSearch = (e)=>{
    	const t = e.target;
    	console.log(t.value)
    	const res = t.value;
    	const name = 'search'

    	this.setState({
    		[name]:res
    	});
    }

    deletePost =(pos) =>{
    	const newPosts = this.state.posts.filter(p =>pos.id!==p.id)
    	this.setState({posts:newPosts})
    }

    render() {

        return (
            <div id="body">
            
                <div id="adminPosts">
                    <div className="title">Reported Posts</div>
                    <PostList posts = {this.state.posts} search={this.state.search} banPost={this.deletePost} onSearchChange={this.onSearch}/>
                </div>

                <div id="adminUsers">
                    <div className="title">Reported Users</div>
                    <UserList users={this.state.reportedUser} ban={this.banUser}/>
                </div>

                <div id="adminBan">
                    <div className="title">Banned Users</div>
                    <BanList users={this.state.users} release={this.releaseUser}/>
                </div>
            </div>
        )
    }
}
