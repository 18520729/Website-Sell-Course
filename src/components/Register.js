import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useHistory } from "react-router-dom";
import { variables } from "../Variables";
import { useState, useContext } from "react";
import { Context } from "../contexts/Context";

function Register() {
  const history = useHistory();
  const { setHocVien, hocVien } = useContext(Context);
  const [classErrName, setClassErrName] = useState("");
  const [classErrEmail, setClassErrEmail] = useState("");
  const [classErrInvalidEmail, setClassErrInvalidEmail] = useState("");
  const [classErrBirthday, setClassErrBirthday] = useState("");
  const [classErrPass, setClassErrPass] = useState("");
  const [classErrLengthPass, setClassErrLengthPass] = useState("");
  const [classErrComfirmPass, setClassErrComfirmPass] = useState("");
  const [password, setPassword] = useState("");
  const [classErrIsComfirmPass, setClassErrIsComfirmPass] = useState("");
  const [classCheckWarningEmail, setClassCheckWarningEmail] = useState("");
  const [classIsSuccess, setClassIsSuccess] = useState("");

  const [checkName, setCheckName] = useState(" class-err");
  const [checkMail, setCheckMail] = useState(" class-err");
  const [checkBirthday, setCheckBirthday] = useState(" class-err");
  const [checkPass, setCheckPass] = useState(" class-err");
  const [checkIsComfirmPass, setCheckIsComfirmPass] = useState(" class-err");

  const [dataUse, setDataUse] = useState({
    TenHocVien: "",
    EmailHocVien: "",
    MatKhau: "",
    NgaySinh: "",
    GioiTinh: "male",
    SoDuTaiKhoan: 0,
    AnhHocVien: "anhhocvien",
  });

  function createClick() {
    let checkEmailExist = hocVien.some((value) => {
      return value.EmailHocVien === dataUse.EmailHocVien;
    });
    if (!checkEmailExist) {
      history.push("/login");
      setClassCheckWarningEmail("");
      setClassIsSuccess(" issuccess");
      setHocVien([...hocVien, dataUse]);
      fetch(variables.API_URL + "hocvien", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUse),
      })
        .then((res) => res.json())
        .then(
          (result) => {},
          (error) => {}
        );
    } else {
      setClassCheckWarningEmail(" showwarning-email");
    }
  }

  function handleSubmit() {
    setClassErrName(checkName);
    setClassErrEmail(checkMail);
    setClassErrBirthday(checkBirthday);
    setClassErrPass(checkPass);
    setClassErrComfirmPass(checkIsComfirmPass);
    if (
      checkName === "" &&
      checkMail === "" &&
      checkBirthday === "" &&
      checkPass === "" &&
      checkIsComfirmPass === "" &&
      classErrIsComfirmPass === ""
    ) {
      createClick();
    }
  }

  function handleBlurGender(e) {
    setDataUse({ ...dataUse, GioiTinh: e.target.value });
  }

  function handleBlurName(e) {
    if (!e.target.value) setClassErrName(" class-err");
    setDataUse({ ...dataUse, TenHocVien: e.target.value });
  }
  function handleFocusName() {
    setClassErrName("");
    setCheckName("");
  }
  function handleBlurEmail(e) {
    setDataUse({ ...dataUse, EmailHocVien: e.target.value });
    if (!e.target.value) {
      setClassErrEmail(" class-err");
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
    )
      setClassErrInvalidEmail(" class-err");
  }
  function handleFocusEmail() {
    setClassErrEmail("");
    setClassErrInvalidEmail("");
    setCheckMail("");
  }

  function handleBlurBirthday(e) {
    setDataUse({ ...dataUse, NgaySinh: e.target.value });
    if (!e.target.value) setClassErrBirthday(" class-err");
  }
  function handleFocusBirthday() {
    setClassErrBirthday("");
    setCheckBirthday("");
  }

  function handleBlurPass(e) {
    setDataUse({ ...dataUse, MatKhau: e.target.value });
    if (!e.target.value) {
      setClassErrPass(" class-err");
    } else if (e.target.value.length < 8) {
      setClassErrLengthPass(" class-err");
      setPassword(e.target.value);
    } else setPassword(e.target.value);
  }

  function handleFocusPass() {
    setClassErrPass("");
    setClassErrLengthPass("");
    setCheckPass("");
  }

  function handleBlurComfirmPass(e) {
    if (!e.target.value) {
      setClassErrComfirmPass(" class-err");
    } else if (e.target.value !== password)
      setClassErrIsComfirmPass(" class-err");
  }
  function handleFocusComfirmPass() {
    setClassErrComfirmPass("");
    setClassErrIsComfirmPass("");
    setCheckIsComfirmPass("");
  }

  return (
    <div className="form-register">
      <div className="form-register__container">
        <Link to="">
          <img
            className="form-register__container__logo"
            src={variables.MEDIA_URL + "logo-big.png"}
            alt="logo"
          />
        </Link>
        <div className="form-register__container__form">
          <div className="form-register__container__form__in">
            <div className="form-register__container__form__in__title">
              ĐĂNG KÝ TÀI KHOẢN
            </div>
            <input
              onBlur={handleBlurName}
              onFocus={handleFocusName}
              className={"form-register__container__form__in__input-name-user"}
              type="text"
              placeholder="Họ và tên"
            />
            <div
              className={
                "form-register__container__form__in_err-input " + classErrName
              }
            >
              Vui lòng nhập họ và tên của bạn!
            </div>
            <input
              onBlur={handleBlurEmail}
              onFocus={handleFocusEmail}
              className={
                "form-register__container__form__in__input-name-account"
              }
              type="text"
              placeholder="Email"
            />
            <div
              className={
                "form-register__container__form__in_err-input " + classErrEmail
              }
            >
              Vui lòng nhập Email!
            </div>
            <div
              className={
                "form-register__container__form__in_err-input " +
                classErrInvalidEmail
              }
            >
              Email không hợp lệ!
            </div>
            <input
              className="form-register__container__form__in__input-bithday"
              type="text"
              onBlur={handleBlurBirthday}
              onFocus={(e) => {
                handleFocusBirthday(e);
                e.currentTarget.type = "date";
                e.currentTarget.focus();
              }}
              placeholder="Ngày sinh"
            />
            <div
              className={
                "form-register__container__form__in_err-input" +
                classErrBirthday
              }
            >
              Vui lòng nhập ngày sinh của bạn!
            </div>
            <input
              onBlur={handleBlurPass}
              onFocus={handleFocusPass}
              className="form-register__container__form__in__pass"
              type="password"
              placeholder="Mật khẩu"
            />
            <div
              className={
                "form-register__container__form__in_err-input" + classErrPass
              }
            >
              Vui lòng nhập mật khẩu!
            </div>
            <div
              className={
                "form-register__container__form__in_err-input" +
                classErrLengthPass
              }
            >
              Mật khẩu có độ dài phải lớn hơn 8 ký tự!
            </div>
            <input
              onBlur={handleBlurComfirmPass}
              onFocus={handleFocusComfirmPass}
              className="form-register__container__form__in__pass-confirm"
              type="password"
              placeholder="Nhập lại mật khẩu"
            />
            <div
              className={
                "form-register__container__form__in_err-input" +
                classErrComfirmPass
              }
            >
              Vui lòng nhập lại mật khẩu!
            </div>
            <div
              className={
                "form-register__container__form__in_err-input" +
                classErrIsComfirmPass
              }
            >
              Mật khẩu nhập lại không chính xác!
            </div>
            <div className="form-register__container__form__in__gender">
              <label htmlFor="male">
                <input
                  onClick={handleBlurGender}
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
                  onClick={handleBlurGender}
                  name="gender"
                  value="female"
                  id="female"
                  type="radio"
                />{" "}
                Nữ{" "}
              </label>
            </div>
            <div
              className={
                "form-register__container__form__warning" +
                classCheckWarningEmail
              }
            >
              Email đã tồn tại!
            </div>
            <div
              className={
                "form-register__container__form__issuccess" + classIsSuccess
              }
            >
              Đăng ký thành công
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="form-register__container__form__in__btn"
            >
              ĐĂNG KÝ
            </button>
            <div className="form-register__container__form__in__transform">
              Bạn có tài khoản? <Link to="/login"> Đăng nhập</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
