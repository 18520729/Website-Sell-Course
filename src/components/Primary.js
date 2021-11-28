import { useContext } from "react";
import { Row, Col } from "reactstrap";
import Course from "./Course";
import { Context } from "../contexts/Context";

function Primary() {
  const {khoaHoc, giaoVien, tenGiaoVien} = useContext(Context);

  function renderCourse(){
    let countCourse = 0;
    return khoaHoc.map((course, index) => {
      if(course.LoaiKhoaHoc === "1" && countCourse < 8){
        ++countCourse;
        return (
          <Col
            key={course.MaKhoaHoc}
            className="app__home__container__rowcourse__col"
            lg="3"
            xs="6"
          >
            <Course
              course={course}
              tenGiaoVien={tenGiaoVien(course.MaGiaoVien, giaoVien)}
            />
          </Col>
        );    
      }
      return null;
    })
  }

  return (
    <>
      <Row className="app__home__container__rowcourse">
        <div className="app__home__container__rowcourse__title">KHÓA HỌC DÀNH CHO HỌC SINH CẤP 1</div>
        {renderCourse()}
      </Row>
    </>
  );
}

export default Primary;
