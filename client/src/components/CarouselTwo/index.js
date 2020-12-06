import React from "react";
import "./index.css";


//import all carousel images
import Image1 from "../../assets/images/animalcrossing.jpg"
import Image2 from "../../assets/images/halo.jpg"
import Image3 from "../../assets/images/fifa20.jpeg"
import Image4 from "../../assets/images/callofduty.png"
import Image5 from "../../assets/images/rocketleague.jpg"
import Image6 from "../../assets/images/overwatch.jpg"
import Image7 from "../../assets/images/NBA.jpg"
import Image8 from "../../assets/images/fortnite.jpg"
import Image9 from "../../assets/images/destiny2.jpg"

const caroImgs = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9];


class CarouselTwo extends React.Component {

    state = {
        index: 0
    };

    toggle = e => {
        setInterval(() => {
            console.log("current index", this.state.index)
            this.setState(state => ({
                index: state.index === 8 ? 0 : state.index + 1
            }))
        }, 5000)
    }

    componentDidMount() {
        this.toggle();
    }


    render(){
        return (
            <div className="main-caro-two">

                <img className="caro-two-img" src={caroImgs[this.state.index]}></img>



            </div>
        );
    }
}

export default CarouselTwo;
