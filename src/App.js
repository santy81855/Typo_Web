import logo from "./logo.svg";
import "./styles/App.css";
import Menu from "./components/Menu";
import OptionsMenu from "./components/OptionsMenu";
import TextDisplay from "./components/TextDisplay";

function App() {
  return (
    <div className="App">
      <Menu />
      <OptionsMenu />
      <TextDisplay />
    </div>
  );
}

export default App;
