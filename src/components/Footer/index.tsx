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

const Footer: React.FC = () => {
  const dispatch = useAppDispatch();

  // SELECTORS
  const population = useAppSelector((state) => state.counter.population);
  const gridMode = useAppSelector((state) => state.gameControl.gridMode);
  const gameStatus = useAppSelector((state) => state.gameControl.gameStatus);

  const gameIsActive = gameStatus === GameStatus.START;
  const gridIsRandom = gridMode === GridMode.RANDOM;

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
    dispatch(
      randomGrid({ gameStatus: GameStatus.STOP, gridMode: GridMode.RANDOM })
    );
  };

  const onResetClick = () => {
    dispatch(
      resetGrid({ gameStatus: GameStatus.STOP, gridMode: GridMode.EMPTY })
    );
  };

  return (
    <div className="gridpage__footer">
      <button className="reset" onClick={onResetClick}>
        {BtnLabel.RESET}
      </button>
      <button
        className={cn(gameIsActive ? "stop" : "start")}
        disabled={population < 1 && !gridIsRandom}
        onClick={onStartBtnClick}
      >
        {gameIsActive ? BtnLabel.STOP : BtnLabel.START}
      </button>
      <button className="random" onClick={onRandomClick}>
        {BtnLabel.RANDOM}
      </button>
    </div>
  );
};

export default Footer;
