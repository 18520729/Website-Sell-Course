import Carousel from "react-bootstrap/Carousel";

function Banner() {
  return (
    <Carousel fade className="banner">
      <Carousel.Item interval="3000" className="banner__container-item">
        <img
          className="d-block w-100"
          src="https://wall.vn/wp-content/uploads/2020/03/hinh-nen-dep-may-tinh-1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval="3000" className="banner__container-item">
        <img
          className="d-block w-100"
          src="https://anhdepfree.com/wp-content/uploads/2018/08/hinh-nen-dep-nhat-2018.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval="3000" className="banner__container-item">
        <img
          className="d-block w-100"
          src="https://supperclean.vn/wp-content/uploads/2021/01/386f47c88a7aaa497ec6edc1c02cc9b6-scaled.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
