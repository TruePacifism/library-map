export type bookInfo = {
  name: string;
  genres: string[];
  sbornik: string;
  year: number;
};

export type writerInfo = {
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
  books: bookInfo[];
};
export type stateType = {
  writers: writerInfo[];
  selectedWriter: writerInfo | null;
};
