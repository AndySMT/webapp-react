import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Moviedetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/${id}`)
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch((err) => console.error("Errore nel caricamento del film", err));
  }, [id]);

  return (
    <section className="card-single">
      <div className="image-container">
        <img
          src={movie.img_path}
          alt={movie.title}
          className="img-fluid rounded"
        />
      </div>
      <div className="content-container">
        <h1 className="text-center">{movie.title}</h1>
        <p>{movie.abstract}</p>
      </div>
    </section>
  );
}

export default Moviedetail;
