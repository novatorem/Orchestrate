import React, { Component } from 'react'
import avatar from '../../images/avatar.png'
import { Button, Input } from 'antd';
import '../../index.css'
import PropTypes from 'prop-types';
import { logout } from "../../actions/user";
import axios from 'axios'
const bcrypt = require('bcryptjs')


export default class Settings extends Component {

    state = {
      newPass: null,
      username: null,

    }

    async componentDidMount(){  //gets user's data from db

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
                username: response.data.name
            }

        ), (err) => console.log(err))

    }

    changePassword() {  //changes password for user in db, after encrypting

      console.log("change password to " + this.state.newPass)
      const savePass = ""
      bcrypt.genSalt(10, (err, salt) => {
  			bcrypt.hash(this.state.newPass, salt, (err, hash) => {
  				const savePass = hash
          axios.patch(`http://localhost:3002/users/password/${this.props.userID}`, {
                'headers': {
                    "Access-Control-Allow-Origin": "*"
                },
                'content-type': 'text/plain',
                'mode': 'no-cors',
                "newPass": savePass

            }).then((response) => {
              alert("Password successfully changed")
              this.setState({newPass: null})
            }).catch((err) => {
              console.log(err)
            })
  			})
  		})

    }

    //renders settings page
    render() {
        return (
            <div className="settings">
                <h1 id='settingsTitle'> Account and Settings</h1>
                <h2 className='settingsIn'> Welcome, {this.state.username} - what would you like to do today?</h2>
                <div id='setChange'>
                    {/* This will have a server call to change the password */}
                    <div className="searchBar">
                        <Input className="searchValue" placeholder="New Password" onChange={(e) => this.setState({ newPass: e.target.value}, console.log(this.state.newPass))}></Input>
                    <button className="addButton" disabled={this.state.newPass == null} onClick={() => this.changePassword()} type="primary">✓</button>
                    </div>
                </div>
                <div id='setLog'>
                    <Button onClick={logout} type="danger">Logout</Button>
                </div>
            </div>
        )
    }
}

Settings.propTypes = {
    logout: PropTypes.func.isRequired,
}
