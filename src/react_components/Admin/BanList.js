import React, { Component } from 'react'
import BanListEntry from './BanListEntry'
import { Input } from 'antd';

export default class BanList extends Component {
    state={
        // Banned users are hardcoded, server call would be here
        /*users: [
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
        ],*/
        search: ""
    }


    render() {

        return (
            <div id='banList'>
                <div className="searchBar">
                    <Input className="searchValue" placeholder="Search users" onChange={(e) => this.setState({search: e.target.value})}/>
                </div>
              {this.props.users.filter((user) => user.id.toLowerCase().includes(this.state.search.toLowerCase()) || user.name.toLowerCase().includes(this.state.search.toLowerCase())).map(
                  (user) => <BanListEntry key={user.id} id = {user.id} userName={user.name} delete ={this.props.release}/>
              )}
            </div>
        )
    }
}