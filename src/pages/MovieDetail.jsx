import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";

function Moviedetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_MOVIES_URL}/${id}`)
      .then((res) => {
        //console.log(res.data);
        setMovie(res.data);
      })
      .catch((err) => console.error("Errore nel caricamento del film", err));
  }, [id]);

  const handleAddReview = (newReview) => {
    setMovie((movie) => ({
      ...movie,
      reviews: [...movie.reviews, newReview],
    }));
  };
  const renderStars = (vote) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= vote ? "text-warning" : "text-muted"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    movie && (
      <>
        <section className="container my-4 p-4 border rounded shadow-lg">
          <div className="row">
            <div className="col-md-5">
              <div className="image-container">
                <img
                  src={movie.img_path}
                  alt={movie.title}
                  className="img-fluid rounded shadow-lg"
                />
              </div>
            </div>
            <div className="col-md-7">
              <div className="content-container">
                <h1 className="text-primary">{movie.title}</h1>
                <p className="text-muted">{`Diretto da: ${movie.director}`}</p>
                <p>
                  <strong>Genere:</strong> {movie.genre}
                </p>
                <p>
                  <strong>Anno di uscita:</strong> {movie.release_year}
                </p>
                <p>
                  <strong>Descrizione:</strong> {movie.abstract}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container my-4 p-4 border rounded shadow-lg">
          <div className="row">
            <div className="col-md-12">
              <div className="content-container">
                <h1 className="text-primary">Movie Reviews</h1>
                {movie.reviews.map((review) => (
                  <div key={review.id}>
                    <p className="text-danger fw-bold fs-5">{review.name}</p>
                    <p>{renderStars(review.vote)}</p>
                    <p>{review.text}</p>
                    <p className="text-muted text-end border-bottom pb-2">
                      {new Date(review.created_at).toLocaleDateString("it-IT")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section>
          <ReviewForm onSubmit={handleAddReview} movieId={id} />
        </section>
      </>
    )
  );
}
export default Moviedetail;
