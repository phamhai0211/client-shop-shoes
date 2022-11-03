import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss'
import 'animate.css'
import { ArrowNext, ArrowPrev } from './Arrow'

const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    fade: true,
    // cssEase: "linear",
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />
}



export default function HeaderSlider() {
  return (
    <div className="header-slider">
      <Slider {...settings}>
        <div>
          <div className="img-header-slider">
            <img src="/assets/images/slider1.jpg" alt=""></img>
          </div>
          <div className="content-header-slider">
            <p className="first-chs">New Styles Everyday</p>
            <p className="second-chs">WELCOME</p>
            <p className="third-chs">Choose you, Choose your Style</p>
          </div>
        </div>

        <div>
          <div className="img-header-slider">
            <img src="/assets/images/slider2.jpg" alt=""></img>
          </div>
          <div className="content-header-slider">
            <p className="first-chs">New Styles Everyday</p>
            <p className="second-chs">WELCOME</p>
            <p className="third-chs">Choose you, Choose your Style</p>
          </div>
        </div>

        <div>
          <div className="img-header-slider">
            <img src="/assets/images/slider3.jpg" alt=""></img>
          </div>
          <div className="content-header-slider">
            <p className="first-chs">New Styles Everyday</p>
            <p className="second-chs">WELCOME</p>
            <p className="third-chs">Choose you, Choose your Style</p>
          </div>
        </div>
      </Slider>
    </div>
  );
}