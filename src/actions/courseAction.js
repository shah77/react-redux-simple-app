import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusAction';

export function loadCoursesSuccess(courses){
    return  {type: types.LOAD_COURSE_SUCCESS, courses};
}

export function createCourseSuccess(course){
    return  {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCoursesSuccess(course){
    return  {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function deleteCourseSuccess(courseId){
    return  {type: types.DELETE_COURSE_SUCCESS, courseId};
}

export function loadCourses(){
    return function(dispatch){
        dispatch(beginAjaxCall());

        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw(error);
        });     
    };
}

export function saveCourse(course){
    return function(dispatch, getState){
        dispatch(beginAjaxCall());

        return courseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCoursesSuccess(savedCourse)) : 
            dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });     
    };
}

export function deleteCourse(courseId){
    return function(dispatch, getState){
        dispatch(beginAjaxCall());

        return courseApi.deleteCourse(courseId).then(deleteDetails => {
            dispatch(deleteCourseSuccess(deleteDetails));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });     
    };
}