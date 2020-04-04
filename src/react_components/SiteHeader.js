import React, { Component } from 'react'
import {Icon, Button, Alert} from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class SiteHeader extends Component {
  constructor(props) {
        super(props)
        this.state = {
            isAdmin :false
        }
    }
    /*
    componentDidMount = async () => {
        let user = await axios.get(`http://localhost:3002/users/${this.props.userID}`, {
            'headers': {
                "Access-Control-Allow-Origin": "*"
            },
        })
        this.setState({ isAdmin: user.data.isAdmin })
        console.log(user)

    };*/

    settingButton() {
      return (
        <Button onClick={() => this.props.clickSetting()} shape="circle" icon="setting" />
      )
    }


    profileButton(){
      return(
        <Button onClick = {()=>this.props.clickProfile()} shape = 'circle' icon = "idcard"/>
    )
  }

   searchButton(){
      return (
        <Button onClick={() => this.props.clickSearch()} shape="circle" icon="search"/>
      )
    }

    adminButton(){
      return (
        <Button onClick={() => this.props.clickAdmin()} shape="circle" icon="eye"/>

      )
    }

    render() {
        return (
            <div id="header">
                <div onClick={() => {
                  this.props.loggedIn ? this.props.clickHome() : alert("login below")
                }} id="title">
                    <i className="fas fa-record-vinyl"></i>
                    Orchestrate
                </div>

                <div id = "rightBar">
                  <li>
                      {
                          this.state.isAdmin ? this.adminButton() : null
                      }
                  </li>
                  <li>
                      {
                          this.props.loggedIn ? this.searchButton() : null
                      }
                  </li>
                  <li>
                      {
                        this.props.loggedIn ? this.profileButton() : null
                      }
                  </li>
                  <li>
                      {
                          this.props.loggedIn ? this.settingButton() : null
                      }
                  </li>

                </div>
            </div>
        )
    }
}

SiteHeader.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
}
