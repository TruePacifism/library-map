import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./Map.module.css";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";
import { stateType, writerInfo } from "../utils/types";
import WritersListItem from "../WritersListItem/WritersListItem";
import { selectWriterAction } from "../utils/store";
import { ReactComponent as MapIcon } from "../images/icons/map-pin.svg";
import { useYMaps } from "@pbe/react-yandex-maps";
import ReactDOMServer from "react-dom/server";
export default function MyMap() {
  const writers = useSelector<stateType, writerInfo[]>(
    (store) => store.writers
  );
  const ymaps = useYMaps(["templateLayoutFactory", "Placemark"]);
  const icon = ymaps?.templateLayoutFactory?.createClass(
    `${ReactDOMServer.renderToStaticMarkup(
      <MapIcon
        className={styles.placemark}
        onClick={() => {
          console.log("rer");
        }}
      />
    )}`
  );

  const dispatch = useDispatch();
  const [popupX, setPopupX]: [number, Dispatch<SetStateAction<number>>] =
    useState(0);
  const [popupY, setPopupY]: [number, Dispatch<SetStateAction<number>>] =
    useState(0);
  const [isPopupShowing, setIsPopupShowing]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [popupContent, setPopupContent]: [
    ReactElement,
    Dispatch<SetStateAction<ReactElement>>
  ] = useState(<WritersListItem writerInfo={writers[0]} />);
  const centerCoords = useMemo(() => [55.751574, 37.573856], []);
  const popupRef = useRef<HTMLDivElement>(null);
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
              console.log(e);

              setPopupContent(<WritersListItem writerInfo={writer} />);
              // const popupRect = popupRef.current?.getBoundingClientRect();
              // const popupHeight = popupRect?.height;
              // const popupWidth = popupRect?.width;
              // console.log(popupRect);

              const x: number = event.clientX - 20;
              const y: number = event.clientY - 20;
              setPopupX(x);
              setPopupY(y);
              setIsPopupShowing(true);
            }}
            onMouseLeave={(e: any) => {
              setIsPopupShowing(false);
            }}
            onClick={(e: any) => {
              dispatch(selectWriterAction(writer));
            }}
            options={{ iconLayout: icon }}
          />
        ))}
      </Map>
      <div
        className={styles.popup}
        style={{
          opacity: isPopupShowing ? 1 : 0,
          top:
            popupY - popupRef.current?.getBoundingClientRect().height! < 0
              ? 0
              : popupY - popupRef.current?.getBoundingClientRect().height!,
          left:
            popupX - popupRef.current?.getBoundingClientRect().width! < 0
              ? 0
              : popupX - popupRef.current?.getBoundingClientRect().width!,
        }}
        ref={popupRef}
      >
        {popupContent}
      </div>
    </>
  );
}