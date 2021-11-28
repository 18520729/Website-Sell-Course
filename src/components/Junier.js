import { useContext } from "react";
import { Row, Col } from "reactstrap";
import Course from "./Course";
import { Context } from "../contexts/Context";

function Junier() {
  const {khoaHoc, giaoVien, tenGiaoVien} = useContext(Context);
  return (
    <>
      <Row className="app__home__container__rowcourse">
        <div className="app__home__container__rowcourse__title">KHÓA HỌC DÀNH CHO HỌC SINH CẤP 2</div>
        {khoaHoc.map((course) => {
           if(course.LoaiKhoaHoc === "2"){
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
        })}
      </Row>
    </>
  );
}

export default Junier;
