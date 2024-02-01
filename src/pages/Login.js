import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Container, Form, Modal } from "react-bootstrap";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const history = useHistory();

  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        {
          timeout: 10000,
        }
      );

      const getAccessToken = response.data.accessToken;

      localStorage.setItem("accessToken", getAccessToken);

      if (response.data.status === "success") {
        setModalText("Logged in successfully, redirecting...");
        setModalShow(true);
      }

      setTimeout(() => {
        history.replace("/");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setModalText(error.response.data.errors[0].message);
        setModalShow(true);
      } else {
        setModalText("Unknown erroe occured. Try again later!");
        setModalShow(true);
      }
    }
  };
  return (
    <>
      <MovieNavbar />
      <Container>
        <h3>Login Screen</h3>
        <form onSubmit={loginHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={email}
              autoComplete={false}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={password}
              autoComplete={false}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Login
          </Button>
        </form>
      </Container>

      <Modal
        show={modalShow}
        // onhide is for close button
        onHide={() => {
          setModalShow(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
