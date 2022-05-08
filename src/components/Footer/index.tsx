import React from "react";
import cn from "classnames";

// REDUX
import {
  randomGrid,
  resetGrid,
  startGame,
  stopGame,
} from "../../store/gameControlSlice";
import {
  createEmptyGrid,
  createRandomGrid,
  updateGrid,
} from "../../store/gridSlice";

import { GameStatus, GridMode } from "../../shared/types";
import { useAppDispatch, useAppSelector } from "../../hook";
import { BtnLabel } from "../../shared/constants";

const Footer: React.FC = () => {
  const dispatch = useAppDispatch();

  // SELECTORS
  const cols = useAppSelector((state) => state.grid.cols);
  const gameStatus = useAppSelector((state) => state.gameControl.gameStatus);
  const grid = useAppSelector((state) => state.grid.grid);
  const population = useAppSelector((state) => state.grid.population);
  const rows = useAppSelector((state) => state.grid.rows);

  const gameIsActive = gameStatus === GameStatus.START;

  const onStartBtnClick = () => {
    if (gameIsActive) {
      return dispatch(
        stopGame({ gameStatus: GameStatus.STOP, gridMode: GridMode.CURRENT })
      );
    }
    dispatch(
      startGame({ gameStatus: GameStatus.START, gridMode: GridMode.CURRENT })
    );
  };

  const onRandomClick = () => {
    dispatch(createRandomGrid({ rows, cols }));
    dispatch(
      randomGrid({ gameStatus: GameStatus.STOP, gridMode: GridMode.RANDOM })
    );
  };

  const onResetClick = () => {
    dispatch(createEmptyGrid({ rows, cols }));
    dispatch(
      resetGrid({ gameStatus: GameStatus.STOP, gridMode: GridMode.EMPTY })
    );
  };

  const onNextGenerationClick = () => {
    dispatch(updateGrid({ grid, cols, rows }));
  };

  return (
    <div className="gridpage__footer">
      <button className="reset" onClick={onResetClick}>
        {BtnLabel.RESET}
      </button>

      <button
        className={cn(
          gameIsActive ? "stop" : "start",
          !population && !gameIsActive && "disabled"
        )}
        disabled={!population && !gameIsActive}
        onClick={onStartBtnClick}
      >
        {gameIsActive ? BtnLabel.STOP : BtnLabel.START}
      </button>

      <button className="random" onClick={onRandomClick}>
        {BtnLabel.RANDOM}
      </button>

      <button className="next" onClick={onNextGenerationClick}>
        {BtnLabel.NEXT_GENERATION}
      </button>
    </div>
  );
};

export default Footer;
