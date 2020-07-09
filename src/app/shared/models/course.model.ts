import {TeacherModel} from "./teacher.model";
import {SubjectModel} from "./subject.model";

export class CourseModel {
  public id?: string;
  public courseName?: string;
  public courseOrg?: string;
  public courseUrl?: string;
  public teachersCourse?: Array<TeacherModel>;
  public subjectsCourse?: Array<SubjectModel>;

  constructor(courseModel?: CourseModel) {
    this.id = courseModel ? courseModel.id : null;
    this.courseName = courseModel ? courseModel.courseName : null;
    this.courseOrg = courseModel ? courseModel.courseOrg : null;
    this.courseUrl = courseModel ? courseModel.courseUrl : null;
    this.teachersCourse = courseModel && courseModel.teachersCourse ?
      courseModel.teachersCourse.map(cm => new TeacherModel(cm)) : new Array<TeacherModel>();
    this.subjectsCourse = courseModel && courseModel.subjectsCourse ?
      courseModel.subjectsCourse.map(cs => new SubjectModel(cs)) : new Array<SubjectModel>();
  }
}
