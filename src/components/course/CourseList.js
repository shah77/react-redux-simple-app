import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({courses}) => {
    return(
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Length</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {courses.map(course=>
                    <CourseListRow key={course.id} course={course} />
                )}
                </tbody>
        </table>
    );
};

CourseList.propTypes = {
    courses: PropTypes.array.isRequired
};

export default CourseList;