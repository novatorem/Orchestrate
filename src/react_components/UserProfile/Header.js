import React, { Component } from 'react'
import { Button, Row, Col } from 'antd';
//import '../../index.css'


/* The Header Component */
class Header extends React.Component {
  constructor(props) {
    super(props);

  }
  /*
   editProfile(){
       this.setState({inEdit: ! this.state.inEdit})
 }*/



  render () {
    //console.log(this.props)
    //console.log(this.state)

    if (this.props.inEdit) {
      return (
        <div className='ProfileHeader'>
          <div id='profileTitle'>
            <h1>User Profile</h1>
          </div>
          <Row className='profileContent'>
            <Col span={6}><img id='profilePhoto' src={this.props.photo} width={150} height={150} />
            </Col>

            <Col span={14}>
              <Row className='profileTxt' span={8}> User Name:
                <input name="uName" className='profileInputE' value={this.props.userName} onChange={this.props.onChanges} type="text"
                  placeholder="User Name"
                />
              </Row>
              <Row className='profileTxt' span={8}>Favourite Song:
            <input className='profileInputE'
                  name="bestSong"
                  value={this.props.favSong}
                  type="text"
                  onChange={this.props.onChanges}
                  placeholder="Favorite Song"
                />
              </Row>
            </Col>

            <Col span={4}>
              <div className='edit'>
                <Button type="primary" onClick={this.props.save} >Save</Button>
              </div>
            </Col>
          </Row>
        </div>
      )
    } else {
      return (
        <div className='ProfileHeader'>
          <div>
            <h1>User Profile</h1>
          </div>
          <Row className='profileContent'>
            <Col span={6}><img id='profilePhoto' src={this.props.photo} width={150} height={150} />
            </Col>

            <Col span={14}>
              <Row className='profileTxt' span={8}> User Name: <div className='profileInput'>{this.props.currUser.name}</div></Row>
              <Row className='profileTxt' span={8}>Favourite Song: <div className='profileInput'>{this.props.currUser.song}</div></Row>
            </Col>

            <Col span={4}>
              <div className='edit'>
                <Button type="primary" onClick={this.props.toEdit} >Edit</Button>
              </div>
            </Col>
          </Row>
        </div>
      )
    }
  }
}



export default Header;