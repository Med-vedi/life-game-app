import React from "react";
import { useAppSelector } from "../../hook";

const Header: React.FC = () => {
  const generation = useAppSelector((state) => state.grid.generation);
  const population = useAppSelector((state) => state.grid.population);

  return (
    <div className="gridpage__header">
      <h2>Generation: {generation}</h2>
      <h2>Population: {population}</h2>
    </div>
  );
};
export default Header;
