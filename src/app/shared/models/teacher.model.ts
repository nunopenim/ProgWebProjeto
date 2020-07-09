export class TeacherModel {
  public id?: string;
  public teacherName?: string;
  public certUrl?: string;

  constructor(teacherModel?: TeacherModel) {
    this.id = teacherModel ? teacherModel.id : null;
    this.teacherName =  teacherModel ? teacherModel.teacherName : null;
    this.certUrl = teacherModel ? teacherModel.certUrl : null;
  }
}


