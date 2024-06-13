import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "./homeslider.module.css";
import img1 from "../../images/slideimages/pexels-maxfrancis-2246476.jpg";
import img2 from "../../images/slideimages/pexels-pixabay-301920.jpg";
import img3 from "../../images/slideimages/pexels-rickyrecap-1907785.jpg";
const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand" as const,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className={styled.container}>
      <Slider {...settings}>
        <div className={styled.imgs}>
          <img src={img1} className={styled.img} />
        </div>
        <div>
          <img src={img2} className={styled.img} />
        </div>
        <div>
          <img src={img3} className={styled.img} />
        </div>
      </Slider>
    </div>
  );
};

export default HomeSlider;
