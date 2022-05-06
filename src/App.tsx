import Footer from "./components/Footer";
import GridComponent from "./components/GridComponent";
import Header from "./components/Header";

import "./style.css";

const App: React.FC = () => {
  return (
    <div className="gridpage">
      <Header />
      <GridComponent />
      <Footer />
    </div>
  );
};

export default App;
