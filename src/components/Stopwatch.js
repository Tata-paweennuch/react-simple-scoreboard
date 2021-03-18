import React, { Component } from 'react';


// require three pieces of state: A running state, an elapsed time state, and a previous time state to let us calculate how much time has passed
class Stopwatch extends Component {

  state = {
    isRunning: false,
    elapsedTime: 0,
    previousTime: 0
  }

  componentDidMount() {
    this.intervalID = setInterval( () => this.tick(), 100);
  }

  // clear the interval, so it's no longer ticking away and taking up memory
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  // To update the elapsedTime state only if 'isRunning' is true
  // will use the current time stamp here to do the elapsedTime calculation
  // update 'previousTime' to 'now', so can use it to calculate the elapsedTime (or the time since the previous tick)
  // then will increase the elapsedTime by adding the difference to this.state.elapsedTime
  tick = () => {
    if (this.state.isRunning) {
      const now = Date.now();
      this.setState( prevState => ({
        previousTime: now,
        elapsedTime: prevState.elapsedTime + (now - this.state.previousTime)
      }))
    } 
  }

  handleStopwatch = () => {
    this.setState( prevState => ({
      isRunning: !prevState.isRunning
    }))
    // To update previousTime, only when starting the timer
    if (!this.state.isRunning) {
      this.setState({ previousTime: Date.now() })    
    }
  }

  handleReset = () => {
    this.setState({ elapsedTime: 0 })
  }

  render() {
    const seconds = Math.floor(this.state.elapsedTime / 1000);

    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <span className="stopwatch-time">{ seconds }</span>
        <button onClick={this.handleStopwatch}>{ this.state.isRunning ? 'stop' : 'start'}</button> 
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

export default Stopwatch;
