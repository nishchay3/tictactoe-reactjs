import { useState } from "react";
import classes from "./Tictactoe.module.scss";

const WINNER_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const gridFormat = 3;

const Tictactoe = () => {
  const [resultArr, setResultArr] = useState(
    Array(gridFormat * gridFormat).fill(null)
  );
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  let isGameWon = false;

  for (let i = 0; i < WINNER_COMBINATIONS.length; i++) {
    const [x, y, z] = WINNER_COMBINATIONS[i];
    if (
      resultArr[x] &&
      resultArr[y] &&
      resultArr[z] &&
      resultArr[x] === resultArr[y] &&
      resultArr[y] === resultArr[z]
    ) {
      isGameWon = true;
      break;
    }
  }

  const buttonHandler = (e) => {
    if (resultArr[e.target.id]) return;
    setIsPlayer1Turn(!isPlayer1Turn);
    setResultArr((current) => {
      current[e.target.id] = isPlayer1Turn ? "X" : "O";
      return current;
    });
  };

  const onReset = () => {
    setResultArr(Array(gridFormat * gridFormat).fill(null));
    setIsPlayer1Turn(true);
  };

  const displayMessage = () => {
    return (
      <>
        {isGameWon && (
          <h1 className={classes.Paragraph}>{`The winner is ${
            isPlayer1Turn ? "Player 2" : "Player 1"
          }`}</h1>
        )}
        {resultArr.indexOf(null) !== -1 && !isGameWon && (
          <h1 className={classes.Paragraph}>{`${
            isPlayer1Turn ? "Player 1" : "Player 2"
          } turn`}</h1>
        )}
        {resultArr.indexOf(null) === -1 && !isGameWon && (
          <h1 className={classes.Paragraph}>Draw!</h1>
        )}
      </>
    );
  };

  return (
    <>
      {displayMessage()}
      <div className={classes.Wrapper}>
        {resultArr.map((item, index) => (
          <button
            key={index}
            id={index}
            className={classes.Cell}
            onClick={buttonHandler}
            disabled={isGameWon}
            style={{
              width: `${100 / gridFormat}%`,
              height: `${100 / gridFormat}%`,
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <button className={classes.Reset} onClick={onReset}>
        Reset
      </button>
    </>
  );
};

export default Tictactoe;
