import React, { Component } from 'react';
import { Text } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import configureStore from './application/store.js';
const store = configureStore()
const RouterWithRedux = connect()(Router);

import Home from './application/components/Home.js';
import Help from './application/components/Help.js'
import GameContainer from './application/containers/GameContainer.js'
import Profile from './application/components/Profile.js'
import Login from './application/components/Login.js'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="home" component={ Home } title="Home" initial={ true } />
            <Scene key="help" component={ Help } title="Help" />
            <Scene key="play" component={ GameContainer } title="Play" />
            <Scene key="profile" component={ Profile } title="Profile" />
            <Scene key="login" component={ Login } title="Login" />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}
