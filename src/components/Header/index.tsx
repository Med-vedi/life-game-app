import React from "react";
import { useAppSelector } from "../../hook";
import { GridMode } from "../../store/gameControlSlice";

const Header: React.FC = () => {
  const generation = useAppSelector((state) => state.counter.generation);
  const population = useAppSelector((state) => state.counter.population);
  const gridMode = useAppSelector((state) => state.gameControl.gridMode);

  const isRandomMode = gridMode === GridMode.RANDOM;

  return (
    <div className="gridpage__header">
      <h2>Generation: {generation}</h2>
      <h2>Population: {isRandomMode ? "Random" : population}</h2>
    </div>
  );
};
export default Header;
