import React from 'react';
import './index.css'; //CSS disabled for development.
import SiteHeader from './react_components/SiteHeader';
import PropTypes from 'prop-types';
import Login from './react_components/Login';
import Setting from './react_components/SettingPage/Setting';
import Home from './react_components/HomePage/Home';
import UserProfile from './react_components/UserProfile'
import SearchPage from './react_components/SearchPage/SearchPage';
import Admin from './react_components/Admin/Admin';

import 'antd/dist/antd.css';
import PlaylistPage from './react_components/PlayList/PlaylistPage';
import { readCookie } from "./actions/user";
import BaseReactComponent from "./react_components/BaseReactComponent";


class App extends BaseReactComponent {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      currentPage: "login",
      playlist: null,
      userID: null,
      posts: [],
      search: ""
    }
    readCookie();
  }

  //page to render
  selectPage() {
    const { userID } = this.state;
    if (!userID) {
      return (<Login />)
    }

    else if (this.state.currentPage === "login") {
      if (userID) {
        this.setState({userID: userID})
        this.setState({loggedIn: true, currentPage: "home"})
      }
      return (
        <Login />
      )
    }

    else if (this.state.currentPage === "home") {
      return (
        <Home
          admin={this.state.admin}
          posts={this.state.posts}
          search={this.state.search}
          userID={this.state.userID}
        />
      )
    }

    else if (this.state.currentPage === "setting") {
      return (<Setting userID={this.state.userID} logout={() => this.logout()}/>)
    }

    else if (this.state.currentPage === "profile") {
      return (<UserProfile userID ={this.state.userID} clickPlaylist={(playlist)=>this.clickPlaylist(playlist)}/>)
    }

    else if (this.state.currentPage === "search"){
      return (<SearchPage userID={this.state.userID} clickPlaylist={(playlist)=>this.clickPlaylist(playlist)}/>)
    }

    else if (this.state.currentPage === "admin"){
      return (
        <Admin
          userID = {this.state.userID}
          posts={this.state.posts}
          search={this.state.search}
        />
      )
    }

    else if (this.state.currentPage === "playlist"){
      return (<PlaylistPage playlist={this.state.playlist} user={this.state.userID}/>) // MUST CHANGE THIS
    }
  }

  clickSetting() {
    this.setState({currentPage: "setting"})
  }

  clickHome() {
    this.setState({currentPage: "home"})
  }

  clickProfile(){
    this.setState({currentPage:"profile"})
  }

  clickSearch() {
    this.setState({currentPage: "search"})
  }

  clickAdmin() {
    this.setState({currentPage: "admin"})
  }

  clickPlaylist(nplaylist){
    console.log("nplaylist", nplaylist);

    this.setState({currentPage: "playlist"});
    this.setState({playlist: nplaylist});
  }

  render() {
    const { userID } = this.state;
    if (userID) {
    return (
      <div className="App">

        <SiteHeader
          loggedIn={this.state.loggedIn}
          clickSetting={() => this.clickSetting()}
          clickHome={() => this.clickHome()}

          clickProfile = {()=> this.clickProfile()}

          clickSearch={()=> this.clickSearch()}
          clickAdmin={()=> this.clickAdmin()}

        />
        {
          this.selectPage()
        }
      </div>
    );
    } else {
      return (
        <div className="App">
          {
            this.selectPage()
          }
        </div>
      )
    }


  }

  filterState({ userID }) {
    return { userID };
}

}

export default App;
