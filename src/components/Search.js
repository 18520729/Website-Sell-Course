import { useContext } from "react";
import { Row, Col } from "reactstrap";
import Course from "./Course";
import { Context } from "../contexts/Context";
import Pagination from "react-bootstrap/Pagination";

function Search() {
  const {
    khoaHoc,
    giaoVien,
    tenGiaoVien,
    dataSearch,
    activePage,
    setActivePage,
    offset,
    setOffset,
    test,
    setTest,
  } = useContext(Context);
  const temp = 8;

  function filterCourse() {
    if (dataSearch !== "") {
      return khoaHoc.filter((course) => {
        let existCourse = course.TenKhoaHoc.toString()
          .toLowerCase()
          .includes(dataSearch.toString().trim().toLowerCase());
        if (existCourse) {
          return true;
        }
        return false;
      }).length;
    } else {
      return 0;
    }
  }

  function findCourse() {
    let temp = [];
    let existCourse;
    for (let i = 0; i < khoaHoc.length; i++) {
      existCourse = khoaHoc[i].TenKhoaHoc.toString()
        .toLowerCase()
        .includes(dataSearch.toString().trim().toLowerCase());
      if (dataSearch !== "" && existCourse) {
        temp.push(khoaHoc[i]);
      }
    }
    return temp;
  }

  function handlePrevPage() {
    if (offset - temp >= 0 && test - 1 >= 0) {
      setActivePage(activePage - 1);
      setOffset(offset - temp);
      setTest(test - 1);
    }
  }

  function handleNextPage() {
    const arrCourse = findCourse();
    if (activePage + 1 <= Math.ceil(arrCourse.length / temp)) {
      setActivePage(activePage + 1);
      setOffset(offset + temp);
      setTest(test + 1);
    }
  }

  function handleFirstPage() {
    setActivePage(1);
    setOffset(0);
    setTest(1);
  }

  function handleLastPage() {
    const arrCourse = findCourse();
    if (activePage + 1 <= Math.ceil(arrCourse.length / temp)) {
      setActivePage(Math.ceil(arrCourse.length / temp));
      setOffset(offset + (temp* Math.ceil(arrCourse.length / temp) - temp));
      setTest(Math.ceil(arrCourse.length / temp));
    }
  }

  function handlePageChange(i) {
    setActivePage(i);
    if (i > test) {
      setOffset(temp * (i - 1));
    } else if (i < test) {
      setOffset(offset - temp * (test - i));
    }
    setTest(i);
  }

  function renderPagination() {
    const arrCourse = findCourse();
    let items = [];
    if (dataSearch !== "" && arrCourse.length !== 0) {
      for (let i = 1; i <= Math.ceil(arrCourse.length / temp); i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={activePage === i}
            onClick={() => {
              handlePageChange(i);
            }}
          >
            {i}
          </Pagination.Item>
        );
      }
      return (
        <Pagination>
          <Pagination.First onClick={handleFirstPage} />
          <Pagination.Prev onClick={handlePrevPage} />
          {items}
          <Pagination.Next onClick={handleNextPage} />
          <Pagination.Last onClick={handleLastPage} />
        </Pagination>
      );
    }
  }

  function renderCourse() {
    let items = [];
    const arrCourse = findCourse();
    let countCourse = 0;
    if (arrCourse) {
      for (let i = offset; i < arrCourse.length; i++) {
        if (countCourse < temp) {
          ++countCourse;
          items.push(
            <Col
              key={arrCourse[i].MaKhoaHoc}
              className="app__home__container__rowcourse__col"
              lg="3"
              xs="6"
            >
              <Course
                course={arrCourse[i]}
                tenGiaoVien={tenGiaoVien(arrCourse[i].MaGiaoVien, giaoVien)}
              />
            </Col>
          );
        }
      }
    }
    return items;
  }

  return (
    <>
      <Row className="app__home__container__rowbody__search">
        <Col className="app__home__container__rowbody__col-1" xs="6">
          <div className="app__home__container__rowbody__col__search">
            Kết quả tìm kiếm: {dataSearch}
          </div>
        </Col>
        <Col className="app__home__container__rowbody__col-2" xs="6">
          <div>
            Tìm thấy <strong>{filterCourse()}</strong> khóa học online
          </div>
        </Col>
      </Row>
      <Row className="app__home__container__rowcourse">{renderCourse()}</Row>
      <Row className="app__home__container__rowpagination">
        <div className="app__home__container__rowpagination__container">
          {renderPagination()}
        </div>
      </Row>
    </>
  );
}

export default Search;
