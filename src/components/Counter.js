import React from 'react';
import {number, func} from 'prop-types';

const Counter = ({ index, score, changeScore}) =>  {
  console.log(score)
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={() => changeScore(index, -1)}> - </button>
      <span className="counter-score">{ score }</span>
      <button className="counter-action increment" onClick={() => changeScore(index, 1)}> + </button>
    </div>
  );
}

Counter.propTypes = {
  index: number, 
  score: number, 
  changeScore: func
};

export default Counter;
