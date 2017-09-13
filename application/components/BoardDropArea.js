import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';

export default class BoardDropArea extends Component {
  setDropZoneValues(event) {
    this.props.addBoardDropZone(event.nativeEvent.layout, this.props.index)
  }

  render() {
    return (
      <View
        onLayout={ this.setDropZoneValues.bind(this) }
        style={ styles.boardDropArea }
      />
    )
  }
}


let styles = StyleSheet.create({
  boardDropArea: {
    backgroundColor: GLOBAL.COLORS.LIGHTPURPLE,
    borderColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    height: GLOBAL.LETTERSIZE + 1,
    width: GLOBAL.LETTERSIZE + 1
  }
})
