import React, { useRef } from "react";
import styles from "./MapPopup.module.css";
import { writerInfo } from "../utils/types";

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
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={styles.popup}
      style={{
        opacity: isShowing ? 1 : 0,
        top:
          y - popupRef.current?.getBoundingClientRect().height! < 52
            ? 52
            : y - popupRef.current?.getBoundingClientRect().height!,
        left:
          x - popupRef.current?.getBoundingClientRect().width! <
          (window.innerWidth / 100) * 40
            ? (window.innerWidth / 100) * 40
            : x - popupRef.current?.getBoundingClientRect().width!,
      }}
      ref={popupRef}
    >
      <div className={styles.container}>
        <img className={styles.photo} src={photo} alt="" />
        <span className={styles.name}>{name}</span>
        <span
          className={styles.birthTime}
        >{`${birthDate.day} ${birthDate.month} ${birthDate.year} - ${deathDate.day} ${deathDate.month} ${deathDate.year}`}</span>
      </div>
    </div>
  );
}
