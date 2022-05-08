import React, { useState } from "react";

// REDUX
import { createEmptyGrid } from "../../store/gridSlice";

import { useAppDispatch, useAppSelector } from "../../hook";
import { GameStatus, GridMode } from "../../shared/types";
import { startGame } from "../../store/gameControlSlice";

const GridSize: React.FC = () => {
  const dispatch = useAppDispatch();

  // SELECTORS
  const cols = useAppSelector((state) => state.grid.cols);
  const rows = useAppSelector((state) => state.grid.rows);

  const [width, setWidth] = useState<number>(cols);
  const [height, setHeight] = useState<number>(rows);

  const onWidthChange = (value: number) => {
    setWidth(value);
    dispatch(
      startGame({ gameStatus: GameStatus.STOP, gridMode: GridMode.EMPTY })
    );
    dispatch(createEmptyGrid({ cols: value, rows }));
  };

  const onHeightChange = (value: number) => {
    setHeight(value);
    dispatch(
      startGame({ gameStatus: GameStatus.STOP, gridMode: GridMode.EMPTY })
    );
    dispatch(createEmptyGrid({ cols, rows: value }));
  };
  return (
    <div className="gridpage__gridsize">
      H:{" "}
      <input
        value={height}
        onChange={(e) => onHeightChange(+e.target.value)}
        type="number"
        className="gridpage__gridsize__input"
      />
      W:{" "}
      <input
        value={width}
        onChange={(e) => onWidthChange(+e.target.value)}
        type="number"
        className="gridpage__gridsize__input"
      />
    </div>
  );
};

export default GridSize;
