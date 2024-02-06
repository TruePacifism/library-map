import React, { useMemo, useRef } from "react";
import styles from "./Map.module.css";
import { Map, GeoObject, Placemark } from "@pbe/react-yandex-maps";
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
  const ref = useRef(null);

  const centerCoords = useMemo(() => writers[0].coordinates, []);
  return (
    <div className={styles.mapContainer} style={{ position: "relative" }}>
      <Map
        instanceRef={(e) => {
          e?.action.events.add("drag", (e) => {
            console.log(e);
          });
        }}
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
