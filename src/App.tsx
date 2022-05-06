import GridComponent from "./components/GridComponent";

import "./style.css";
const App = () => {
  return (
    <div>
      <GridComponent rows={30} cols={30} />
    </div>
  );
};

export default App;
