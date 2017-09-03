import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

GLOBAL = require('../Global.js');

class Help extends Component {

  render() {
    return (
      <View>
        <Text>Help...</Text>
      </View>
    )
  }
}

let styles = StyleSheet.create({
});

export default connect(({ routes }) => ({ routes }))(Help)
