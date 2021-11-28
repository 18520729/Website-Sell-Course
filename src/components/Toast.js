function Toast() {
  return (
    <div className="app__home__container__rowbody__Cart-toast">
      <div className="app__home__container__rowbody__Cart-toast__container">
        <div className="app__home__container__rowbody__Cart-toast__icon">
          <i className="bi bi-check-circle"></i>
        </div>
        <div className="app__home__container__rowbody__Cart-toast__body">
          <h3 className="app__home__container__rowbody__Cart-toast__body__title">
            Success
          </h3>
          <div className="app__home__container__rowbody__Cart-toast__body__massage">
            Thanh toán thành công
          </div>
        </div>
        <div className="app__home__container__rowbody__Cart-toast__close">
          <i className="bi bi-x"></i>
        </div>
      </div>
    </div>
  );
}

export default Toast;
