import React, { MouseEventHandler } from "react";
import styles from "./WritersListItem.module.css";
import { writerInfo } from "../utils/types";
import { useDispatch } from "react-redux";
import { selectWriterAction } from "../utils/store";
import { CSSTransition } from "react-transition-group";

type propsType = {
  isSelected?: boolean;
  writerInfo: writerInfo;
};

export default function WritersListItem({ isSelected, writerInfo }: propsType) {
  const { name, photo, birthDate, birthCity, deathDate, bio } = writerInfo;
  const dispatch = useDispatch();
  const handleShowButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    dispatch(selectWriterAction(writerInfo));
  };
  return (
    <li className={styles.container}>
      <div className={styles.visiblePartContainer}>
        <img className={styles.photo} src={photo} alt="" />
        <div className={styles.mainInfoContainer}>
          <h2 className={styles.name}>{name}</h2>
          <span
            className={styles.birthTime}
          >{`${birthDate.day} ${birthDate.month} ${birthDate.year} - ${deathDate.day} ${deathDate.month} ${deathDate.year}`}</span>
          <span className={styles.birthCity}>{birthCity}</span>
          <button className={styles.button} onClick={handleShowButton}>
            {/* <MapPinIcon className={styles.mapIcon} /> */}
            <span className={styles.buttonText}>Вся информация</span>
          </button>
          {/* <span className={styles.genresHeading}>Жанры:</span>
        <ul className={styles.genresList}>
          {genres.map((genre) => (
            <li className={styles.genresItem}>{genre}</li>
          ))}
        </ul> */}
        </div>
      </div>
      <CSSTransition
        in={isSelected}
        timeout={500}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exit: styles.exit,
          exitActive: styles.exitActive,
        }}
        unmountOnExit
      >
        <p className={styles.bio}>{bio}</p>
      </CSSTransition>
    </li>
  );
}
