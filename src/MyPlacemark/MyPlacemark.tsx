import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./MyPlacemark.module.css";
import { ReactComponent as MapIcon } from "../images/icons/map-pin.svg";
import ReactDOMServer from "react-dom/server";
import MapPopup from "../MapPopup/MapPopup";
import { Placemark } from "@pbe/react-yandex-maps";
import { writerInfo } from "../utils/types";

type propsType = {
  writer: writerInfo;
  isSelected: boolean;
};
export default function MyPlacemark({ writer, isSelected }: propsType) {
  const [popupX, setPopupX]: [number, Dispatch<SetStateAction<number>>] =
    useState(0);
  const [isShowing, setIsShowing]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [isClicked, setIsClicked]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [popupY, setPopupY]: [number, Dispatch<SetStateAction<number>>] =
    useState(0);
  useEffect(() => {
    setIsShowing(isClicked);
  }, [isClicked]);
  return (
    <>
      <Placemark
        geometry={writer.coordinates}
        onClick={(e: any) => {
          setIsClicked((oldIsShowing) => {
            if (oldIsShowing) {
              return false;
            } else {
              const event: MouseEvent | TouchEvent =
                e.originalEvent.domEvent.originalEvent;
              console.log(event);
              let x: number = 0;
              let y: number = 0;
              if ((event as MouseEvent).x !== undefined) {
                x = (event as MouseEvent).x;
                y = (event as MouseEvent).y;
              } else {
                x = (event as TouchEvent).changedTouches[0].clientX;
                y = (event as TouchEvent).changedTouches[0].clientY;
              }
              setPopupX(x);
              setPopupY(y);
              return true;
            }
          });
          // dispatch(selectWriterAction(writer));
        }}
        onMouseEnter={(e: any) => {
          if (isClicked) {
            return;
          }
          setIsShowing((oldIsShowing) => {
            const event: MouseEvent = e.originalEvent.domEvent.originalEvent;
            console.log(event);
            let x: number = 0;
            let y: number = 0;
            if ((event as MouseEvent).x !== undefined) {
              x = (event as MouseEvent).x;
              y = (event as MouseEvent).y;
            }
            setPopupX(x);
            setPopupY(y);
            return true;
          });
          // dispatch(selectWriterAction(writer));
        }}
        onMouseLeave={(e: any) => {
          if (isClicked) {
            return;
          }
          setIsShowing((oldIsShowing) => {
            return false;
          });
          // dispatch(selectWriterAction(writer));
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
      <MapPopup writer={writer} x={popupX} y={popupY} isShowing={isShowing} />
    </>
  );
}
