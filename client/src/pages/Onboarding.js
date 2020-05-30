import React from "react";
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import API from "../utils/API";
import { MDBBtn } from "mdbreact";



function Onboarding() {

    let [games, setGames] = React.useState([]); //state for games
    let [platforms, setPlatforms] = React.useState([]); //state for platforms
    let [avatars, setAvatars] = React.useState([]); //state for avatars

    const handleSubmit = e => {
        e.preventDefault();
    };

    React.useEffect(() => { //grabs games
        loadGames();
    }, []);


    function loadGames() { //uses API util to loadGames from our express server
        API.getGames().then(res => {
            setGames(res.data);
            console.log(res.data)
        })
            .catch(err => console.log(err));
    }



    return (
        <Container fluid>
            <div className="mt-5">
                <Form>
                    <Row>

                        <Col lg={2}>
                        </Col>
                        <Col lg={8}>
                            <div className="onboarding p-4">
                                <Row>
                                    <Col lg={6}>
                                        <h3 className="mb-4">Choose Your Favorite Platforms</h3>
                                        {platforms.map((platform, i) => (
                                            <div key={platform.id} className="mb-3 platformOptions">
                                                <Form.Check
                                                    type='checkbox'
                                                    id={platform.id}
                                                    label={platform.title}
                                                />
                                            </div>
                                        ))}

                                    </Col>
                                    <Col lg={6}>

                                        <h3 className="mb-4">Choose Your Favorite Games</h3>

                                        {games.map((game, i) => (
                                            <div key={game.id} className="mb-3 gameOptions">
                                                <Form.Check
                                                    type='checkbox'
                                                    id={game.id}
                                                    name="game"
                                                    label={game.title}
                                                />

                                            </div>
                                        ))}

                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12}>
                                        <div className="text-center mt-5">
                                            <h3 className="mb-4">Choose Your Avatar</h3>
                                            {avatars.map((avatar, i) => (
                                                <div key={avatar.id} className="mb-3 avatarOptions">
                                                    <Image src={avatar.src} thumbnail width="100" height="100" />
                                                    <Form.Check
                                                        type='checkbox'
                                                        id={avatar.id}
                                                        label={avatar.title}
                                                    />

                                                </div>
                                            ))}
                                        </div>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col lg={12}>
                                        <div className="text-center mt-3">
                                            <MDBBtn
                                                rounded
                                                type="button"
                                                className="submitOnboarding z-depth-1a aqua-gradient"


                                            >
                                                <strong>Submit</strong>
                                            </MDBBtn>
                                        </div>
                                    </Col>

                                </Row>
                            </div>

                        </Col>
                        <Col lg={2}>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container >
    );
}

export default Onboarding;