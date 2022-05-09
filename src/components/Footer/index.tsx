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
  setGeneration,
  updateGrid,
  uploadGrid,
} from "../../store/gridSlice";

import { GameStatus, GridMode } from "../../shared/types";
import { useAppDispatch, useAppSelector } from "../../hook";
import { BtnLabel } from "../../shared/constants";
import { exportFile } from "../../shared/utils";

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

  const onUploadFile = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target) {
        return;
      }
      const text = e.target.result;

      if (typeof text !== "string") {
        return;
      }

      const parsedToArr = text.split("\n");
      const arrayClone = parsedToArr.map((rows) => rows);
      const splitedArr = arrayClone.map((rows) => rows.split(""));
      const headerInfo = arrayClone.splice(0, 2);

      let generation = 0;
      if (headerInfo[0]) {
        let parsedGen = headerInfo[0].match(/\d/g)?.join("") || 0;
        generation = +parsedGen ? +parsedGen : 0;
      }
      dispatch(uploadGrid({ grid: splitedArr }));
      dispatch(setGeneration({ generation }));
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
      <input type="file" name="" id="" onChange={onUploadFile} />
      <button className="download" onClick={onDownloadClick}>
        {BtnLabel.DOWNLOAD}
      </button>
    </div>
  );
};

export default Footer;
