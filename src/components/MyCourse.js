import { useContext } from "react";
import { Row, Col } from "reactstrap";
import Course from "./Course";
import { Context } from "../contexts/Context";

function MyCourse() {
  const { khoaHoc, giaoVien, tenGiaoVien, dataUser } = useContext(Context);
  const [firstCousre] = dataUser;
  const conditionLoaiKhoaHoc = (item, index) => {
    const [myCourse] = khoaHoc.filter((course) => {
      return course.MaKhoaHoc === item;
    });
    if (myCourse) {
      return (
        <Col
          key={index}
          className="app__home__container__rowcourse__col"
          lg="3"
          xs="6"
        >
          <Course
            course={myCourse}
            tenGiaoVien={tenGiaoVien(myCourse.MaGiaoVien, giaoVien)}
          />
        </Col>
      );
    }
  };
  function renderMyCourse() {
      
    if(firstCousre){
        return dataUser.map((item, index) => {
            return conditionLoaiKhoaHoc(item, index);
          });
    }
    else{
        return(
            <div>Bạn chưa có khóa học nào</div>
        )
    }
  }
  return (
    <>
      <Row className="app__home__container__rowcourse">{renderMyCourse()}</Row>
    </>
  );
}

export default MyCourse;
