import { YMaps } from "@pbe/react-yandex-maps";
import styles from "./App.module.css";
import MyMap from "./Map/Map";
import WritersList from "./WritersList/WritersList";
import { Dispatch, SetStateAction, useState } from "react";
import russianFlagImage from "./images/russian-flag.png";
import { ReactComponent as ListIcon } from "./images/list-icon.svg";
import { ReactComponent as MapIcon } from "./images/map-icon.svg";

type showingModeType = "map" | "list";

function App() {
  const [showingMode, setShowingMode]: [
    showingModeType,
    Dispatch<SetStateAction<showingModeType>>
  ] = useState("map" as showingModeType);
  return (
    <YMaps
      query={{
        apikey: "68bf9d85-0ca9-461c-8405-422ed94b196d",
        lang: "ru_RU",
      }}
    >
      <div className={styles.App}>
        <header className={styles.footer}></header>
        <main className={styles.main}>
          <img src={russianFlagImage} className={styles.flag} alt="" />
          <div
            className={
              styles.contentContainer +
              " " +
              (showingMode !== "list" ? styles.hidden : "")
            }
          >
            <WritersList />
          </div>
          <div
            className={
              styles.contentContainer +
              " " +
              (showingMode !== "map" ? styles.hidden : "")
            }
          >
            <MyMap />
          </div>
          {/* {(function (): ReactNode {
            switch (showingMode) {
              case "list":
                return <WritersList />;
              case "map":
                return <MyMap />;
            }
          })()} */}
          <div className={styles.switcherContainer}>
            <ListIcon
              className={styles.switcher}
              style={{
                opacity: showingMode === "list" ? 1 : 0,
                pointerEvents: showingMode !== "list" ? "none" : "all",
              }}
              onClick={(e) => {
                e.currentTarget.style.opacity = "0";
                const timeout = setTimeout(() => {
                  setShowingMode("map");
                  clearTimeout(timeout);
                }, 250);
              }}
            />
            <MapIcon
              className={styles.switcher}
              style={{
                opacity: showingMode === "map" ? 1 : 0,
                pointerEvents: showingMode !== "map" ? "none" : "all",
              }}
              onClick={(e) => {
                e.currentTarget.style.opacity = "0";
                const timeout = setTimeout(() => {
                  setShowingMode("list");
                  clearTimeout(timeout);
                }, 250);
              }}
            />
          </div>
        </main>
      </div>
    </YMaps>
  );
}

export default App;
