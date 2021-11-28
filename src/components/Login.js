import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../contexts/Context";
import { variables } from "../Variables";

function Login() {
  const history = useHistory();
  const { hocVien, setLoginStatus } = useContext(Context);
  const [classErrEmail, setClassErrEmail] = useState("");
  const [classErrInvalidEmail, setClassErrInvalidEmail] = useState("");
  const [classErrPass, setClassErrPass] = useState("");
  const [classCheckWarning, setClassCheckWarning] = useState("");

  const [checkMail, setCheckMail] = useState(" class-err");
  const [checkPass, setCheckPass] = useState(" class-err");

  const [dataUse, setDataUse] = useState({
    EmailHocVien: "",
    MatKhau: "",
  });

  const loginClick = () => {
    const [existHocVien] = hocVien.filter((item) => {
      return item.EmailHocVien === dataUse.EmailHocVien;
    });
    if (existHocVien && existHocVien.MatKhau === dataUse.MatKhau) {
      setLoginStatus(existHocVien);
      localStorage.setItem("18520729", JSON.stringify(existHocVien));
      history.push("");
      setClassCheckWarning("");
    } else if (!existHocVien || existHocVien.MatKhau !== dataUse.MatKhau) {
      setClassCheckWarning(" showwarning");
    }
  };

  function handleSubmit() {
    setClassErrEmail(checkMail);
    setClassErrPass(checkPass);
    if (checkMail === "" && checkPass === "") {
      loginClick();
    }
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
    setCheckMail("");
    setClassErrInvalidEmail("");
  }

  function handleBlurPass(e) {
    setDataUse({ ...dataUse, MatKhau: e.target.value });
    if (!e.target.value) {
      setClassErrPass(" class-err");
      setCheckPass(" class-err");
    }
  }
  function handleFocusPass() {
    setClassErrPass("");
    setCheckPass("");
  }
  return (
    <div className="form-login">
      <div className="form-login__container">
        <Link to="">
          <img
            className="form-login__container__logo"
            src={variables.MEDIA_URL + "logo-big.png"}
            alt="logo"
          />
        </Link>
        <div className="form-login__container__form">
          <div className="form-login__container__form__in">
            <div className="form-login__container__form__in__title">
              ĐĂNG NHẬP
            </div>
            <input
              onBlur={handleBlurEmail}
              onFocus={handleFocusEmail}
              className="form-login__container__form__in__input-name-account"
              type="text"
              placeholder="Email của bạn"
            />
            <div
              className={
                "form-login__container__form__in_err-input" + classErrEmail
              }
            >
              Vui lòng nhập Email!
            </div>
            <div
              className={
                "form-login__container__form__in_err-input" +
                classErrInvalidEmail
              }
            >
              Email không hợp lệ!
            </div>
            <input
              onBlur={handleBlurPass}
              onFocus={handleFocusPass}
              className="form-login__container__form__in__pass"
              type="password"
              placeholder="Nhập mật khẩu"
            />
            <div
              className={
                "form-login__container__form__in_err-input" + classErrPass
              }
            >
              Vui lòng nhập mật khẩu!
            </div>

            <div
              className={
                "form-login__container__form__submit" + classCheckWarning
              }
            >
              Email hoặc mật khẩu không chính xác!
            </div>
            <button
              onClick={handleSubmit}
              className="form-login__container__form__in__btn"
            >
              ĐĂNG NHẬP
            </button>
            <div className="form-login__container__form__in__transform">
              Bạn chưa có tài khoản? <Link to="/register"> Đăng kí mới</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
