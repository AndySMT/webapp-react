import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Moviedetail from "../pages/MovieDetail";
export default function MainComponent() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    axios.get(import.meta.env.VITE_MOVIES_URL).then((res) => {
      setMovies(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-danger">Movies</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {movies.map((movie) => (
          <div className="col" key={movie.id}>
            <div className="card shadow-lg rounded-3 h-100">
              <img
                src={movie.img_path}
                className="card-img-top rounded-top"
                alt={movie.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{movie.title}</h5>
                {/* <p className="card-text">{movie.abstract}</p> */}
              </div>
              <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center">
                <p className="">{`${movie.genre} - ${movie.release_year}`}</p>
                <Link to={`/${movie.id}`} className="btn btn-primary btn-sm">
                  Info
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
