import "./App.css";
import MyMap from "./Map/Map";
import WritersList from "./WritersList/WritersList";

function App() {
  return (
    <div className="App">
      <footer className="footer"></footer>
      <main className="main">
        <WritersList />
        <MyMap />
      </main>
    </div>
  );
}

export default App;
