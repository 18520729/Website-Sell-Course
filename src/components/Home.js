import { Container, Row } from "reactstrap";
import Navbar from "./navbar";
import Body from "./Body";
import Cart from "./Cart";
import Footer from "./Footer";
import CourseDetail from "./CourseDetail";
import MyCourse from "./MyCourse";
import { Route, Switch } from "react-router-dom";
import Search from "./Search";
import MyInfo from "./MyInfo";

function Home() {
  return (
    <div className="app__home">
      <div>
        <Container>
          <Row className="app__home__container__rownav">
            <Navbar />
          </Row>
        </Container>
      </div>
      <div className="app__home__container__body">
        <Container>
          <Row className="app__home__container__rowbody">
            <Switch>
              <Route path="/cart" component={Cart} />
              <Route path="/search" component={Search} />
              <Route path="/course" component={CourseDetail} />
              <Route path="/my-course" component={MyCourse} />
              <Route path="/my-info" component={MyInfo}/>
              <Route path="" component={Body} />
            </Switch>
          </Row>
        </Container>
      </div>
      <div className="background-footer">
        <Container fluid={false}>
          <Row className="app__home__container__rowfooter">
            <Footer />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
