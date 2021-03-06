import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: Date.now(),
      elapsedTime: 0
    }
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const miliseconds = Date.now() - this.state.startTime;
    const elapsedTime = this.msToTime(miliseconds);
    this.setState({ elapsedTime });
  }

  msToTime(duration) {
    let milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24)

    hours = (hours < 10) ? '0' + hours : hours
    minutes = (minutes < 10) ? '0' + minutes : minutes
    seconds = (seconds < 10) ? '0' + seconds : seconds

    return hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
  }

  render() {
    return (
      <Text style={styles.timer}>
        { this.state.elapsedTime }
      </Text>
    )
  }
}


let styles = StyleSheet.create({
  timer: {
    textAlign: 'center'
  }
})
