import { Link } from "react-router-dom";

function CourseItem(props){
    function renderCourse(level){
        const arrElement = [];
        let a = 0;
        for(let j in level){
            arrElement.push(
                <li key={a++}><Link to={level[j]}><div><i className="bi bi-brush"></i> {j}</div></Link></li>
            );
        }
        return arrElement;
    }
   return renderCourse(props.listcourse);
}

export default CourseItem;