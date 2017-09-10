import React, { Component } from 'react';
import Letter from './Letter';
import BoardDropArea from './BoardDropArea';
import Timer from './Timer';
import { Animated, PanResponder, StyleSheet, ScrollView, Text, TouchableHighlight, View } from 'react-native';

export default class GamePlay extends Component {
  componentWillMount() { this.props.passOutUserHand(); }

  isDropZone(gesture){
    if (this.props.availablePieces.length < 4) { return false; }
    const dz = this.props.dropZoneValues;
    return gesture.moveY > dz.y && gesture.y0 < dz.y + dz.height;
  }

  isBoardArea(gesture){
    return !!this.decideLetterPlacement(gesture);
  }

  decideLetterPlacement(gesture) {
    const boardDropAreas = this.props.boardDropAreas;
    const yValues = Object.keys(boardDropAreas);

    for (let i = 0; i < yValues.length; i++) {
      const y = parseInt(yValues[i]);
      const xValues = boardDropAreas[y];

      for (let i = 0; i < xValues.length; i++){
        const x = xValues[i];
        const onDropArea = (gesture.moveY > y && gesture.moveY < (y + GLOBAL.LETTERSIZE)) &&
          (gesture.moveX > x && gesture.moveX < x + GLOBAL.LETTERSIZE)
        if (onDropArea) { return { x, y } }
      }
    }
  }

  placeLetterOnBoard(gesture){
    const boardDropAreas = this.props.boardDropAreas;
    const placesLetterTouches = [];

    const yValues = Object.keys(boardDropAreas);
    const yPosition = gesture.moveY;
    const yIndex = Math.round((yPosition - GLOBAL.DIMENSIONS.HEADER_HEIGHT) / (GLOBAL.LETTERSIZE + 1));
    const y = yValues[yIndex];

    // Note: x values start at 5 because of padding.
    const xValues = boardDropAreas[y];
    const xPosition = Math.round((gesture.moveX - 5) / (GLOBAL.LETTERSIZE + 1));

    return { x: parseInt(xValues[xPosition]), y: parseInt(y) };


    // insert logic for deciding which area of the board the letter will be placed in.
    // if the place on the board is already occupied, x and y coordinates will be 0 (the letter will bounce back)
    // return object with x and y coordinates

    // for (let i = 0; i < yValues.length; i++) {
    //   let y = parseInt(yValues[i])
    //   let xValues = boardDropAreas[y]
    //
    //   for (let i = 0; i < xValues.length; i++){
    //     let x = xValues[i]
    //     let onDropArea = (gesture.moveY > y && gesture.moveY < y + GLOBAL.LETTERSIZE) && (gesture.moveX > x && gesture.moveX < x + GLOBAL.LETTERSIZE)
    //     if (onDropArea){
    //       placesLetterTouches.push([x, y])
    //     }
    //   }
    // }
    return placesLetterTouches;
    // add check to make sure person is not dropping letter back inside letter area
      // subtract spaces under the players hand from the places it touches
    // add check to make sure placesLetterTouches isn't empty
  }

  exchangeForThree(letter) {
    if (this.props.availablePieces.length > 1) {
      this.props.exchangeForThree(letter);
    }
  }

  setDropZoneValues(event) { // referring to exchange area drop zone
    this.props.setDropZoneValues(event.nativeEvent.layout);
  }

  setHeightOfLettersArea(event) {
    this.props.setHeightOfLettersArea(event.nativeEvent.layout.height);
  }

  setUpBoardDropAreas() {
    const boardDropAreas = [];
    const self = this;

    for (let i = 0; i < this.props.numAreas; i++) {
      boardDropAreas.push(
        <BoardDropArea
          key={ i }
          index={ i }
          addBoardDropZone={ self.addBoardDropZone.bind(self) }
        />
      )
    }
    return boardDropAreas;
  }

  addBoardDropZone(zone, index) {
    const loading = index != GLOBAL.numAreas - 1;
    this.props.addBoardDropZone(zone, loading);
  }

  iterateThroughPieces(){
    const self = this;
    return self.props.userHand.map((letter, counter) => {
      counter ++;
      return self.piece(letter, counter);
    })
  }

  piece(letter, counter) {
    const self = this;

    return (
      <Letter
        counter={ counter }
        key={ counter }
        letter={ letter }
        isDropZone={ self.isDropZone.bind(self) } // exchange area
        isBoardArea={ self.isBoardArea.bind(self) } // board area with places for letter
        exchangeForThree={ self.exchangeForThree.bind(self) }
        placeLetterOnBoard={ self.placeLetterOnBoard.bind(self) }
      />
    )
  }

  render() {
    const boardDropAreas = this.setUpBoardDropAreas();

    return (
      <View style={ { flex: 1 } }>
        <View style={ styles.board }>
          <View style={ styles.containerForBoard }>
            { boardDropAreas }
          </View>
        </View>
        <View
          style={ styles.container }
          onLayout={ this.setHeightOfLettersArea.bind(this) }>
          { this.iterateThroughPieces() }
        </View>
        <View
          onLayout={ this.setDropZoneValues.bind(this) }
          style={ styles.exchangeArea }
        >
            <Text>Drop Letter Here to Exchange</Text>
        </View>
        <View style={ styles.stats }>
          <View style={ styles.statsElement }>
            <Timer />
          </View>
          <View style={ styles.statsElement }>
            <Text style={ { textAlign: 'center' } }>Points</Text>
          </View>
          <View style={ styles.statsElement }>
            <Text style={ { textAlign: 'center' } }>User Info</Text>
          </View>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: GLOBAL.COLORS.GREEN,
    bottom: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    left: 0,
    padding: 5,
    position: 'absolute',
    right: 0
  },
  containerForBoard: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: GLOBAL.DIMENSIONS.WIDTH
  },
  board: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  content: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  exchangeArea: {
    alignItems: 'center',
    backgroundColor: GLOBAL.COLORS.TEAL,
    bottom: 40,
    height: 40,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0
  },
  stats: {
    alignItems: 'center',
    backgroundColor: GLOBAL.COLORS.YELLOW,
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    left: 0,
    right: 0,
    position: 'absolute'
  },
  statsElement: {
    width: GLOBAL.DIMENSIONS.WIDTH * .3
  }
});
