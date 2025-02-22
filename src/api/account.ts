export const reg = async (object: object) => {
  try {
    const query = new URLSearchParams({});

    const fetchResponse = await fetch(`https://cinemaguide.skillbox.cc/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: object.email,
        password: object.password,
        name: object.name,
        surname: object.surname,
      }),
    });

    const response = await fetchResponse.json();
    return response;
  } catch (err) {
    throw new Error("product response was not ok");
  }
};

export const postCurrentUser = async (email: string, password: string) => {
  try {
    const fetchResponse = await fetch(
      `https://cinemaguide.skillbox.cc/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const response = await fetchResponse.json();
    return response;
  } catch (err) {
    throw new Error("product response was not ok");
  }
};

export const profile = async () => {
  try {
    const fetchResponse = await fetch(
      "https://cinemaguide.skillbox.cc/profile",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const response = await fetchResponse.json();
    return response;
  } catch (err) {
    throw new Error("product response was not ok");
  }
};
export const closeSession = async () => {
  try {
    const fetchResponse = await fetch(
      "https://cinemaguide.skillbox.cc/auth/logout",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const response = await fetchResponse.json();
    return { response };
  } catch (err) {
    throw new Error("product response was not ok");
  }
};
export const getFavourites = async () => {
  try {
    const fetchResponse = await fetch(
      "https://cinemaguide.skillbox.cc/favorites",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const response = await fetchResponse.json();
    return { response };
  } catch (err) {
    throw new Error("product response was not ok");
  }
};
export const postFavourites = async (id: number) => {
  try {
    const fetchResponse = await fetch(
      `https://cinemaguide.skillbox.cc/favorites`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: String(id),
        }),
      }
    );

    const response = await fetchResponse.json();
    return response;
  } catch (err) {
    throw new Error("product response was not ok");
  }
};
export const deleteFilm = async (movieId: number) => {
  try {
    const fetchResponse = await fetch(
      `https://cinemaguide.skillbox.cc/favorites/${movieId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const response = await fetchResponse.json();
    return response;
  } catch (err) {
    throw new Error("product response was not ok");
  }
};
