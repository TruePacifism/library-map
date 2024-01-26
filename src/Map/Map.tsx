import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import styles from "./Map.module.css";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";
import { stateType, writerInfo } from "../utils/types";
import { selectWriterAction } from "../utils/store";
import { ReactComponent as MapIcon } from "../images/icons/map-pin.svg";
import ReactDOMServer from "react-dom/server";
import MapPopup from "../MapPopup/MapPopup";
export default function MyMap() {
  const writers = useSelector<stateType, writerInfo[]>(
    (store) => store.writers
  );
  const selectedWriterName = useSelector<stateType, writerInfo | null>(
    (store) => store.selectedWriter
  );

  const dispatch = useDispatch();
  const [showingWriter, setShowingWriter]: [
    writerInfo,
    Dispatch<SetStateAction<writerInfo>>
  ] = useState(writers[0]);
  const [popupX, setPopupX]: [number, Dispatch<SetStateAction<number>>] =
    useState(0);
  const [popupY, setPopupY]: [number, Dispatch<SetStateAction<number>>] =
    useState(0);
  const [isPopupShowing, setIsPopupShowing]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const centerCoords = useMemo(
    () =>
      selectedWriterName
        ? selectedWriterName.coordinates
        : writers[0].coordinates,
    [selectedWriterName, writers]
  );
  return (
    <>
      <Map
        state={{ center: centerCoords, zoom: 3 }}
        className={styles.mapContainer}
      >
        {writers.map((writer) => (
          <Placemark
            geometry={writer.coordinates}
            onMouseEnter={(e: any) => {
              const event: MouseEvent = e.originalEvent.domEvent.originalEvent;
              const x: number = event.clientX - 20;
              const y: number = event.clientY - 20;
              setPopupX(x);
              setPopupY(y);
              setIsPopupShowing(true);
              setShowingWriter(writer);
            }}
            onMouseLeave={(e: any) => {
              setIsPopupShowing(false);
            }}
            onClick={(e: any) => {
              dispatch(selectWriterAction(writer));
            }}
            options={{
              iconColor: "#FF00FF",
              iconShape: {
                type: ReactDOMServer.renderToStaticMarkup(
                  <MapIcon className={styles.placemark} />
                ),
              },
            }}
          />
        ))}
      </Map>
      <MapPopup
        writer={showingWriter}
        x={popupX}
        y={popupY}
        isShowing={isPopupShowing}
      />
    </>
  );
}
