import Primary from "./Primary";
import Category from "./Category";
import Junier from "./Junier";
import Senior from "./Senior";
import { Row, Col } from "reactstrap";

function Body() {
  return (
    <>
      <Category />
      <Primary />
      <Junier />
      <Senior />
      <Row className="app__home__container__rowbody__introduce">
        <div className="app__home__container__rowbody__introduce__title">
          3 LÝ DO BẠN NÊN HỌC ONLINE TẠI H-N
        </div>
        <Col className="app__home__container__rowbody__introduce__col" xs="4">
          <div className="app__home__container__rowbody__introduce__col__box">
            <img src="https://unica.vn/media/images/icon-ts-1.png" alt="img" />
            <div className="app__home__container__rowbody__introduce__col__box__content-1">
              Giảng viên uy tín
            </div>
            <div className="app__home__container__rowbody__introduce__col__box__content-2">
              Bài giảng chất lượng
            </div>
          </div>
        </Col>
        <Col className="app__home__container__rowbody__introduce__col" xs="4">
          <div className="app__home__container__rowbody__introduce__col__box">
            <img src="https://unica.vn/media/images/icon-ts-2.png" alt="img" />
            <div className="app__home__container__rowbody__introduce__col__box__content-1">
              Thanh toán 1 lần
            </div>
            <div className="app__home__container__rowbody__introduce__col__box__content-2">
              Học mãi mãi
            </div>
          </div>
        </Col>
        <Col className="app__home__container__rowbody__introduce__col" xs="4">
          <div className="app__home__container__rowbody__introduce__col__box">
            <img src="https://unica.vn/media/images/icon-ts-3.png" alt="img" />
            <div className="app__home__container__rowbody__introduce__col__box__content-1">
              Học trực tuyến
            </div>
            <div className="app__home__container__rowbody__introduce__col__box__content-2">
              Hỗ trợ trực tiếp
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Body;
