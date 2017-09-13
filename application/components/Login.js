import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

GLOBAL = require('../Global.js');


export default class Login extends Component {
  login() {
    console.log('trying to login');
  }

  render() {
    return (
      <View style={ { flex: 1 } }>
        <View style={ styles.background }>
          <Image
            source={ require('../images/background.png') }
            style={ styles.backgroundImage }
          />
        </View>
        <View style={ styles.loginContainer }>
          <TouchableHighlight onPress={ this.login } style={ styles.button }>
            <Text>Login with Facebook</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loginContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    marginTop: 150
  },
  background: {
    bottom: 0,
    position: 'absolute',
    height: GLOBAL.DIMENSIONS.HEIGHT,
    left: 0,
    right: 0,
    top: 0,
    width: GLOBAL.DIMENSIONS.WIDTH,
  },
  backgroundImage: {
    alignItems: 'stretch',
    flex: 1,
  },
  button: {
    backgroundColor: GLOBAL.COLORS.YELLOW,
    height: 50,
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
  }
})
