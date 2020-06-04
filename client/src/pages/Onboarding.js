import React from "react";
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import API from "../utils/API";
import { MDBBtn } from "mdbreact";
import Auth from "../utils/Auth";



function Onboarding(props) {

    let [games, setGames] = React.useState([]); //state for games
    let [platforms, setPlatforms] = React.useState([]); //state for platforms
    let [avatars, setAvatars] = React.useState([]); //state for avatars
    //====

    let [userPlatforms, setUserPlatforms] = React.useState([]);
    let [userGames, setUserGames] = React.useState([]);
    let [userAvatar, setUserAvatar] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        const id = props.id;
        //==================
        putUserData(id);


        Auth.onboarded(id);
        props.changeState("onboard", true);
    };

    function addPlatform(title) {
        setUserPlatforms([...userPlatforms, { title }]);
    }

    function addGame(title, image) {
        setUserGames([...userGames, { title }]);
    }

    function addAvatar(src) {
        setUserAvatar(src);
    }

    function putUserData(userId) {

        API.putOnboardData({
            id: userId,
            img: userAvatar,
            userGames: userGames,
            userPlatforms: userPlatforms
        });
    }

    React.useEffect(() => { //grabs games
        loadGames();
        loadPlatforms();
        loadAvatars();
    }, []);


    function loadGames() { //uses API util to loadGames from our express server
        API.getGames().then(res => {
            setGames(res.data);
        })
            .catch(err => console.log(err));
    }

    function loadPlatforms() { //uses API util to loadPlatforms from our express server
        API.getPlatforms().then(res => {
            setPlatforms(res.data);
        })
            .catch(err => console.log(err));
    }

    function loadAvatars() { //uses API util to loadAvatars from our express server
        API.getAvatars().then(res => {
            setAvatars(res.data);
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
                                        <div className="ml-5 mb-5">
                                            <h3 className="mb-4">Choose Your Favorite Platforms</h3>
                                            {platforms.map((platform, i) => (
                                                <div key={platform.id} className="mb-3 platformOptions">
                                                    <Form.Check
                                                        type='checkbox'
                                                        id={platform.id}
                                                        label={platform.title}
                                                        onClick={() => addPlatform(platform.title)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="ml-5">
                                            <h3 className="mb-4">Choose Your Favorite Games</h3>

                                            {games.map((game, i) => (
                                                <div key={game.id} className="mb-3 gameOptions">
                                                    <Form.Check
                                                        type='checkbox'
                                                        id={game.id}
                                                        name="game"
                                                        label={game.title}
                                                        onClick={() => addGame(game.title, game.image)}
                                                    />

                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12}>
                                        <div className="text-center mt-5">
                                            <h3 className="mb-4">Choose Your Avatar</h3>
                                            {avatars.map((avatar, i) => (
                                                <div key={avatar.id} className="mb-3 mx-2 avatarOptions">
                                                    <Image src={avatar.src} thumbnail width="100" height="100" />
                                                    <Form.Check
                                                        type='radio'
                                                        id={avatar.id}
                                                        name="avatar"
                                                        label={avatar.title}
                                                        onClick={() => addAvatar(avatar.src)}
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
                                                onClick={handleSubmit}


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
