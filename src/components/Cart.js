import { Col, Row } from "reactstrap";
import { Context } from "../contexts/Context";
import { useContext, useState, useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { variables } from "../Variables";
import Toast from "./Toast";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
function Cart() {
  const {
    giaoVien,
    dataCart,
    tenGiaoVien,
    setGioHang,
    gioHang,
    setKhoaHocHocVien,
    khoaHocHocVien,
    dataUser,
    setDataUser,
  } = useContext(Context);
  const [bill, setBill] = useState(0);
  const [checkPayment, setCheckPayment] = useState(null);
  const [fetchCart, setFetchCart] = useState([]);
  const [killComponent, setKillComponent] = useState(null);
  // document.addEventListener('touchstart', {passive: true, capture: false});

  useEffect(() => {
    fetch(variables.API_URL + "giohang/")
      .then((response) => response.json())
      .then((data) => {
        setFetchCart(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: (bill / 23800).toFixed(2),
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    setCheckPayment(data);
    return actions.order.capture();
  };

  useEffect(() => {
    if (checkPayment) {
      setTimeout(() =>{
        setKillComponent(true);
      }, 4000);
      for (let i of fetchCart) {
        fetch(variables.API_URL + "khoahochocvien/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MaKhoaHoc: i.MaKhoaHoc,
            MaHocVien: i.MaHocVien,
          }),
        })
          .then((res) => res.json())
          .then(
            (result) => {},
            (error) => {}
          );

        setKhoaHocHocVien([
          ...khoaHocHocVien,
          { MaKhoaHoc: i.MaKhoaHoc, MaHocVien: i.MaHocVien },
        ]);

        setDataUser([...dataUser, i.MaKhoaHoc]);

        fetch(variables.API_URL + "giohang/" + i.MaGioHang, {
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
      }
      setGioHang([]);
    }
  }, [checkPayment]);

  function getSum(total, item) {
    return (
      Math.round((item.GiaKhoaHoc * (1 - item.KhuyenMai / 100) * 1000) / 1000) +
      total
    );
  }
  useEffect(() => {
    setBill(dataCart.reduce(getSum, 0));
  }, [dataCart]);

  function handleRemove(maKhoaHoc) {
    const [objGioHang] = fetchCart.filter((item) => {
      return maKhoaHoc === Number(item.MaKhoaHoc);
    });
    fetch(variables.API_URL + "giohang/" + objGioHang.MaGioHang, {
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

    const replaceGioHang = gioHang.filter((item) => {
      return Number(item.MaKhoaHoc) !== maKhoaHoc;
    });
    setGioHang(replaceGioHang);
  }
  function rederCourse() {
    if (dataCart.length !== 0) {
      return (
        <>
          <Col
            className="app__home__container__rowbody__Cart-body__col-1"
            xs="8"
          >
            {dataCart &&
              dataCart.map((item, index) => {
                return (
                  <Row
                    key={index}
                    className="app__home__container__rowbody__Cart-body__col-1__row"
                  >
                    <div className="app__home__container__rowbody__Cart-body__col-1__row__item">
                      <div className="app__home__container__rowbody__Cart-body__col-1__row__item__container">
                        <div className="app__home__container__rowbody__Cart-body__col-1__row__item__container__img">
                          <img
                            src={variables.MEDIA_URL + item.LinkAnhKhoaHoc}
                            alt="img"
                          />
                        </div>
                        <div className="app__home__container__rowbody__Cart-body__col-1__row__item__container__info">
                          <div className="app__home__container__rowbody__Cart-body__col-1__row__item__container__info__name">
                            {item.TenKhoaHoc}
                          </div>
                          <div className="app__home__container__rowbody__Cart-body__col-1__row__item__container__info__teacher">
                            {tenGiaoVien(item.MaGiaoVien, giaoVien)}
                          </div>
                        </div>
                        <div className="app__home__container__rowbody__Cart-body__col-1__row__item__container__cost">
                          <div className="app__home__container__rowbody__Cart-body__col-1__row__item__container__cost-sale">
                            {Math.round(
                              (item.GiaKhoaHoc *
                                (1 - item.KhuyenMai / 100) *
                                1000) /
                                1000
                            )}
                            <sup>đ</sup>
                          </div>
                          <div className="app__home__container__rowbody__Cart-body__col-1__row__item__container__cost-primary">
                            {item.GiaKhoaHoc}
                            <sup>đ</sup>
                          </div>
                        </div>
                      </div>
                      <div className="app__home__container__rowbody__Cart-body__col-1__row__item__container__icon-trash">
                        <i
                          onClick={() => {
                            handleRemove(item.MaKhoaHoc);
                          }}
                          className="bi bi-trash"
                        ></i>
                      </div>
                    </div>
                  </Row>
                );
              })}
          </Col>

          <Col
            className="app__home__container__rowbody__Cart-body__col-2"
            xs="4"
          >
            <div className="app__home__container__rowbody__Cart-body__col-2__container">
              <div className="app__home__container__rowbody__Cart-body__col-2__container__head">
                <div className="app__home__container__rowbody__Cart-body__col-2__container__head__course">
                  Khóa học
                </div>
                <div className="app__home__container__rowbody__Cart-body__col-2__container__head__cost">
                  Giá
                </div>
              </div>
              <div className="app__home__container__rowbody__Cart-body__col-2__container__body">
                {dataCart.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="app__home__container__rowbody__Cart-body__col-2__container__body__item-pay"
                    >
                      <div className="app__home__container__rowbody__Cart-body__col-2__container__body__item-pay__name">
                        {item.TenKhoaHoc} -{" "}
                        {tenGiaoVien(item.MaGiaoVien, giaoVien)}
                      </div>
                      <div className="app__home__container__rowbody__Cart-body__col-2__container__body__item-pay__cost">
                        {Math.round(
                          (item.GiaKhoaHoc *
                            (1 - item.KhuyenMai / 100) *
                            1000) /
                            1000
                        )}
                        <sup>đ</sup>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="app__home__container__rowbody__Cart-body__col-2__container__footer">
                <div className="app__home__container__rowbody__Cart-body__col-2__container__footer__sum-cost">
                  Tổng tiền sản phẩm: <span>{bill}</span>
                  <sup>đ</sup>
                </div>
                {/* <div className="app__home__container__rowbody__Cart-body__col-2__container__footer__btn">
                  <button>Thanh toán</button>
                </div> */}
                <div className="app__home__container__rowbody__Cart-body__col-2__container__footer__btn-paypal">
                  <PayPalButton
                    createOrder={(data, actions) => createOrder(data, actions)}
                    onApprove={(data, actions) => onApprove(data, actions)}
                  />
                </div>
              </div>
            </div>
          </Col>
        </>
      );
    } else {
      return (
        <div className="app__home__container__rowbody__cart">
          {/* <div className="app__home__container__rowbody__cart__notifi">
            Giỏ hàng (0 khóa học)
          </div> */}

          <i className=" bi bi-cart3"></i>
          <div className="app__home__container__rowbody__cart__content">
            Hiện tại giỏ hàng của bạn chưa có khóa học nào. <br />
            Vui lòng lựa chọn khóa học mà bạn muốn học.
          </div>
        </div>
      );
    }
  }

  function renderToast() {
    if (checkPayment && !killComponent) {
      return <Toast/>;
    }
    else{
      return<> </>
    }
  }

  return (
    <>
      {renderToast()}
      <Row className="app__home__container__rowbody__Cart-head">
        Giỏ hàng của bạn: <strong>{dataCart && dataCart.length}</strong> khóa
        học
      </Row>
      <Row className="app__home__container__rowbody__Cart-body">
        {rederCourse()}
      </Row>
    </>
  );
}

export default Cart;
