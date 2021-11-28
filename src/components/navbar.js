import { Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../contexts/Context";
import { variables } from "../Variables";

function Navbar() {
  const history = useHistory();
  const {
    loginStatus,
    setLoginStatus,
    setDataSearch,
    dataSearch,
    dataCart,
    setActivePage,
    setOffset,
    setTest,  
  } = useContext(Context);

  function handleOnchangeSearch(e) {
    setDataSearch(e.target.value);
    setActivePage(1);
    setOffset(0);
    setTest(0);
  }

  function showName() {
    return loginStatus.TenHocVien.trim().split(" ")[
      //   loginStatus.TenHocVien.trim().split(" ").length - 2
      // ] + " " + loginStatus.TenHocVien.trim().split(" ")[
      //   loginStatus.TenHocVien.trim().split(" ").length - 1
      loginStatus.TenHocVien.trim().split(" ").length - 1
    ];
  }
  function handleLogOut() {
    localStorage.removeItem("18520729");
    setLoginStatus(null);
    history.push("/login");
  }
  function renderQuantityCourse() {
    if (dataCart.length > 0) {
      return <div>{dataCart.length}</div>;
    }
  }
  function checkLogin() {
    if (loginStatus) {
      return (
        <>
          <Col className="app__home__container__rownav__navbar__col" xs="2">
            <div className="app__home__container__rownav__navbar__my-course">
              <Link
                className="app__home__container__rownav__navbar__my-course__link"
                to="/my-course"
              >
                <i className="bi bi-play-fill"></i>
                <div className="app__home__container__rownav__navbar__my-course__content">
                  Khóa học của tôi
                </div>
              </Link>
            </div>
          </Col>
          <Col className="app__home__container__rownav__navbar__col" xs="1">
            <div className="app__home__container__rownav__navbar__user__collapse">
              <div className="app__home__container__rownav__navbar__user__collapse__box">
                <div className="app__home__container__rownav__navbar__user__collapse__box__avartar">
                  <img
                    src={variables.MEDIA_URL + loginStatus.AnhHocVien}
                    alt="avarta"
                  />
                </div>
                <div className="app__home__container__rownav__navbar__user__collapse__box__name">
                  {showName()}
                </div>
                <div className="app__home__container__rownav__navbar__user__option">
                  <ul>
                    <li>
                      {" "}
                      <Link to="/my-info"><i className="bi bi-person-circle"></i>Thông tin cá nhân</Link>
                    </li>
                    <li onClick={handleLogOut}>
                      <i className="bi bi-box-arrow-right"></i>Đăng xuất
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </>
      );
    } else {
      return (
        <>
          <Col className="app__home__container__rownav__navbar__col" xs="2">
            <div className="app__home__container__rownav__navbar__login">
              <Link to="/login">Đăng nhập</Link>
            </div>
          </Col>
          <Col className="app__home__container__rownav__navbar__col" xs="1">
            <div className="app__home__container__rownav__navbar__register">
              <Link to="/register">Đăng ký</Link>
            </div>
          </Col>
        </>
      );
    }
  }

  return (
    <>
      <Col className="app__home__container__rownav__navbar__col" xs="3">
        <Link className="app__home__container__rownav__navbar__linkicon" to="">
          <img src="http://127.0.0.1:8000/media/logo-big.png" alt="logo" />
        </Link>
      </Col>
      <Col className="app__home__container__rownav__navbar__col" xs="5">
        <div className="app__home__container__rownav__navbar__search">
          <input
            onChange={handleOnchangeSearch}
            value={dataSearch}
            className="app__home__container__rownav__navbar__search__input"
            type="text"
            placeholder="Tìm khóa học, giảng viên"
          />
          <Link
            to="/search"
            className="app__home__container__rownav__navbar__search__link"
          >
            <i className="app__home__container__rownav__navbar__search__button__icon bi bi-search"></i>
          </Link>
        </div>
      </Col>
      <Col className="app__home__container__rownav__navbar__col" xs="1">
        <div className="app__home__container__rownav__navbar__cartlink">
          <Link to="/cart">
            <i className=" bi bi-cart3">{renderQuantityCourse()}</i>
          </Link>
        </div>
      </Col>
      {checkLogin()}
    </>
  );
}

export default Navbar;
