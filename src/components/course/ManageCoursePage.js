import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseForm from './CourseForm';
import CourseListRow from './CourseListRow';
import toastr from 'toastr';

class ManageCoursePage extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            course:Object.assign({}, this.props.course),
            errors: {},
            saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentWillReceiveProps(nextProps){ 
        if(this.props.course.id != nextProps.course.id){
            //necessary to populate form when existing course id loaded
            this.setState({course:Object.assign({}, nextProps.course)});
        }
    }

    updateCourseState(event){
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course})
    }

    saveCourse(event){
        event.preventDefault();
        console.log("click click");
        this.setState({saving: true});
        this.props.actions.saveCourse(this.state.course)
            .then(() => this.redirect()).catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            }
        ); 
    }

    redirect(){
        this.setState({saving: false});
        toastr.success('Course saved');
        this.context.router.push('/courses');
    }

    deleteCourse(event){
        event.preventDefault();
        console.log("click click");
        this.props.actions.deleteCourse(this.state.course.id)
            .then(() => this.redirect()).catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            }
        );
    }

    render(){
        return(
            <div>
                <CourseForm 
                    allAuthors={this.props.authors}
                    onSave={this.saveCourse}
                    onChange={this.updateCourseState}
                    course={this.state.course}
                    errors={this.state.errors}
                    saving={this.state.saving}
                />
            </div>
        );
    }
}

ManageCoursePage.propTypes = {
    course:PropTypes.object.isRequired,
    authors:PropTypes.array.isRequired
};

//to avoid a linting warning when testing this component
ManageCoursePage.contextTypes = {
    router:PropTypes.object.isRequired
};

function getCourseById(courses, id){
    const course = courses.filter(course => course.id == id);
    if(course) return course[0];
    return null;
}

function mapStateToProps(state, ownProps){
    const courseId = ownProps.params.id;
    let course = {id: '', watchHref: '', title: '', author: '', length: '', category: ''};

    if(courseId){
        course = getCourseById(state.courses, courseId);
    }

    const authorsFormattedForDropDown = state.authors.map(author=>{
        return {
            value: author.id,
            text: author.firstName  + ' ' + author.lastName
        };  
    });

    return{
        course: course,
        authors: authorsFormattedForDropDown
    };
}

function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);  