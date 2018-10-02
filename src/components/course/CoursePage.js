import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import * as courseActions from '../../actions/courseAction';
import {browserHistory} from 'react-router';

class CoursePage extends React.Component{
    constructor(props, context){
        super(props, context);

        // this.state = {
        //     course: { title: ''}
        // };

        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

    // onTitleChange(event){
    //     const course = this.state.course;
    //     course.title = event.target.value;
    //     this.setState({course:course});
    // }

    // onClickSave(){
    //     this.props.actions.createCourse(this.state.course);
    // }

    courseRow(course, index){
        return <div key={index}>{course.title}</div>;
    }

    redirectToAddCoursePage(){
        browserHistory.push('/course');
    }

    render(){
        const {courses} = this.props;

        return(
            <div className="container">
                <h3>Courses</h3>
                <input 
                    type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage}/>
                <CourseList courses={courses}/>
            </div>
        );
    }
}

CoursePage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
    return{
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);