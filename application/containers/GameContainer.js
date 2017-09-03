import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Game from '../components/Game.js';
import * as actionCreators from '../duck';

const mapStateToProps = state => ({
  availablePieces: state.availablePieces,
})

const mapDispatchToProps = dispatch => ({
  setupGame: () => { dispatch(actionCreators.setupGame()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
