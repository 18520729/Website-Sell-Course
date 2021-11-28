import { Row, Col } from "reactstrap";
import ListCourse from "./ListCourse";
import Banner from "./Banner";

function Category(){
    return(
        <Row className="body__Category">
            <Col className="body__Category__list-course" xs="3">
                <ListCourse/>
            </Col>
            <Col className="body__Category__banner" xs="9">
                <Banner/>
            </Col>
        </Row>
    )
}



export default Category;