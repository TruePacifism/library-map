import { YMaps } from "@pbe/react-yandex-maps";
import "./App.css";
import MyMap from "./Map/Map";
import WritersList from "./WritersList/WritersList";

function App() {
  return (
    <YMaps
      query={{
        apikey: "68bf9d85-0ca9-461c-8405-422ed94b196d",
        lang: "ru_RU",
      }}
    >
      <div className="App">
        <footer className="footer"></footer>
        <main className="main">
          <WritersList />
          <MyMap />
        </main>
      </div>
    </YMaps>
  );
}

export default App;
