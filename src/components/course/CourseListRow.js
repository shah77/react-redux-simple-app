import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course, deleting}) => {
    return(
        <tr>
            <td><Link to={'/course/'+course.id}>{course.title}</Link></td>
            <td>{course.authorId}</td>
            <td>{course.category}</td>
            <td>{course.length}</td>
            <td>
                <a className="btn btn-sm btn-success" href={course.watchHref}>Watch</a>
            </td>
        </tr>
    );
};

CourseListRow.propTypes = {
    course: PropTypes.object.isRequired,
    deleting: PropTypes.bool
};

export default CourseListRow;