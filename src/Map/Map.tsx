import React, { useMemo } from "react";
import styles from "./Map.module.css";
import { Map } from "@pbe/react-yandex-maps";
import { useSelector } from "react-redux";
import { stateType, writerInfo } from "../utils/types";
import MyPlacemark from "../MyPlacemark/MyPlacemark";
export default function MyMap() {
  const writers = useSelector<stateType, writerInfo[]>(
    (store) => store.writers
  );
  const selectedWriterName = useSelector<stateType, writerInfo | null>(
    (store) => store.selectedWriter
  );

  const centerCoords = useMemo(
    () =>
      selectedWriterName
        ? selectedWriterName.coordinates
        : writers[0].coordinates,
    [selectedWriterName, writers]
  );
  return (
    <div className={styles.mapContainer} style={{ position: "relative" }}>
      <Map
        state={{ center: centerCoords, zoom: 4 }}
        options={{ minZoom: 4 }}
        width={"100%"}
        height={"100%"}
      >
        {writers.map((writer) => (
          <MyPlacemark
            writer={writer}
            isSelected={selectedWriterName === writer}
          />
        ))}
      </Map>
    </div>
  );
}
