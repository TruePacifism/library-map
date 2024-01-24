import React from "react";
import styles from "./WritersListItem.module.css";
import { writerInfo } from "../utils/types";
import { ReactComponent as MapPinIcon } from "../images/icons/map-pin.svg";

type propsType = {
  isSelected?: boolean;
  writerInfo: writerInfo;
};

export default function WritersListItem({
  isSelected,
  writerInfo: {
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
}: propsType) {
  return (
    <li
      className={styles.container}
      style={{ backgroundColor: isSelected ? "white" : undefined }}
    >
      <img className={styles.photo} src={photo} alt="" />
      <div className={styles.mainInfoContainer}>
        <h2 className={styles.name}>{name}</h2>
        <span
          className={styles.birthTime}
        >{`${birthDate.day} ${birthDate.month} ${birthDate.year} - ${deathDate.day} ${deathDate.month} ${deathDate.year}`}</span>
        <div className={styles.birthCityContainer}>
          <MapPinIcon className={styles.mapIcon} />

          <span className={styles.birthCity}>{birthCity}</span>
        </div>
        {/* <span className={styles.genresHeading}>Жанры:</span>
        <ul className={styles.genresList}>
          {genres.map((genre) => (
            <li className={styles.genresItem}>{genre}</li>
          ))}
        </ul> */}
      </div>
    </li>
  );
}
