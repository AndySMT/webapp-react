import React, { useState } from "react";
import axios from "axios";

function ReviewForm({ movieId, onSubmit }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [vote, setVote] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      name,
      text,
      vote,
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/movies/${movieId}`, newReview)
      .then((res) => {
        onSubmit(res.data);
        setName("");
        setText("");
        setVote(0);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log("Review aggiunta");
      });
  };

  const renderStarsInput = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`fs-3 me-2 ${i <= vote ? "text-warning" : "text-muted"}`}
          style={{ cursor: "pointer" }}
          onClick={() => setVote(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="container my-4 p-4 border rounded shadow-lg">
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <h2 className="text-primary">Aggiungi una Recensione</h2>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Recensione
              </label>
              <textarea
                className="form-control"
                id="text"
                rows="4"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <div>{renderStarsInput()}</div>
            </div>

            <button type="submit" className="btn btn-primary">
              Invia Recensione
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ReviewForm;
