import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Game from '../components/Game.js';
import * as actionCreators from '../duck';

function mapStateToProps(state) {
  return {
    availablePieces: state.duckReducers.availablePieces,
    boardDropAreas: state.duckReducers.boardDropAreas,
    dropZoneValues: state.duckReducers.dropZoneValues,
    gameStarted: state.duckReducers.gameStarted,
    heightOfLettersArea: state.duckReducers.heightOfLettersArea,
    lettersOnBoard: state.duckReducers.lettersOnBoard,
    loading: state.duckReducers.loading,
    numAreas: state.duckReducers.numAreas,
    userHand: state.duckReducers.userHand,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addBoardDropZone: (zone, loading) => {
      dispatch(actionCreators.addBoardDropZone(zone, loading))
    },
    exchangeForThree: (letter) => {
      dispatch(actionCreators.exchangeForThree(letter))
    },
    passOutUserHand: () => {
      dispatch(actionCreators.passOutUserHand())
    },
    setDropZoneValues: (dropZoneValues) => {
      dispatch(actionCreators.setDropZoneValues(dropZoneValues))
    },
    setHeightOfLettersArea: (height) => {
      dispatch(actionCreators.setHeightOfLettersArea(height))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
