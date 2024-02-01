import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Container, Modal } from "react-bootstrap";

const Profile = () => {
  const history = useHistory();

  const [userData, setUserData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getprofile();
  }, []);

  const getprofile = async () => {
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown erroe occured. Try again later!");
      }
    }
  };

  const onLogout = () => {
    localStorage.removeItem("accessToken");
    history.push("/");
  };
  return (
    <>
      <MovieNavbar />
      <Container>
        Name:{userData.name}
        <br />
        Email:{userData.email}
        <br />
        Country:{userData.country}
        <br />
        <br />
        <Button variant="danger" type="button" onClick={()=>setModalShow(true)}>
          Logout
        </Button>
      </Container>

      <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShow(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={onLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
