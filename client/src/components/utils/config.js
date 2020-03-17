const isProf = process.env.NODE_ENV === "production";

export const config = {
  URL: isProf
    ? "https://rocky-shelf-46807.herokuapp.com/"
    : "http://localhost:3001/"
};
