import type { IFilm } from "@/types/product";
import { ref } from "vue";
import { useFilmStore } from "@/stores/film";
interface IResponseFilm {
  film: IFilm[];
}

export const getRandomFilm = async (): Promise<IResponseFilm> => {
  try {
    const fetchResponse = await fetch(
      `https://cinemaguide.skillbox.cc/movie/random`
    );
    const film: IFilm[] = await fetchResponse.json();
    return {
      film: film,
    };
  } catch (err) {
    throw new Error("product response was not ok");
  }
};

export const getRandomFilmTop10 = async () => {
  try {
    const fetchResponse = await fetch(
      `https://cinemaguide.skillbox.cc/movie/top10`
    );

    const response = await fetchResponse.json();
    const film: IFilm[] = response;
    response.value = film;
    return {
      response,
    };
  } catch (err) {
    throw new Error("product response was not ok");
  }
};
export const getRandomFilmId = async (id: number) => {
  try {
    const fetchResponse = await fetch(
      `https://cinemaguide.skillbox.cc/movie/${id}`
    );

    const response = await fetchResponse.json();
    // const film: IFilm[] = response;
    response.value = response;
    return {
      response,
    };
  } catch (err) {
    throw new Error("product response was not ok");
  }
};
export const genres = async () => {
  try {
    const fetchResponse = await fetch(
      `https://cinemaguide.skillbox.cc/movie/genres`
    );

    const response = await fetchResponse.json();
    // const film: IFilm[] = response;
    response.value = response;
    return {
      response,
    };
  } catch (err) {
    throw new Error("product response was not ok");
  }
};
export const getFilterGenre = async (genre: string) => {
  try {
    const query = new URLSearchParams({
      genre: String(genre),
    });
    const fetchResponse = await fetch(
      `https://cinemaguide.skillbox.cc/movie?${query}`
    );
    const response = await fetchResponse.json();
    const film: IFilm[] = response;
    return {
      response,
    };
  } catch (err) {
    throw new Error("product response was not ok");
  }
};
export const getFilmOnId = async (movieId: number) => {
  try {
    const fetchResponse = await fetch(
      `https://cinemaguide.skillbox.cc/movie/${movieId}`
    );
    const response = await fetchResponse.json();
    return {
      response,
    };
  } catch (err) {
    throw new Error("product response was not ok");
  }
};

export const getFilmName = async (
  searchText: string
): Promise<IResponseFilm> => {
  try {
    const fetchResponse = await fetch(
      `https://cinemaguide.skillbox.cc/movie?${searchText}`
    );
    const response = await fetchResponse.json();
    const film: IFilm[] = searchText
      ? response.filter((el: IFilm) =>
          el.title.toLowerCase().includes(searchText)
        )
      : response;

    return {
      film: film,
    };
  } catch (err) {
    throw new Error("product response was not ok");
  }
};
