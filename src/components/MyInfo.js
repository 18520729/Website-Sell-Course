import { Col, Row } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/Context";
import { variables } from "../Variables";
import { Link } from "react-router-dom";

function MyInfo() {
  return (
    <>
      <Row className="app__home__container__rowbody__my-info__header">
        <Col className="app__home__container__rowbody__my-info__header__col">
          <div className="app__home__container__rowbody__my-info__header__col__container">
            <div>Thông tin tài khoản</div>
          </div>
        </Col>
      </Row>
      <Row className="app__home__container__rowbody__my-info__body">
        <Col className="app__home__container__rowbody__my-info__body__col">
          <div className="app__home__container__rowbody__my-info__body__col__container">
            <form action="">
              <div className="form-myinfo__container">
                <div className="form-myinfo__container__form">
                  <div className="form-myinfo__container__form__in">
                    <input
                      className={
                        "form-myinfo__container__form__in__input-name-user"
                      }
                      type="text"
                      placeholder="Họ và tên"
                    />
                    <div
                      className={
                        "form-myinfo__container__form__in_err-input "
                      }
                    >
                      Vui lòng nhập họ và tên của bạn!
                    </div>
                    <input
                      className={
                        "form-myinfo__container__form__in__input-name-account"
                      }
                      type="text"
                      placeholder="Email"
                    />
                    <div
                      className={
                        "form-myinfo__container__form__in_err-input "
                      }
                    >
                      Vui lòng nhập Email!
                    </div>
                    <div
                      className={
                        "form-myinfo__container__form__in_err-input "
                      }
                    >
                      Email không hợp lệ!
                    </div>
                    <input
                      className="form-myinfo__container__form__in__input-bithday"
                      type="text"
                      placeholder="Ngày sinh"
                    />
                    <div
                      className={"form-myinfo__container__form__in_err-input"}
                    >
                      Vui lòng nhập ngày sinh của bạn!
                    </div>
                    <input
                      autoComplete="true"
                      className="form-myinfo__container__form__in__pass"
                      type="password"
                      placeholder="Mật khẩu"
                    />
                    <div
                      className={"form-myinfo__container__form__in_err-input"}
                    >
                      Vui lòng nhập mật khẩu!
                    </div>
                    <div
                      className={"form-myinfo__container__form__in_err-input"}
                    >
                      Mật khẩu có độ dài phải lớn hơn 8 ký tự!
                    </div>
                    <input
                      autoComplete="true"
                      className="form-myinfo__container__form__in__pass-confirm"
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                    />
                    <div
                      className={"form-myinfo__container__form__in_err-input"}
                    >
                      Vui lòng nhập lại mật khẩu!
                    </div>
                    <div
                      className={"form-myinfo__container__form__in_err-input"}
                    >
                      Mật khẩu nhập lại không chính xác!
                    </div>
                    <div className="form-myinfo__container__form__in__gender">
                      <label htmlFor="male">
                        <input
                          name="gender"
                          value="male"
                          id="male"
                          type="radio"
                          defaultChecked
                        />{" "}
                        Nam{" "}
                      </label>
                      <label htmlFor="female">
                        <input
                          name="gender"
                          value="female"
                          id="female"
                          type="radio"
                        />{" "}
                        Nữ{" "}
                      </label>
                    </div>
                    <div className={"form-myinfo__container__form__warning"}>
                      Email đã tồn tại!
                    </div>
                    <div
                      className={"form-myinfo__container__form__issuccess"}
                    >
                      Đăng ký thành công
                    </div>
                    <button
                      type="submit"
                      className="form-myinfo__container__form__in__btn"
                    >
                      ĐĂNG KÝ
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default MyInfo;
