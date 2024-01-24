import React from "react";
import styles from "./WritersList.module.css";
import { useSelector } from "react-redux";
import { stateType, writerInfo } from "../utils/types";
import WritersListItem from "../WritersListItem/WritersListItem";

export default function WritersList() {
  const writers = useSelector<stateType, writerInfo[]>(
    (store) => store.writers
  );
  const selectedWriter = useSelector<stateType, string | null>(
    (store) => store.selectedWriterName
  );
  return (
    <ul className={styles.list}>
      {writers.map((writer) => (
        <WritersListItem
          key={writer.name}
          writerInfo={writer}
          isSelected={writer.name === selectedWriter}
        />
      ))}
    </ul>
  );
}
