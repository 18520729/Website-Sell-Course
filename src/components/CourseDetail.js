import { Col, Row } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
// import { Player, LoadingSpinner, BigPlayButton } from "video-react";
import { Context } from "../contexts/Context";
import { variables } from "../Variables";

function CourseDetail() {
  const {
    dataUser,
    baiGiang,
    giaoVien,
    khoaHoc,
    loginStatus,
    khoaHocHocVien,
    fetchComment,
    setFetchComment,
    hocVien,
    dataCart,
    setGioHang,
    gioHang,
  } = useContext(Context);
  const [linkVideo, setLinkVideo] = useState(null);
  const [linkPoster, setLinkPoster] = useState(null);
  const [checkVideo, setCheckVideo] = useState(1);
  const [contentComment, setContentComment] = useState("");
  const [valueBtnRepair, setValueBtnRepair] = useState("");
  const [removeContentComment, setRemoveContentComment] = useState(null);
  const [checkFetchComment, setCheckFetchComment] = useState(0); 
  const [classBackground, setClassBackground] = useState("");

  useEffect(() => {
    fetch(variables.API_URL + "binhluan/")
      .then((response) => response.json())
      .then((data) => {
        setFetchComment(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setFetchComment, checkFetchComment]);

  const arrBaiGiang = baiGiang.filter((item) => {
    return "/course/" + item.MaKhoaHoc === window.location.pathname;
  });

  const [objCourse] = khoaHoc.filter((item) => {
    return (
      item.MaKhoaHoc ===
      Number(
        window.location.pathname.slice(
          window.location.pathname.lastIndexOf("/") + 1,
          window.location.pathname.length
        )
      )
    );
  });

  let checkAddCart = dataCart && dataCart.includes(objCourse);
  const [objgiaoVien] = giaoVien.filter((item) => {
    return objCourse && item.MaGiaoVien === Number(objCourse.MaGiaoVien);
  });
  const arrCourseOfGiaoVien = khoaHoc.filter((item) => {
    return objgiaoVien && Number(item.MaGiaoVien) === objgiaoVien.MaGiaoVien;
  });

  function clickRepair(noiDung, maBinhLuan) {
    setValueBtnRepair({ noiDungBinhLuan: noiDung, maBinhLuan: maBinhLuan });
  }

  function clickRemove(maBinhLuan) {
    fetch(variables.API_URL + "binhluan/" + maBinhLuan, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {},
        (error) => {}
      );
    const replaceGioHang = fetchComment.filter((item) => {
      return Number(item.MaBinhLuan) !== maBinhLuan;
    });
    setFetchComment(replaceGioHang);
  }

  function renderBtnRepair(maHocVienCmt, noiDung, maBinhLuan) {
    if (loginStatus.MaHocVien === Number(maHocVienCmt)) {
      return (
        <>
          <div
            onClick={(e) => {
              clickRepair(noiDung, maBinhLuan);
            }}
            className="app__home__rowbody-6__col-1__container__comment__item__options__comment__btn-repair"
          >
            <i className="bi bi-pencil"></i>
            Chỉnh sửa
          </div>
          <div
            onClick={() => {
              clickRemove(maBinhLuan);
            }}
            className="app__home__rowbody-6__col-1__container__comment__item__options__comment__btn-remove"
          >
            <i className="bi bi-trash"></i>
            Xóa
          </div>
        </>
      );
    }
  }
  function handleRepairComment(e) {
    e.preventDefault();
    let toDay = new Date();
    if (loginStatus && objCourse && contentComment) {
      const comment = {
        MaBinhLuan: valueBtnRepair.maBinhLuan,
        ThoiGianBinhLuan:
          toDay.getFullYear() +
          "-" +
          (toDay.getMonth() + 1) +
          "-" +
          toDay.getDate(),
        NoiDung: contentComment,
        MaHocVien: loginStatus.MaHocVien,
        MaKhoaHoc: objCourse.MaKhoaHoc,
      };
      const temp = fetchComment.findIndex((item) => {
        return item.MaBinhLuan === valueBtnRepair.maBinhLuan;
      });
      fetchComment[temp].NoiDung = contentComment;
      fetchComment[temp].ThoiGianBinhLuan =
        toDay.getFullYear() +
        "-" +
        (toDay.getMonth() + 1) +
        "-" +
        toDay.getDate();
      setFetchComment(fetchComment);
      fetch(variables.API_URL + "binhluan/", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setValueBtnRepair(null);
          },
          (error) => {}
        );
    }
  }

  function renderContentOrInput(noiDung, maBinhLuan) {
    if (valueBtnRepair && maBinhLuan === valueBtnRepair.maBinhLuan) {
      return (
        <div className="app__home__rowbody-6__col-1__container__comment__item__info-comment__input">
          <div className="app__home__rowbody-6__col-1__container__comment__item__info-comment__input__box">
            <input
              className="effect"
              onBlur={handleBlur}
              defaultValue={noiDung}
              type="text"
            />{" "}
            <span className="focus-border"></span>
          </div>
          <button onClick={handleRepairComment}>
            <i className="bi bi-vector-pen"></i>
          </button>
        </div>
      );
    }
    return (
      <div className="app__home__rowbody-6__col-1__container__comment__item__info-comment__content">
        {noiDung}
      </div>
    );
  }

  function renderItemComment(item, userComment, index) {
    if (userComment) {
      return (
        <div
          key={index}
          className={"app__home__rowbody-6__col-1__container__comment__item"}
        >
          <div className="app__home__rowbody-6__col-1__container__comment__item__box">
            <div className="app__home__rowbody-6__col-1__container__comment__item__avata">
              <img
                src={variables.MEDIA_URL + userComment.AnhHocVien}
                alt="avata"
              />
            </div>
            <div className="app__home__rowbody-6__col-1__container__comment__item__info-comment">
              <div className="app__home__rowbody-6__col-1__container__comment__item__info-comment__name">
                {userComment && userComment.TenHocVien}
                <div className="app__home__rowbody-6__col-1__container__comment__item__info-comment__name__time-comment">
                  <i className="bi bi-clock"></i>
                  {item.ThoiGianBinhLuan}
                </div>
              </div>
              <div className="app__home__rowbody-6__col-1__container__comment__item__info-comment__star">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              {renderContentOrInput(item.NoiDung, item.MaBinhLuan)}
            </div>
          </div>
          <div className="app__home__rowbody-6__col-1__container__comment__item__options">
            <i className="bi bi-three-dots-vertical">
              <div className="app__home__rowbody-6__col-1__container__comment__item__options__comment">
                {renderBtnRepair(item.MaHocVien, item.NoiDung, item.MaBinhLuan)}
              </div>
            </i>
          </div>
        </div>
      );
    }
  }

  function renderComment() {
    if (fetchComment && hocVien) {
      const arrComment = fetchComment.filter((item) => {
        return (
          Number(item.MaKhoaHoc) ===
          Number(
            window.location.pathname.slice(
              window.location.pathname.lastIndexOf("/") + 1,
              window.location.pathname.length
            )
          )
        );
      });
      return arrComment.reverse().map((item, index) => {
        const [userComment] = hocVien.filter((value) => {
          return Number(item.MaHocVien) === value.MaHocVien;
        });
        return renderItemComment(item, userComment, index);
      });
    }
  }

  function handleBlur(e) {
    if (e.target.value) {
      setContentComment(e.target.value);
      setRemoveContentComment(e.target);
    } else {
      setContentComment(null);
    }
  }

  function handleComment(e) {
    e.preventDefault();
    let toDay = new Date();
    if (loginStatus && objCourse && contentComment) {
      removeContentComment.value = "";
      const comment = {
        ThoiGianBinhLuan:
          toDay.getFullYear() +
          "-" +
          (toDay.getMonth() + 1) +
          "-" +
          toDay.getDate(),
        NoiDung: contentComment,
        MaHocVien: loginStatus.MaHocVien,
        MaKhoaHoc: objCourse.MaKhoaHoc,
      };
      // setFetchComment([comment, ...fetchComment]);
      fetch(variables.API_URL + "binhluan/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setContentComment("");
            setCheckFetchComment(checkFetchComment + 1);
          },
          (error) => {}
        );
    }
  }

  function getHocVienOfGiaoVien() {
    let count = 0;
    if (arrCourseOfGiaoVien && khoaHocHocVien) {
      for (let i of arrCourseOfGiaoVien) {
        for (let j of khoaHocHocVien) {
          if (i.MaKhoaHoc === Number(j.MaKhoaHoc)) {
            count++;
          }
        }
      }
      return count;
    }
  }

  function getUser() {
    if (loginStatus) {
      return loginStatus.TenHocVien;
    }
  }

  function getTitleCourse() {
    if (objCourse && objgiaoVien) {
      return `Học ${objCourse.TenKhoaHoc} Cùng với ${objgiaoVien.TenGiaoVien}`;
    }
  }

  function getQuantityCourseOfGiaoVien() {
    if (arrCourseOfGiaoVien) {
      return arrCourseOfGiaoVien.length;
    }
  }

  function getInfoCourse(choose) {
    if (objCourse && choose === 1) {
      return objCourse.ThongTinKhoaHoc;
    } else if (objCourse && choose === 2) {
      return objCourse.GiaKhoaHoc;
    } else if (objCourse && choose === 3) {
      return objCourse.KhuyenMai;
    }
  }

  function getNameGiaoVien(choose) {
    if (objgiaoVien && choose === 1) {
      return objgiaoVien.TenGiaoVien;
    } else if (objgiaoVien && choose === 2) {
      return objgiaoVien.ThongTinGiaoVien;
    }
  }

  function videoCourse() {
    if (linkVideo && linkPoster) {
      return (
        <video
          controls
          poster={variables.MEDIA_URL + linkPoster}
          src={variables.MEDIA_URL + linkVideo}
        ></video>
      );
    } else {
      if (arrBaiGiang[0]) {
        return (
          <video
            controls
            poster={variables.MEDIA_URL + arrBaiGiang[0].LinkPoster}
            src={variables.MEDIA_URL + arrBaiGiang[0].LinkBaiGiang}
          ></video>
        );
      }
    }
  }

  function checkPlay(soThuTu) {
    if (checkVideo === soThuTu) {
      return <i className="bi bi-pause-circle"></i>;
    } else {
      return <i className="bi bi-play-circle"></i>;
    }
  }

  function handleClick() {
    if (objCourse && loginStatus && dataCart) {
      let checkCourseInCart = dataCart.includes(objCourse);
      if (!checkCourseInCart) {
        let dataGioHang = {
          MaKhoaHoc: objCourse.MaKhoaHoc,
          MaHocVien: loginStatus.MaHocVien,
        };
        fetch(variables.API_URL + "giohang/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataGioHang),
        })
          .then((res) => res.json())
          .then(
            (result) => {},
            (error) => {}
          );
        setGioHang([...gioHang, dataGioHang]);
      }
    }
  }

  function renderAddCart() {
    if (!checkAddCart) {
      return (
        <>
          <i className="bi bi-cart-plus-fill"></i>Thêm vào giỏ hàng{" "}
        </>
      );
    } else if (checkAddCart) {
      return (
        <>
          <i className="bi bi-bag-check"></i>Đã thêm vào giỏ hàng{" "}
        </>
      );
    }
  }

  function checkRegiterCourse() {
    const temp = dataUser.includes(
      Number(
        window.location.pathname.slice(
          window.location.pathname.lastIndexOf("/") + 1,
          window.location.pathname.length
        )
      )
    );
    if (temp) {
      return arrBaiGiang.map((item) => {
        return (
          <div
            onClick={() => {
              setCheckVideo(item.SoThuTu);
              setLinkVideo(item.LinkBaiGiang);
              setLinkPoster(item.LinkPoster);
            }}
            key={item.SoThuTu}
            className="app__home__rowbody-2__col-2__item"
          >
            <div className="app__home__rowbody-2__col-2__item__img">
              <img src={variables.MEDIA_URL + item.LinkPoster} alt="poster" />
            </div>
            <div className="app__home__rowbody-2__col-2__item__Container">
              <div className="app__home__rowbody-2__col-2__item__content">
                Bài học 1: Kinh nghiệm thu âm tại nhà
              </div>

              <div className="app__home__rowbody-2__col-2__item__status-video">
                {checkPlay(item.SoThuTu)}
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="app__home__rowbody-2__col-3__pay">
          <div className="app__home__rowbody-2__col-3__pay__sale">
            Giảm giá {getInfoCourse(3)}%
          </div>
          <div className="app__home__rowbody-2__col-3__pay__price">
            <div className="app__home__rowbody-2__col-3__pay__price__curent">
              {Math.round(
                (getInfoCourse(2) * (1 - getInfoCourse(3) / 100) * 1000) / 1000
              )}
              <sup>đ</sup>
            </div>
            <div className="app__home__rowbody-2__col-3__pay__price__past">
              {getInfoCourse(2)}
              <sup>đ</sup>
            </div>
          </div>
          <button className="app__home__rowbody-2__col-3__pay__btn-register">
            ĐĂNG KÝ HỌC
          </button>
          <button
            onClick={handleClick}
            className="app__home__rowbody-2__col-3__pay__btn-add-cart"
          >
            {renderAddCart()}
          </button>
          <div className="app__home__rowbody-2__col-3__pay__info">
            <div className="app__home__rowbody-2__col-3__pay__info__item">
              <i className="bi bi-caret-right-square-fill"></i>
              Giáo trình:
              <div className="app__home__rowbody-2__col-3__pay__info__item__content">
                {arrBaiGiang && arrBaiGiang.length} bài giảng
              </div>
            </div>
            <div className="app__home__rowbody-2__col-3__pay__info__item">
              <i className="bi bi-clock"></i>
              Sở hữu khóa học trọn đời
            </div>
          </div>
        </div>
      );
    }
  }

  function renderAvataTeacher() {
    if (objgiaoVien) {
      return variables.MEDIA_URL + objgiaoVien.AnhGiaoVien;
    }
  }

  function renderWriteComment() {
    const temp = dataUser.includes(
      Number(
        window.location.pathname.slice(
          window.location.pathname.lastIndexOf("/") + 1,
          window.location.pathname.length
        )
      )
    );
    if (temp) {
      return (
        <div className="app__home__rowbody-6__col-1__container__comment__item">
          <div className="app__home__rowbody-6__col-1__container__comment__item__box">
            <div className="app__home__rowbody-6__col-1__container__comment__item__avata">
              <img
                src={
                  loginStatus && variables.MEDIA_URL + loginStatus.AnhHocVien
                }
                alt="avata"
              />
            </div>
            <div className="app__home__rowbody-6__col-1__container__comment__item__info-comment">
              <div className="app__home__rowbody-6__col-1__container__comment__item__info-comment__name">
                {getUser()}
              </div>
              <div className="app__home__rowbody-6__col-1__container__comment__item__info-comment__input">
                <div className="app__home__rowbody-6__col-1__container__comment__item__info-comment__input__box">
                  <input
                    className="effect"
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Nhận xét của bạn?"
                  />
                  <span className="focus-border"></span>
                </div>
                <button onClick={handleComment}>
                  <i className="bi bi-vector-pen"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  function chooseEvaluate(i){

  }

  function renderHover(i){
    setClassBackground("background-icon");
  }

  function renderEvaluate(){
    let items = [];
    for(let i = 1; i <= 5; i++){
      items.push(
        <i onClick={() =>{
          chooseEvaluate(i)
        }}
         onMouseOver={() =>{
          renderHover(i)
         }}
        className={"bi bi-star " + classBackground}></i>
      );
    }
    return items;
  }

  return (
    <>
      <Row className="app__home__rowbody-1">
        <div className="app__home__rowbody-1__container">
          <Col className="app__home__rowbody-1__col" xs="8">
            <div className="app__home__rowbody-1__col__body">
              <h2 className="app__home__rowbody-1__col__body__title">
                {getTitleCourse()}
              </h2>
              <div className="app__home__rowbody-1__col__body__content">
                Hãy đến với "Học đệm hát cùng Haketu" - Guitarist nổi tiếng Việt
                Nam, nhanh chóng làm chủ cây đàn guitar trong tay với kỹ thuật
                chơi guitar cực đỉnh, học guitar cơ bản đệm hát điêu luyện để
                cùng bạn bè người yêu nghêu ngao hòa mình vào âm nhạc
              </div>
            </div>
            <div className="app__home__rowbody-1__col__footer">
              <div className="app__home__rowbody-1__col__footer__teacher">
                <img src={renderAvataTeacher()} alt="" />
                <div className="app__home__rowbody-1__col__footer__teacher__name">
                  {getNameGiaoVien(1)}
                </div>
              </div>
              <div className="app__home__rowbody-1__col__footer__evaluate">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <div className="app__home__rowbody-1__col__footer__evaluate__quantity">
                  162 đánh giá
                </div>
              </div>
              <div className="app__home__rowbody-1__col__footer__student">
                <i className="bi bi-people-fill"></i>
                <div className="app__home__rowbody-1__col__footer__student__quantity">
                  {getHocVienOfGiaoVien()} học viên
                </div>
              </div>
            </div>
          </Col>
        </div>
      </Row>
      <Row className="app__home__rowbody-2">
        <Col className="app__home__rowbody-2__col-1" xs="8">
          {/* <Player
          className=""
            playsInline
            poster="http://127.0.0.1:8000/media/72732.png"
            src="http://127.0.0.1:8000/media/Videos/music.mp4"
            type="video/mp4"
          >
            <BigPlayButton position="center" />
            <LoadingSpinner />
          </Player> */}
          <div className="app__home__rowbody-2__col-1__container">
            {videoCourse()}
          </div>
        </Col>
        <Col className="app__home__rowbody-2__col-2" xs="4">
          <div className="app__home__rowbody-2__col-2__container">
            {checkRegiterCourse()}
          </div>
        </Col>
      </Row>
      <Row className="app__home__rowbody-3">
        <Col className="app__home__rowbody-3__col-1" xs="8">
          <div className="app__home__rowbody-3__col-1__container">
            <div className="app__home__rowbody-3__col-1__title">
              Giới thiệu khóa học
            </div>
            <div className="app__home__rowbody-3__col-1__content">
              {getInfoCourse(1)}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="app__home__rowbody-4">
        <Col className="app__home__rowbody-4__col-1" xs="8">
          <div className="app__home__rowbody-4__col-1__container">
            <div className="app__home__rowbody-4__col-1__container__title">
              Thông tin giảng viên
            </div>
            <div className="app__home__rowbody-4__col-1__container__content">
              <div className="app__home__rowbody-4__col-1__container__content__teacher">
                <div className="app__home__rowbody-4__col-1__container__content__teacher__img">
                  <img src={renderAvataTeacher()} alt="avata" />
                </div>
                <div className="app__home__rowbody-4__col-1__container__content__teacher__member">
                  <i className="bi bi-people-fill"></i>
                  <div className="app__home__rowbody-4__col-1__container__content__teacher__member__quantity">
                    {getHocVienOfGiaoVien()}
                  </div>
                  học viên
                </div>
                <div className="app__home__rowbody-4__col-1__container__content__teacher__course">
                  <i className="bi bi-caret-right-square-fill"></i>
                  <div className="app__home__rowbody-4__col-1__container__content__teacher__course__quantity">
                    {getQuantityCourseOfGiaoVien()}
                  </div>
                  khóa học
                </div>
              </div>
              <div className="app__home__rowbody-4__col-1__container__content__detail-teacher">
                <div className="app__home__rowbody-4__col-1__container__content__detail-teacher__name">
                  {getNameGiaoVien(1)}
                </div>
                {/* <div className="app__home__rowbody-4__col-1__container__content__detail-teacher__title">
                  Giảng viên Guitar - Youtuber nổi tiếng cộng đồng guitar Việt
                  Nam
                </div> */}
                <div className="app__home__rowbody-4__col-1__container__content__detail-teacher__content">
                  {getNameGiaoVien(2)}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="app__home__rowbody-5">
        <Col className="app__home__rowbody-5__col-1" xs="8">
          <div className="app__home__rowbody-5__col-1__container">
            <div className="app__home__rowbody-5__col-1__container__title">
              Đánh giá của học viên
            </div>
            <div className="app__home__rowbody-5__col-1__container__evaluate">
              <div>Chọn đánh giá của bạn</div>
              {renderEvaluate()}
            </div>
            <div className="app__home__rowbody-5__col-1__container__content">
              <div className="app__home__rowbody-5__col-1__container__content__evaluate__left">
                <div className="app__home__rowbody-5__col-1__container__content__evaluate__left__container">
                  <div className="app__home__rowbody-5__col-1__container__content__evaluate__left__average">
                    4
                  </div>
                  <div className="app__home__rowbody-5__col-1__container__content__evaluate__left__star">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <div className="app__home__rowbody-5__col-1__container__content__evaluate__left__quantity">
                    162 đánh giá
                  </div>
                </div>
              </div>
              <div className="app__home__rowbody-5__col-1__container__content__evaluate__right">
                <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__item">
                  <ProgressBar
                    now={60}
                    className="app__home__rowbody-5__col-1__container__content__evaluate__right__item__progressbar"
                  />
                  <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__box">
                    <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__item__box__star">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    60%
                  </div>
                </div>
                <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__item">
                  <ProgressBar
                    now={60}
                    className="app__home__rowbody-5__col-1__container__content__evaluate__right__item__progressbar"
                  />
                  <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__box">
                    <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__item__box__star">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star"></i>
                    </div>
                    60%
                  </div>
                </div>
                <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__item">
                  <ProgressBar
                    now={40}
                    className="app__home__rowbody-5__col-1__container__content__evaluate__right__item__progressbar"
                  />
                  <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__box">
                    <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__item__box__star">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star"></i>
                      <i className="bi bi-star"></i>
                    </div>
                    40%
                  </div>
                </div>
                <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__item">
                  <ProgressBar
                    now={0}
                    className="app__home__rowbody-5__col-1__container__content__evaluate__right__item__progressbar"
                  />
                  <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__box">
                    <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__item__box__star">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star"></i>
                      <i className="bi bi-star"></i>
                      <i className="bi bi-star"></i>
                    </div>
                    0%
                  </div>
                </div>
                <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__item">
                  <ProgressBar
                    now={10}
                    className="app__home__rowbody-5__col-1__container__content__evaluate__right__item__progressbar"
                  />
                  <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__box">
                    <div className="app__home__rowbody-5__col-1__container__content__evaluate__right__item__box__star">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star"></i>
                      <i className="bi bi-star"></i>
                      <i className="bi bi-star"></i>
                      <i className="bi bi-star"></i>
                    </div>
                    10%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="app__home__rowbody-6">
        <Col className="app__home__rowbody-6__col-1" xs="8">
          <div className="app__home__rowbody-6__col-1__container">
            <div className="app__home__rowbody-6__col-1__container__title">
              Nhận xét của học viên
            </div>
            <div className="app__home__rowbody-6__col-1__container__comment">
              {renderWriteComment()}
              {renderComment()}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default CourseDetail;
