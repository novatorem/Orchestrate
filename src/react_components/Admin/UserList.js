import React, { Component } from 'react'
import UserListEntry from './UserListEntry'
import { Input } from 'antd';

export default class UserList extends Component {
    state={
        //  Users are hardcoded, server call would be here
        //users: this.props.users,
        search: ""
    }


    render() {
        return (
            <div id='userList'>
                <div className="searchBar">
                    <Input className="searchValue" placeholder="Search users" onChange={(e) => this.setState({search: e.target.value})}/>
                </div>
              {this.props.users.filter((user) => user.id.toLowerCase().includes(this.state.search.toLowerCase()) || user.name.toLowerCase().includes(this.state.search.toLowerCase())).map(
                  (user) => <UserListEntry key={user.id} id={user.id} userName={user.name} banUser={this.props.ban}/>
              )}
            </div>
        )
    }
}