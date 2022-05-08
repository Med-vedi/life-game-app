import React from "react";
import { BtnLabel } from "../../shared/types";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../hook";
import {
  GameStatus,
  GridMode,
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

const Footer: React.FC = () => {
  const dispatch = useAppDispatch();

  // SELECTORS
  const rows = useAppSelector((state) => state.gridSize.rows);
  const cols = useAppSelector((state) => state.gridSize.cols);
  const grid = useAppSelector((state) => state.grid.grid);

  const gameStatus = useAppSelector((state) => state.gameControl.gameStatus);

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
    dispatch(createRandomGrid({ rows: 30, cols: 30 }));
    dispatch(
      randomGrid({ gameStatus: GameStatus.STOP, gridMode: GridMode.RANDOM })
    );
  };

  const onResetClick = () => {
    dispatch(createEmptyGrid({ rows: 30, cols: 30 }));
    dispatch(
      resetGrid({ gameStatus: GameStatus.STOP, gridMode: GridMode.EMPTY })
    );
  };
  const onNextGenerationClick = () => {
    dispatch(updateGrid({ grid, rows, cols }));
  };

  return (
    <div className="gridpage__footer">
      <button className="reset" onClick={onResetClick}>
        {BtnLabel.RESET}
      </button>
      <button
        className={cn(gameIsActive ? "stop" : "start")}
        // disabled={population < 1 && !gridIsRandom}
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
