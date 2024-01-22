import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./Map.module.css";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import photo1 from "../images/Рисунок1.jpg";

// type bookInfo = {
//   name: string;
//   genres: string[];
//   sbornik: string;
//   year: number;
// };

type writerInfo = {
  name: string;
  photo: string;
  birthDate: {
    day: number;
    month: string;
    year: number;
  };
  deathDate: {
    day: number;
    month: string;
    year: number;
  };
  birthCity: string;
  deathCity: string;
  genres: string[];
  bio: string;
  coordinates: [number, number];
};

const writers: writerInfo[] = [
  {
    name: "Борис Васильев",
    photo: photo1,
    birthDate: {
      day: 21,
      month: "мая",
      year: 1924,
    },
    deathDate: {
      day: 11,
      month: "марта",
      year: 2013,
    },
    birthCity: "Смоленск",
    deathCity: "Москва",
    genres: ["Повесть", "Сценарий", "Исторический роман"],
    bio: `С началом Великой Отечественной войны Борис Васильев ушёл на фронт добровольцем в составе истребительного комсомольского батальона, 3 июля 1941 года батальон направлен под Смоленск, где попал в окружение. Васильев самостоятельно вышел из окружения в начале октября 1941 года. Получил направление в полковую кавалерийскую школу, а затем — в пулемётную школу, после окончания которой служил в 8-м гвардейском воздушно-десантном полку 3-й гвардейской воздушно-десантной дивизии. Во время воздушного десанта под Вязьмой 16 марта 1943 года он попал на минную растяжку и с тяжёлой контузией был доставлен в госпиталь[7]. После этого ранения и его излечения, Васильев осенью 1943 года направлен на учёбу в Военную академию бронетанковых и механизированных войск имени И. В. Сталина. 
В 1946 году окончил инженерный факультет академии, работал испытателем колёсных и гусеничных машин на Урале. Уволен в запас из рядов ВС Союза ССР в 1954 году в воинском звании капитан-инженер
`,
    coordinates: [42.751574, 66.573853],
  },
  {
    name: "Борис Васильев",
    photo: photo1,
    birthDate: {
      day: 21,
      month: "мая",
      year: 1924,
    },
    deathDate: {
      day: 11,
      month: "марта",
      year: 2013,
    },
    birthCity: "Смоленск",
    deathCity: "Москва",
    genres: ["Повесть", "сценарий", "исторический роман"],
    bio: `С началом Великой Отечественной войны Борис Васильев ушёл на фронт добровольцем в составе истребительного комсомольского батальона, 3 июля 1941 года батальон направлен под Смоленск, где попал в окружение. Васильев самостоятельно вышел из окружения в начале октября 1941 года. Получил направление в полковую кавалерийскую школу, а затем — в пулемётную школу, после окончания которой служил в 8-м гвардейском воздушно-десантном полку 3-й гвардейской воздушно-десантной дивизии. Во время воздушного десанта под Вязьмой 16 марта 1943 года он попал на минную растяжку и с тяжёлой контузией был доставлен в госпиталь[7]. После этого ранения и его излечения, Васильев осенью 1943 года направлен на учёбу в Военную академию бронетанковых и механизированных войск имени И. В. Сталина. 
В 1946 году окончил инженерный факультет академии, работал испытателем колёсных и гусеничных машин на Урале. Уволен в запас из рядов ВС Союза ССР в 1954 году в воинском звании капитан-инженер
`,
    coordinates: [55.751574, 37.573856],
  },
];

export default function MyMap() {
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
  ] = useState(
    <div>
      <img
        className={styles.popupPhoto}
        src={writers[0].photo}
        alt={writers[0].name}
      />
      <h2>{writers[0].name}</h2>
      <p>{writers[0].bio}</p>
      <span>{`${writers[0].birthDate.day} ${writers[0].birthDate.month} ${writers[0].birthDate.year} - ${writers[0].deathDate.day} ${writers[0].deathDate.month} ${writers[0].deathDate.year}`}</span>
    </div>
  );
  const centerCoords = useMemo(() => [55.751574, 37.573856], []);
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <YMaps
        query={{
          apikey: "68bf9d85-0ca9-461c-8405-422ed94b196d",
          lang: "ru_RU",
        }}
      >
        <Map
          state={{ center: centerCoords, zoom: 3 }}
          className={styles.mapContainer}
          width={"100%"}
          height={"100%"}
        >
          {writers.map((writer) => (
            <Placemark
              geometry={writer.coordinates}
              onMouseEnter={(e: any) => {
                const event: MouseEvent =
                  e.originalEvent.domEvent.originalEvent;
                console.log(e);

                setPopupContent(
                  <div>
                    <img
                      className={styles.popupPhoto}
                      src={writer.photo}
                      alt={writer.name}
                    />
                    <h2>{writer.name}</h2>
                    <p>{writer.bio}</p>
                    <span>{`${writer.birthDate.day} ${writer.birthDate.month} ${writer.birthDate.year} - ${writer.deathDate.day} ${writer.deathDate.month} ${writer.deathDate.year}`}</span>
                  </div>
                );
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
            />
          ))}
        </Map>
      </YMaps>
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
