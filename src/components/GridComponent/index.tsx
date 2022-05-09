import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";

import cn from "classnames";

// SHARED
import { GameStatus } from "../../shared/types";

import { onGridCellClick, updateGrid } from "../../store/gridSlice";

const GridComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  // SELECTORS
  const cols = useAppSelector((state) => state.grid.cols);
  const rows = useAppSelector((state) => state.grid.rows);
  const grid = useAppSelector((state) => state.grid.grid);
  const gameStatus = useAppSelector((state) => state.gameControl.gameStatus);

  const gameIsActive = gameStatus === GameStatus.START;

  // RERENDER CONTROL
  useEffect(() => {
    // nice solution - got from https://devtrium.com/posts/set-interval-react
    let interval: ReturnType<typeof setTimeout>;
    if (gameIsActive) {
      interval = setInterval(() => {
        startSimulation();
      }, 500);
    }

    return () => {
      clearInterval(interval);
    };
  });

  const onCellClick = (x: number, y: number): void => {
    dispatch(onGridCellClick({ grid, x, y }));
  };

  const startSimulation = (): void => {
    // update grid and counter state
    dispatch(updateGrid({ grid, cols, rows }));
  };

  return (
    <div
      className="gridpage__grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols},10px)`,
        gridTemplateRows: `repeat(${rows},10px)`,
        margin: "0 auto",
      }}
    >
      {grid.map((rows: number[], i) =>
        rows.map((_, k: number) => {
          return (
            <div
              onClick={() => onCellClick(i, k)}
              key={`${i}-${k}`}
              className={cn("cell", grid[i][k] ? "filled" : null)}
            />
          );
        })
      )}
    </div>
  );
};

export default GridComponent;
