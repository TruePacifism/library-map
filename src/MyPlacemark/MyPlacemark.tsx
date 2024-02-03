import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./MyPlacemark.module.css";
import { selectWriterAction } from "../utils/store";
import { ReactComponent as MapIcon } from "../images/icons/map-pin.svg";
import ReactDOMServer from "react-dom/server";
import MapPopup from "../MapPopup/MapPopup";
import { Placemark } from "@pbe/react-yandex-maps";
import { stateType, writerInfo } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";

type propsType = {
  writer: writerInfo;
  isSelected: boolean;
};
export default function MyPlacemark({ writer, isSelected }: propsType) {
  const [popupX, setPopupX]: [number, Dispatch<SetStateAction<number>>] =
    useState(0);
  const [popupY, setPopupY]: [number, Dispatch<SetStateAction<number>>] =
    useState(0);
  const dispatch = useDispatch();
  const selectedWriter = useSelector<stateType, writerInfo | null>(
    (state) => state.selectedWriter
  );
  return (
    <>
      <Placemark
        geometry={writer.coordinates}
        onHover={() => {
          console.log("hovered");
        }}
        onBaloonOpen={() => {
          console.log("baloon");
        }}
        onClick={(e: any) => {
          if (selectedWriter === writer) {
            console.log("no changes");
            return;
          }
          const event: MouseEvent = e.originalEvent.domEvent.originalEvent;
          const x: number = event.clientX - 20;
          const y: number = event.clientY - 20;
          setPopupX(x);
          setPopupY(y);
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
      <MapPopup writer={writer} x={popupX} y={popupY} isShowing={isSelected} />
    </>
  );
}
