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
  uploadGrid,
} from "../../store/gridSlice";

import { BtnLabel } from "../../shared/constants";
import { exportFile } from "../../shared/utils";
import { GameStatus, GridMode } from "../../shared/types";
import { useAppDispatch, useAppSelector } from "../../hook";

const Footer: React.FC = () => {
  const dispatch = useAppDispatch();

  // SELECTORS
  const cols = useAppSelector((state) => state.grid.cols);
  const gameStatus = useAppSelector((state) => state.gameControl.gameStatus);
  const generation = useAppSelector((state) => state.grid.generation);
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

  const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const reader = new FileReader();

    reader.onload = () => {
      // getting text from event
      const text = reader.result;

      if (typeof text !== "string") {
        return;
      }

      // parse string to array
      const parsedToArr = text.split("\n");
      // deep clone of actual array
      const arrayClone = parsedToArr.map((rows) => rows);
      // separate header info from grid
      const headerInfo = arrayClone.splice(0, 2);
      // split values to get string[][]
      const splitedArr = arrayClone.map((rows) => rows.split(""));

      let generation = 0;
      // check if generation value is in the text
      if (headerInfo[0]) {
        let parsedGen = headerInfo[0].match(/\d/g)?.join("") || 0;
        generation = +parsedGen ? +parsedGen : 0;
      }
      // update the grid state
      dispatch(uploadGrid({ grid: splitedArr, generation }));
    };

    e.target.files && reader.readAsText(e.target.files[0]);
  };

  const onDownloadClick = () => {
    exportFile({ grid, generation });
  };

  return (
    <div className="gridpage__footer">
      <div className="gridpage__footer-main">
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
      <a
        href="https://github.com/extendi/game-of-life#solution-implementation"
        target="_blank"
        rel="noopener noreferrer"
      >
        Info
      </a>
      <input type="file" className="upload" onChange={onUploadFile} />
      <button className="download" onClick={onDownloadClick}>
        {BtnLabel.DOWNLOAD}
      </button>
    </div>
  );
};

export default Footer;
