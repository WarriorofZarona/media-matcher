import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Navbar,
  Modal,
  Form
} from 'react-bootstrap';
import SampleImg from '../../assets/images/mainLogo.jpeg';
import API from '../../utils/API';
import { MDBContainer, MDBInput } from "mdbreact";
import './style.css';


function Nav(props) {

  const location = useLocation();

  const [show, setShow] = useState(false);
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = React.useState([]);

  //const [selectedPlatform, setSelectedPlatform] = useState('');
 // const [selectedGame, setSelectedGame] = useState('');

  const [display, setDisplay] = useState({
    game: "",
    platform: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    //grabs games
    loadGames();
    // loadPlatforms();
  }, []);

  function loadGames() {
    //uses API util to loadGames from our express server
    API.getGames()
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleInputChange(event) {
    //selectedGameOb === full object
    //selectedGame === string of game title
    let value = event.target.value;
    const name = event.target.name;
    if (name === "game") {
      let selectedGameOb = games.find((game) => game.title === value);
      setDisplay({ ...display, game: value })
      // console.log(selectedGameOb);
      // setSearch({ ...search, game: gameName });
      setPlatforms(selectedGameOb.platforms);
    }
    // console.log(search.game);
  }




  // function loadPlatforms() { //uses API util to loadGames from our express server
  //   API.getPlatforms().then(res => {
  //     setPlatforms(res.data);
  //     console.log(res.data)
  //   })
  //     .catch(err => console.log(err));
  // }



  const handleSubmit = (e) => {
    e.preventDefault();
    props.changeState(display.game, display.platform);
    handleClose();
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg mb-4 z-depth-2 navbar-light">
      <Navbar.Brand href="/home">
        <img
          src={SampleImg}
          width="75%"
          className="brandLogo d-inline-block align-top ml-5"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon justify-content-start"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        {/* <form class="form-inline md-form mb-4 mx-auto">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search For Games" aria-label="Search"></input>
                    <button class="btn aqua-gradient btn-rounded btn-sm my-0 text-light " type="submit"><strong>Search</strong></button>
                </form> */}

        <div className="navbar-nav justify-content-end ml-auto text-light">
          <div className="navBtn text-center mb-3">
            <i
              type="button"
              className="fa mx-4 text-center fa-2x fa-search pt-3 animated pulse infinite"
              onClick={handleShow}
            ></i>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Game Search</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="form-inline md-form mb-4 mx-auto justify-content-center">
                <Container>
                  <Row>
                    <Col lg={12}>
                      <h5 className="mb-2">Choose A Game</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <Form>
                        <Form.Group controlId="gameSearchForm.ControlSelect1">
                          <Form.Control
                            as="select"
                            name="game"
                            onChange={handleInputChange}
                          // onChange={handleSearchInputChange}
                          >
                            <option disabled selected value> -- select a game -- </option>
                            {games.map((game, i) => (
                              <option key={game.id}>{game.title}</option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                        <h5 className="my-2">Choose A Console</h5>

                        <MDBContainer className="mt-3">
                          {platforms.map((platform, i) => (
                            <div key={`default-radio`} className="mb-3 mx-5 ChoosePlatforms">
                              <MDBInput
                                style={{ width: 100 + "px" }}
                                key={i}
                                name="platform"
                                type="radio"
                                id={`default-radio-${i}`}
                                label={platform}
                                value={platform}
                                onClick={(event) =>
                                  setDisplay({
                                    ...display,
                                    platform: event.target.value,
                                  })
                                }
                              />
                              <br />
                            </div>
                          ))}
                          {/* </div> */}
                        </MDBContainer>
                      </Form>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12}>
                      {/* <div>
                        <h5 className="mb-2 mt-4">Choose A Platform</h5>
                        {platforms.map((platform, i) => (
                          <div key={i} className="mb-3 mx-4 platformOptions justify-content-center">
                            <Image src={platform.src} thumbnail width="100" height="100" />
                            <Form.Check
                              type='radio'
                              id={platform.id}
                              label={platform.name}
                            />

                          </div>
                        ))}

                      </div> */}
                    </Col>
                  </Row>
                </Container>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Link
                to={`/home?game=${display.game}&platform=${display.platform}`}
              >
                {/* <form onSubmit={handleSubmit}>
                <input type="text" name="search" id="search" /> */}
                <button
                  className="btn aqua-gradient btn-rounded btn-sm my-0 text-light"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <strong>Search</strong>
                </button>
                {/* </form> */}
              </Link>
            </Modal.Footer>
          </Modal>
          <Link
            style={{ color: '#2096ff' }}
            to="/home"
            className={
              location.pathname === '/home' ? 'nav-link active' : 'nav-link'
            }
          >
            <div className="navBtn mx-4 text-center">
              <i className="fa fa-2x fa-gamepad"></i>
              <h5>Home</h5>
            </div>
          </Link>
          <Link
            style={{ color: '#2096ff' }}
            to="/chat"
            className={
              location.pathname === '/chat' ? 'nav-link active' : 'nav-link'
            }
          >
            <div className="navBtn mx-4 text-center">
              <i className="fa fa-2x fa-comments"></i>
              <h5>Chat</h5>
            </div>
          </Link>
          <Link
            style={{ color: '#2096ff' }}
            to="/profile"
            className={
              location.pathname === '/profile' ? 'nav-link active' : 'nav-link'
            }
          >
            <div className="navBtn mx-4 text-center">
              {/* <i className="fa fa-2x fa-user-circle d-flex justify-content-center"></i> */}
              <img
                src={props.img}
                alt="User "
                width="33"
                height="33"
              ></img>

              <h5>Profile </h5>
            </div>
          </Link>
        </div>
      </div>
    </nav >
  );
}

export default Nav;