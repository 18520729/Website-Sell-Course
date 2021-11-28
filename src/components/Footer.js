import FooterInfo from "./FooterInfo";
import { Col } from "reactstrap";
function Footer() {
  return (
    <>
      <Col className="test" xs="3">
        <div className="app__home__container__rowfooter__component">
          <ul>
            <li className="app__home__container__rowfooter__component__title">
              <img
                src="http://127.0.0.1:8000/media/logo-big.png"
                alt=""
              />
              {/* Liên hệ với H-N */}
            </li>
            <FooterInfo is_a={false}>
              <i className="bi bi-geo-alt-fill"></i>
              khu phố 6, Thủ Đức, Ho Chi Minh City
            </FooterInfo>
            <FooterInfo is_a={false}>
            <i className="bi bi-telephone-fill"></i>
              028 3725 2002
            </FooterInfo>
            <FooterInfo is_a={false}>
              <i className="bi bi-mailbox2"></i>
              ctsv@uit.edu.vn
            </FooterInfo>
            <FooterInfo is_a={false}>
              <i className="bi bi-clock-fill"></i>
              8:00 - 22:00
            </FooterInfo>
          </ul>
        </div>
      </Col>
      <Col xs="3">
        <div className="app__home__container__rowfooter__component">
          <ul>
            <li className="app__home__container__rowfooter__component__title">
              Về H-N
            </li>
            <FooterInfo>Giới thiệu về H-N</FooterInfo>
            <FooterInfo>Câu hỏi thường gặp</FooterInfo>
            <FooterInfo>Điều khoản dịch vụ</FooterInfo>
            <FooterInfo>Hướng dẫn thanh toán</FooterInfo>
            <FooterInfo>Góc chia sẻ</FooterInfo>
            <FooterInfo>Chính sách bảo mật</FooterInfo>
          </ul>
        </div>
      </Col>
      <Col xs="3">
        <div className="app__home__container__rowfooter__component">
          <ul>
            <li className="app__home__container__rowfooter__component__title">
              Hợp tác liên kết
            </li>
            <FooterInfo>Đăng ký giảng viên</FooterInfo>
            <FooterInfo>Giải pháp e-learning</FooterInfo>
            <FooterInfo>Đào tạo doanh nghiệp</FooterInfo>
            <FooterInfo>Affiliate</FooterInfo>
            <FooterInfo>Agency</FooterInfo>
          </ul>
        </div>
      </Col>
      <Col xs="3">
        <div className="app__home__container__rowfooter__component">
          <ul>
            <li className="app__home__container__rowfooter__component__title">
              Tải app H-N
            </li>
            <li>
              <a href="/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png"
                  alt="img"
                />
              </a>
            </li>
            <li>
              <a href="/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png"
                  alt="img"
                />
              </a>
            </li>{" "}
            <li className="app__home__container__rowfooter__component__title">
              Kết nối với H-N
            </li>
            <li>
              <a href="/">
                <img
                  src="https://www.youtube.com/img/desktop/supported_browsers/yt_logo_rgb_light.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a href="/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Facebook_New_Logo_(2015).svg/1200px-Facebook_New_Logo_(2015).svg.png"
                  alt=""
                />
              </a>
            </li>
          </ul>
        </div>
      </Col>
    </>
  );
}

export default Footer;
