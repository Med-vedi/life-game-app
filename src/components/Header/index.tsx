import React, { useEffect } from "react";
import { useAppSelector } from "../../hook";
import { GridMode } from "../../store/gameControlSlice";

const Header: React.FC = () => {
  const generation = useAppSelector((state) => state.grid.generation);
  const population = useAppSelector((state) => state.grid.population);
  const gridMode = useAppSelector((state) => state.gameControl.gridMode);

  useEffect(() => {
    if (population) {
      console.log("=========================================");
      console.log(`WE GOT: `, population);
      console.log("=========================================");
    }
  }, [population]);

  const isRandomMode = gridMode === GridMode.RANDOM;

  return (
    <div className="gridpage__header">
      <h2>Generation: {generation}</h2>
      <h2>Population: {isRandomMode ? "Random" : population}</h2>
    </div>
  );
};
export default Header;
