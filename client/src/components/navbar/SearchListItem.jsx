import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchListItem({ children, item }) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return <Link to={{ pathname: "/watch", movie: movie }}>{children}</Link>;
}
