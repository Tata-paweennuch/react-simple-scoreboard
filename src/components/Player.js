import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Counter from './Counter';
import Icon from './Icon';

class Player extends PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    id: PropTypes.number,
    index: PropTypes.number,
    changeScore: PropTypes.func,
    removePlayer: PropTypes.func,
    isHighScore: PropTypes.bool
  }

  render() {
    const { name, score, id, index, changeScore, removePlayer, isHighScore } = this.props;
    console.log(score)

    return (
      <div className="player">
        <span className="player-name">
          <button className="remove-player" onClick={() => removePlayer(id)}>✖</button>
          <Icon isHighScore={isHighScore} />
          { name }
        </span>

        <Counter 
          score = {score}
          index = {index}
          changeScore = {changeScore}
        />
      </div>
    );
  }
}

export default Player;
