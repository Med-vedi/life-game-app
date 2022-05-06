import { useEffect, useState } from "react";
import { BtnLabel, GridType, IGridDimension } from "../../shared/types";
import cn from "classnames";
import { createEmptyGridArr, createRandomGridArr } from "../../shared/utils";

const GridComponent = ({ rows, cols }: IGridDimension) => {
  const emptyGrid = createEmptyGridArr(rows, cols);

  // STATE
  const [aliveCells, setAliveCells] = useState<number>(0);
  const [isLiveActive, setLiveIsAlive] = useState<boolean>(false);
  const [isRandomMode, setIsRandomMode] = useState<boolean>(false);
  const [genCounter, setGenCounter] = useState<number>(0);
  const [grid, setGrid] = useState<GridType>(emptyGrid);

  // RERENDER CONTROL
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    if (isLiveActive) {
      interval = setInterval(() => {
        startSimulation();
        setGenCounter((prev) => (prev += 1));
        !aliveCells && !isRandomMode && handleFinishGame();
      }, 200);
    }

    return () => {
      clearInterval(interval);
    };
  });

  const onCellClick = (x: number, y: number): void => {
    // deep clone of actual grid
    const newGrid = grid.map((cols) => [...cols]); // cell toggle

    if (newGrid[x][y]) {
      newGrid[x][y] = 0;
      setAliveCells((prev) => (prev -= 1));
    } else {
      newGrid[x][y] = 1;
      setAliveCells((prev) => (prev += 1));
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

  const handleFinishGame = () => {
    setLiveIsAlive(false);
    return clearInterval();
  }; // BUTTONS ACTIONS

  const startSimulation = (): void => {
    // update counter and btn condition
    setAliveCells(0);
    setIsRandomMode(false); // new grid state

    let nextGrid = createEmptyGridArr(rows, cols); // verify by 3x3 square

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let neighbours = findAliveNeighbours(i, j); // current cell

        let curr = grid[i][j];

        if (curr) {
          setAliveCells((prev) => prev + curr);
        }
        /*
          Game rules in action:
        */
        // Any dead cell with three live neighbours becomes a live cell.

        if (!curr && neighbours === 3) {
          nextGrid[i][j] = 1; // Any live cell with two or three live neighbours survives.
        } else if (curr && (neighbours === 2 || neighbours === 3)) {
          nextGrid[i][j] = 1;
        } else {
          // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
          nextGrid[i][j] = 0;
        }
      }
    } // updated grid state

    return setGrid(nextGrid);
  };

  const onGenerateRandomLifeClick = () => {
    setIsRandomMode(true);
    setGrid(createRandomGridArr(rows, cols));
  };

  const onResetClick = () => {
    handleFinishGame();
    setGenCounter(0);
    setGrid(emptyGrid);
    setAliveCells(0);
  };

  return (
    <div className="gridpage">
      <div className="gridpage__header">
        <h2>Generation: {genCounter}</h2>
        <h2>Population: {isRandomMode ? "Random" : aliveCells}</h2>
      </div>

      <div
        className="gridpage__grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols},10px)`,
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

      <div className="gridpage__footer">
        <button className="reset" onClick={onResetClick}>
          {BtnLabel.RESET}
        </button>
        <button
          className={cn(isLiveActive ? "stop" : "start")}
          disabled={!aliveCells && !isRandomMode}
          onClick={() => {
            setLiveIsAlive(!isLiveActive);
          }}
        >
          {isLiveActive ? BtnLabel.STOP : BtnLabel.START}
        </button>
        <button className="random" onClick={onGenerateRandomLifeClick}>
          {BtnLabel.RANDOM}
        </button>
      </div>
    </div>
  );
};

export default GridComponent;
