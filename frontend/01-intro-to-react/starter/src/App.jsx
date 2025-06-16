import "./App.css";
import Timer from "./components/Timer";
import NotesList from "./components/NotesList";
import Motivation from "./components/Motivation";

function App() {
  return (
    <div className="app-container">
      <Timer />
      <NotesList />
      <Motivation />
    </div>
  );
}

export default App;
