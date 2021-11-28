import { Link } from "react-router-dom";
import {variables} from "../Variables";

function Course({ course, tenGiaoVien}) {
  return (
    <div className="app__home__container__rowcourse__col__container">
      <Link
        className="app__home__container__rowcourse__col__container__link"
        to={"/course/" + course.MaKhoaHoc}               
      >
        <div className="app__home__container__rowcourse__col__container__link__promotion">-{course.KhuyenMai}%</div>
        <div className="app__home__container__rowcourse__col__container__link__img">
          <img src={variables.MEDIA_URL + course.LinkAnhKhoaHoc} alt="course" />
        </div>
        <div className="app__home__container__rowcourse__col__container__link__detail">
          <div className="app__home__container__rowcourse__col__container__link__detail__namecourse">
            {course.TenKhoaHoc}
          </div>
          <div className="app__home__container__rowcourse__col__container__link__detail__info">
            <div className="app__home__container__rowcourse__col__container__link__detail__info__nameteacher">
              {tenGiaoVien}
            </div>
            <div className="app__home__container__rowcourse__col__container__link__detail__info__pricecontainer">
              <div className="app__home__container__rowcourse__col__container__link__detail__info__pricecontainer__priceseo">
                {course.GiaKhoaHoc}
                <sup>đ</sup>
              </div>
              <div className="app__home__container__rowcourse__col__container__link__detail__info__pricecontainer__price">
                {Math.round(
                  (course.GiaKhoaHoc * (1 - course.KhuyenMai / 100) * 1000) /
                    1000
                )}
                <sup>đ</sup>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Course;
