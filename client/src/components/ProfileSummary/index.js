import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import "./style.css";
import API from "../../utils/API";

function ProfileSummary(props) {

    const [summKey, setSummKey] = useState(new Map());

    useEffect(() => {
        getGameImages();
    }, [])

    const getGameImages = () => {
        API.getGames().then(res => {
            let newMap = new Map();

            res.data.map(e => {
                return newMap.set(e.title, e.image);
            });
            setSummKey(newMap);
        });
    }

    //<img className="platformImg" src={favPlatformImg} alt="platform1" width="100" height="100"></img> 
    return (
        <Container fluid>
            <Row >
                <Col xs={12} className="mb-5" >
                    <div className="text-center p-4 profileSummary z-depth-2">
                        <h3 className="mb-4"><strong>Profile Summary</strong></h3>
                        <h4>Favorite Platforms</h4>
                        <div className="mt-2">
                            {props.favPlatformsImgs.map((favPlatformImg, i) => (
                                <div key={favPlatformImg.title}>
                                    <div className="myPlatforms mt-3">
                                        <h5>{favPlatformImg.title}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h4 className="mt-5">Favorite Games</h4>
                        <div className="myGames mt-2">
                            {props.favGamesImgs.map((favGameImg, i) => (
                                <div key={favGameImg.title}>
                                    <div className="mt-3">
                                        <img className="gameImg" src={summKey.get(favGameImg.title)} alt="platform1" width="100" height="100"></img>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProfileSummary;
