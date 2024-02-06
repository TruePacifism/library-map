import React, { useRef } from "react";
import styles from "./MapPopup.module.css";
import { writerInfo } from "../utils/types";
import { CSSTransition } from "react-transition-group";

type propsType = {
  writer: writerInfo;
  x: number;
  y: number;
  isShowing: boolean;
};

export default function MapPopup({
  writer: {
    name,
    photo,
    birthDate,
    birthCity,
    bio,
    books,
    genres,
    deathCity,
    deathDate,
    coordinates,
  },
  x,
  y,
  isShowing,
}: propsType) {
  console.log(isShowing);

  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <CSSTransition
      in={isShowing}
      timeout={500}
      classNames={{
        enter: styles.popupEnter,
        enterActive: styles.popupEnterActive,
        exit: styles.popupExit,
        exitActive: styles.popupExitActive,
      }}
      unmountOnExit
    >
      <div
        className={styles.popup}
        style={{
          top: y,
          // y - popupRef.current?.getBoundingClientRect().height! < 52
          //   ? 52
          //   : y - popupRef.current?.getBoundingClientRect().height!,
          left: x,
          // x - popupRef.current?.getBoundingClientRect().width! <
          // (window.innerWidth / 100) * 40
          //   ? (window.innerWidth / 100) * 40
          //   : x - popupRef.current?.getBoundingClientRect().width!,
        }}
        ref={popupRef}
      >
        <div className={styles.container}>
          <img className={styles.photo} src={photo} alt="" />
          <div className={styles.infoContainer}>
            <span className={styles.name}>{name}</span>
            <span
              className={styles.birthTime}
            >{`${birthDate.day} ${birthDate.month} ${birthDate.year} - ${deathDate.day} ${deathDate.month} ${deathDate.year}`}</span>
            <span className={styles.birthcity}>{birthCity}</span>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
