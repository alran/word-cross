import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

GLOBAL = require('../Global.js');

class Home extends Component {
  static propTypes = {
    routes: PropTypes.object,
  };

  render() {
    const { routes } = this.context;

    return(
      <View style={{flex: 1}}>
        <View style={styles.content}>
          <TouchableHighlight onPress={ Actions.play } style={ styles.button }>
            <Text style={ styles.buttonText }>Solo Game</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={ Actions.play } style={ styles.button }>
            <Text style={ styles.buttonText }>Multiplayer Game</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={ Actions.help } style={ styles.button }>
            <Text style={ styles.buttonText }>How To Play</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={ Actions.profile } style={ styles.button }>
            <Text style={ styles.buttonText }>Profile</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={ Actions.login } style={ styles.button }>
            <Text style={ styles.buttonText }>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GLOBAL.COLORS.LIGHTPURPLE
  },
  button: {
    padding: 10,
    justifyContent: 'center',
    height: 50,
    backgroundColor: GLOBAL.COLORS.GREEN,
    borderRadius: 8,
    margin: 10,
    width: GLOBAL.DIMENSIONS.WIDTH * .9,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 24
  }
});

export default connect(({ routes }) => ({ routes }))(Home);
