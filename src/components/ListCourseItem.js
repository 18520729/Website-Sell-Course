import CourseItem from "./CourseItem";

function ListCourseItem(props) {
  return (
    <li className="listcourse__container__item">
      <div className="listcourse__container__item__content">
        <div>
          <i className="bi bi-journal-bookmark-fill"></i> {props.content}
        </div>
        <i className="bi bi-chevron-right"></i>
        <i className="bi bi-chevron-down"></i>
      </div>
      <div className="listcourse__container__item__list-course-item">
        <ul>
          <CourseItem listcourse={props.listcourse} />
        </ul>
      </div>
    </li>
  );
}

export default ListCourseItem;
