import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";

import cn from "classnames";

// REDUX
import { resetPopulation, updateGeneration } from "../../store/counterSlice";

// SHARED
import { GameStatus } from "../../store/gameControlSlice";
import { onGridCellClick, updateGrid } from "../../store/gridSlice";

const GridComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  // SELECTORS
  const rows = useAppSelector((state) => state.gridSize.rows);
  const cols = useAppSelector((state) => state.gridSize.cols);
  const gameStatus = useAppSelector((state) => state.gameControl.gameStatus);
  const grid = useAppSelector((state) => state.grid.grid);

  const gameIsActive = gameStatus === GameStatus.START;

  // RERENDER CONTROL
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (gameIsActive) {
      interval = setInterval(() => {
        startSimulation();
        dispatch(updateGeneration());
      }, 200);
    }

    return () => {
      clearInterval(interval);
    };
  });

  // RERENDER CONTROL
  // control clicked button and grid mode
  useEffect(() => {
    if (gameStatus === GameStatus.STOP) {
      return clearInterval();
    }
  }, [gameStatus]);

  const onCellClick = (x: number, y: number): void => {
    dispatch(onGridCellClick({ grid, x, y }));
  };

  const startSimulation = (): void => {
    // update counter and btn condition
    dispatch(resetPopulation());
    dispatch(updateGrid({ grid, rows, cols }));
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
