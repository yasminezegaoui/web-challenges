import "./App.css";
import Timer from "./components/Timer";
import NotesList from "./components/NotesList";
import Motivation from "./components/Motivation";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-heading">Session 1</h1>

      <Timer />
      <NotesList />
      <Motivation />
    </div>
  );
}

export default App;
