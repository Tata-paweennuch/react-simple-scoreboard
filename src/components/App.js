import React, { Component } from 'react';
import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';

class App extends Component {
  state = {
    players: [
      {
        name: "React",
        score: 0,
        id: 1
      },
      {
        name: "Vue",
        score: 0,
        id: 2
      },
      {
        name: "Angular",
        score: 0,
        id: 3
      },
      {
        name: "Ember",
        score: 0,
        id: 4
      }
    ]
  };

  // Player id counter
  prevPlayerId = 4;

  // the function accepts an argument that specifies the change (-1 or +1) or delta and score
  handlerScoreChange = (index, delta) => {
    this.setState( prevState => {
      let updatedPlayer = Object.assign({}, prevState.players[index]); // to avoid mutate prevState
      updatedPlayer.score += delta;
      return {
        players: [
          ...prevState.players.slice(0, index),
          updatedPlayer,
          ...prevState.players.slice(index+1)
        ]
      }
    });
  }
  
  handleAddPlayer = (name) => {
    this.setState( prevState => ({
      players: [
        ...prevState.players,
        {
          name,
          score: 0,
          id: this.prevPlayerId +1
        }
      ]
    }));
  }

  handleRemovePlayer = (id) => {
    this.setState( prevState => ({
      players: prevState.players.filter(p => p.id !== id)
    }));
  }

  getHighScore = () => {
    // First, filter through the players state to get all the player scores
    const scores = this.state.players.map(p => p.score);
    const highScore = Math.max(...scores);

    return highScore? highScore: null;
  }

  render() {
    const highScore = this.getHighScore();

    return (
      <div className="scoreboard">
        <Header players={this.state.players} />
        {this.state.players.map((player, index) =>
          <Player 
            name = {player.name}
            score = {player.score}
            id = {player.id}
            key = {player.id.toString()} 
            index = {index}
            changeScore = {this.handlerScoreChange}
            removePlayer = {this.handleRemovePlayer}      
            isHighScore = {highScore === player.score} 
          />
        )}
        <AddPlayerForm addPlayer={this.handleAddPlayer} />
      </div>
    );
  }
}

export default App;
