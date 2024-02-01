import { Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SingleMovie = (props) => {
  return (
    <>
    {/* Maile Index.js mai garexu. If you chhose to use bootsrap in this file it is same as Index.js. el.id haruko satta props.data.id use hunchha */}
    <Col>
      <div key={props.data.id}>
        <Link to={`/view_movie/${props.data.id}`}>
          <span style={{ fontWeight: "bold" }}>{props.data.name}</span>
        </Link>
        <br></br>
        <img
          src={props.data.image}
          alt="MovieImage"
          style={{ height: "100px" }}
        />
        <br></br>
        Info: {props.data.info}
        <br></br>
        Ratings: {props.data.rating}
        <br></br>
        <br></br>
        <br></br>
      </div>
      </Col>
    </>
  );
};

export default SingleMovie;
