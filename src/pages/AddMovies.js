import axios from "axios";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Container, Form } from "react-bootstrap";

const AddMovies = () => {
  const history = useHistory();
  const movie_name_ref = useRef();
  const rating_ref = useRef();
  const desc_ref = useRef();

  const addMovieHandler = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: movie_name_ref.current.value,
      rating: rating_ref.current.value,
      description: desc_ref.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 10000,
        }
      );
      alert(response.data.message);
      history.replace("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown erroe occured. Try again later!");
      }
    }
  };
  return (
    <>
      <MovieNavbar />
      <Container>
        <h3>Add a movie</h3>
        <form onSubmit={addMovieHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Movie Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a movie name"
              ref={movie_name_ref}
              autoComplete={false}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ratings</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter ratings"
              ref={rating_ref}
              autoComplete={false}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              ref={desc_ref}
              style={{ height: "100px" }}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Add a Movie
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AddMovies;
