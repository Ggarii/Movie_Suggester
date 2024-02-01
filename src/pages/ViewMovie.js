import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Card, Container } from "react-bootstrap";

const ViewMovie = () => {
  const getParams = useParams();
  const getId = getParams.id;

  const [movieData, setMovieData] = useState({});
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    getSingleMovieInfo();
  }, []);

  const getSingleMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getId}`
      );
      setMovieData(response.data.singleMovieData);
    } catch (error) {
      alert("Error");
    }
  };
  return (
    <>
      <MovieNavbar />
      <Container>
        <h1 className="text-info">{movieData.name} </h1>
        <br />
        <Card>
          <Card.Body>Info: {movieData.info} </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body> Description: {movieData.desc}</Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body>
            {" "}
            Image: <br />
            <img
              src={movieData.image}
              alt="MovieImage"
              style={{ height: "200px" }}
            />
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body> Rating:{movieData.rating}</Card.Body>
        </Card>
        <br />
        <Link to="/">
          <Button variant="dark">Go Back</Button>
        </Link>
        <br /> <br />
      </Container>
    </>
  );
};

export default ViewMovie;
