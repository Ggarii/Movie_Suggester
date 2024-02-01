import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../components/MovieNavbar";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import SingleMovie from "../components/SingleMovie";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [searchMovieText, setSearchMovieText] = useState("");
  const [searchErrorText, setSearchErrorText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!firstRun) {
      const fetchTimer = setTimeout(() => {
        if (searchMovieText && searchMovieText.length > 2) {
          setSearchErrorText("");
          fetchMovies();
        } else if (searchMovieText.length < 1) {
          setSearchErrorText("");
          fetchMovies();
        } else {
          setSearchErrorText(
            "Please enter atleast 3 characters for searching."
          );
        }
      }, 800);

      // cleanup function
      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [searchMovieText]);

  const fetchMovies = async () => {
    setLoading(true);
    // Fetch resources

    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      );
      setMovies(response.data.moviesData);
      setIsError(false);
      setLoading(false);
      setFirstRun(false);
    } catch (error) {
      setIsError(true);
      setErrorText("Cannot get movie info");
      setLoading(false);
      setFirstRun(false);
    }

    console.log(movies);
  };

  return (
    <div className="App">
      <MovieNavbar />
      <div>
        <div className="text-center mt-3">
          <Container>
            <Form.Group className="mb-1">
              <Form.Control
                type="text"
                placeholder="Type movie title to search"
                value={searchMovieText}
                onChange={(e) => setSearchMovieText(e.target.value)}
              />
            </Form.Group>
          </Container>
        </div>
        <span style={{ color: "red" }}>{searchErrorText}</span>
      </div>
      <br></br>
      {isError ? (
        <>
          <div
            style={{
              background: "red",
              color: "#ffff",
              padding: "10px",
              margin: "10px",
            }}
          >
            {errorText}
          </div>
        </>
      ) : (
        <>
          <div
            style={{ background: "#e7e7e7", padding: "10px", margin: "5px" }}
          >
            <div>
              {loading ? (
                <>
                  <Container className="text-center">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </Container>
                </>
              ) : (
                <></>
              )}
            </div>
            {!loading && movies.length < 1 ? (
              <>No movies found! </>
            ) : (
              <>
                <Row>
                  {movies.map((el) => (
                    // <SingleMovie data={el} /> If yo garyo vane chai yo tala use vako bootstrap yo file ma
                    //  nagari SingleMovie vanne file ma garne. Eta yo line matra hunchha
                    <Col key={el.id}>
                      <Card style={{ width: "18rem", minHeight: "735px" }}>
                        <Card.Img
                          variant="top"
                          src={el.image}
                          style={{ maxWidth: "285px" }}
                        />
                        <Card.Body>
                          <Card.Title>{el.name}</Card.Title>
                          <Card.Text>{el.info}</Card.Text>
                          <Link to={`/view_movie/${el.id}`}>
                            <Button variant="dark">View Details</Button>
                          </Link>
                        </Card.Body>
                      </Card>

                      {/* <div key={el.id}>
                        <Link to={`/view_movie/${el.id}`}>
                          <span style={{ fontWeight: "bold" }}>{el.name}</span>
                        </Link>
                        <br></br>
                        <img
                          src={el.image}
                          alt="MovieImage"
                          style={{ height: "100px" }}
                        />
                        <br></br>
                        Info: {el.info}
                        <br></br>
                        Ratings: {el.rating}
                        <br></br>
                        <br></br>
                        <br></br>
                      </div> */}
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
