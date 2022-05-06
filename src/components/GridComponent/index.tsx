import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";

import cn from "classnames";

// REDUX
import {
  decreasePopulation,
  increasePopulation,
  resetGeneration,
  resetPopulation,
  updateGeneration,
} from "../../store/counterSlice";

// SHARED
import { GridType } from "../../shared/types";
import { createEmptyGridArr, createRandomGridArr } from "../../shared/utils";
import { GameStatus, GridMode } from "../../store/gameControlSlice";
import { createEmptyGrid, createRandomGrid } from "../../store/gridSlice";

const GridComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  // SELECTORS
  const rows = useAppSelector((state) => state.gridSize.rows);
  const cols = useAppSelector((state) => state.gridSize.cols);
  const gameStatus = useAppSelector((state) => state.gameControl.gameStatus);
  const gridMode = useAppSelector((state) => state.gameControl.gridMode);

  const gameIsActive = gameStatus === GameStatus.START;
  const emptyGrid = createEmptyGridArr(rows, cols);

  // STATE
  const [grid, setGrid] = useState<GridType>(emptyGrid);

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
    if (gridMode === GridMode.RANDOM) {
      dispatch(createRandomGrid({ cols: 30, rows: 30 }));
      return setGrid(createRandomGridArr(rows, cols));
    }
    if (gridMode === GridMode.EMPTY) {
      dispatch(resetGeneration());
      dispatch(resetPopulation());
      return setGrid(emptyGrid);
    }
    if (gameStatus === GameStatus.STOP) {
      return clearInterval();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridMode, gameStatus]);

  const onCellClick = (x: number, y: number): void => {
    // deep clone of actual grid
    const newGrid = grid.map((cols) => [...cols]); // cell toggle

    if (newGrid[x][y]) {
      newGrid[x][y] = 0;
      dispatch(decreasePopulation());
    } else {
      newGrid[x][y] = 1;
      dispatch(increasePopulation());
    } // update the grid

    return setGrid(newGrid);
  };

  const findAliveNeighbours = (x: number, y: number): number => {
    let sum = 0;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        // backmail the grid size limits
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }

    sum -= grid[x][y];
    return sum;
  };

  const startSimulation = (): void => {
    // update counter and btn condition
    dispatch(resetPopulation());

    let nextGrid = createEmptyGridArr(rows, cols);
    // verify by 3x3 square
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let neighbours = findAliveNeighbours(i, j);

        // current cell
        let curr = grid[i][j];

        if (curr) {
          dispatch(increasePopulation());
        }
        /*
          Game rules in action:
        */
        // Any dead cell with three live neighbours becomes a live cell.

        if (!curr && neighbours === 3) {
          nextGrid[i][j] = 1;
          // Any live cell with two or three live neighbours survives.
        } else if (curr && (neighbours === 2 || neighbours === 3)) {
          nextGrid[i][j] = 1;
        } else {
          // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
          nextGrid[i][j] = 0;
        }
      }
    }
    // updated grid state
    return setGrid(nextGrid);
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
