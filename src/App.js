// Handles the authentication with axios calls
// Controls UI before and after logging in
// Renders signup form and main ui component
import React, { Component } from 'react'
import styled from 'styled-components'
import Signup from './components/Signup'
import Login from './components/Login'
import Main from './components/Main'
import axios from 'axios'
// import background from './assets/images/background.jpg'
// import evilVeil from './assets/images/evilVeil.jpg'
import heroes from './assets/images/heroes.jpg'
import necro from './assets/images/necro.jpg'
import onslaught from './assets/images/onslaught.jpg'
import plagueDoctor from './assets/images/plagueDoctor.jpg'
// import priest from './assets/images/priest.jpg'
import shaman from './assets/images/shaman.jpg'
require('dotenv').config()

// Styled-Components
const Div1 = styled.div`
  /* background-image: url(); */
  /* background-size: cover; */
  /* background-repeat: no-repeat; */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #2C7FCC;
  font-family: "Julee";

  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  list-style: none;
  margin: 0;
  padding: 0;
`
const Div2 = styled.div`
    * {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-size: cover;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      opacity: 0;
      z-index: 0;
      animation: imageAnimation 50s linear infinite; 
    }
    li:nth-child(1){
      background-image: url(${shaman});
    }
    li:nth-child(2){
      background-image: url(${heroes});
      animation-delay: 10s; 
    }
    li:nth-child(3){
      background-image: url(${necro});
      /* animation-delay: 20s;  */
    }
    li:nth-child(4){
      background-image: url(${onslaught});
      /* animation-delay: 30s;  */
    }
    li:nth-child(5){
      background-image: url(${plagueDoctor});
      /* animation-delay: 40s;  */
    }
    @keyframes imageAnimation { 
      0% { 
        opacity: 0; 
        animation-timing-function: ease-in;
      }
      10% {
        opacity: 1;
        animation-timing-function: ease-out;
      }
      20% {
        opacity: 1;
      }
      30% {
        opacity: 0;
      }
    }
`
const Div3 = styled.div`
    z-index: 1;
`

export default class App extends Component {
  state = {
    isCreatingUser: false,
    isLoggedIn: false,
  }

  // FUNCTION: check local storage for token to authenticate user
  // ARGUMENTS: none
  // RETURNS: if token present, sets isLoggedIn to true
  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.setState({ isLoggedIn: true })
    }
  }

  // FUNCTION: registers a new user
  // ARGUMENTS: newUserObject contains new user information from <Signup /> component
  // RETURNS: sets token in local storage, sets isLoggedIn to true, closes form
  signup = (newUserObject) => {
    axios.post(process.env.REACT_APP_SERVER + '/api/registration/', newUserObject)
      .then(res => {
        localStorage.setItem('token', res.data.key)
        this.setState({ isLoggedIn: true })
      })
      .catch(function (error) {
        console.log(error);
      });
    this.toggleCreateUserForm()
  }

  // FUNCTION: logs in a user with existing credentials
  // ARGUMENTS: userObject packages exisiting information from <Login /> component
  // RETURNS: sets token in local storage and sets isLoggedIn to true
  login = (userObject) => {
    axios.post(process.env.REACT_APP_SERVER + '/api/login/', userObject)
      .then(res => {
        localStorage.setItem('token', res.data.key)
        this.setState({ isLoggedIn: true })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // FUNCTION: logs out a user
  // ARGUMENTS: event argument to prevent default action
  // RETURNS: removes token from local storage, set isLoggedIn to false
  logout = (e) => {
    e.preventDefault()
    localStorage.clear()
    this.setState({ isLoggedIn: false })
  }

  // FUNCTION: toggles ui to open/close new user signup form
  // ARGUMENTS: none
  // RETURNS: toggles isCreatingUser to true
  toggleCreateUserForm = () => {
    this.setState({ isCreatingUser: !this.state.isCreatingUser })
  }

  render() {
    return (
      <Div1>
        <Div2>
          <ul>
            {/* <li>{evilVeil}</li>
            <li>{heroes}</li>
            <li>{necro}</li>
            <li>{onslaught}</li>
            <li>{plagueDoctor}</li>
            <li>{priest}</li>
            <li>{shaman}</li> */}
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </Div2>
        <Div3>
          {
            !this.state.isLoggedIn && !this.state.isCreatingUser ? (
              <>
                <h1>Lambda MUD</h1>
                <Login
                  toggleCreateUserForm={this.toggleCreateUserForm}
                  login={this.login}
                />
              </>
            ) : null
          }
          {
            !this.state.isLoggedIn && this.state.isCreatingUser ? (
              <>
                <h1>Signup</h1>
                <Signup
                  toggleCreateUserForm={this.toggleCreateUserForm}
                  signup={this.signup}
                />
              </>
            ) : null
          }
          {
            this.state.isLoggedIn ? (
              <Main
                isLoggedIn={this.state.isLoggedIn}
                initialize={this.initialize}
                logout={this.logout}
              />
            ) : null
          }
        </Div3>
      </Div1>
    );
  }
}
