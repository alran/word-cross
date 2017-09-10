import React, { Component } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';

GLOBAL = require('../Global.js');

export default class Letter extends Component {
  constructor(props) {
    super(props);
      this.state = { showTile: true, pan: new Animated.ValueXY() };

      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {
          dx: this.state.pan.x, // x, y are Animated.Value
          dy: this.state.pan.y
        }]),
        onPanResponderRelease: (e, gesture) => {
          if (this.props.isDropZone(gesture)){ //exchange drop zone
            this.props.exchangeForThree(this.props.letter)
            this.setState({ showTile: false })
          } else if (this.props.isBoardArea(gesture)) {
            const placesLetterTouches = this.props.placeLetterOnBoard(gesture);

            const startingX = this.startingXY.x;
            const startingY = this.startingXY.y;

            const xAdjustment = placesLetterTouches.x - startingX - 31;
            const yAdjustment = placesLetterTouches.y - startingY - 31;

            console.log('startingX:', startingX, 'startingY:', startingY);

            Animated.spring(
              this.state.pan,
              { toValue: { x: xAdjustment, y: yAdjustment } }
            ).start();
          } else {
            console.log('else?')
            Animated.spring(
              this.state.pan,
              { toValue: { x: 0, y: 0 } }
            ).start();
          }
        },
        onPanResponderGrant: (e, gestureState) => {
          this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value })
          this.state.pan.setValue({ x: 0, y: 0 });
        }
      });
  }

  measure() {
    const self = this;
    const refName = `letter${ this.props.counter }`;
    self.refs[refName].measure((ox, oy, width, height, px, py) => {
      self.startingXY = { x: ox + 5, y: py + 5 }; // margin is 5
    })
  }

  render() {
    if (this.state.showTile) {
      return(
        <View
          key={ this.props.counter }
          onLayout={ this.measure.bind(this) }
          ref={ `letter${this.props.counter}` }
        >
          <Animated.View { ...this.panResponder.panHandlers }
            style={ [this.state.pan.getLayout(), styles.letterPieces] }
          >
            <Text>{ this.props.letter }</Text>
          </Animated.View>
        </View>
      )
    }

    return (<View />)
  }
}


let styles = StyleSheet.create({
  letterPieces: {
    alignItems: 'center',
    backgroundColor: GLOBAL.COLORS.BEIGE,
    height: GLOBAL.LETTERSIZE,
    justifyContent: 'center',
    margin: 5,
    width: GLOBAL.LETTERSIZE
  }
});
