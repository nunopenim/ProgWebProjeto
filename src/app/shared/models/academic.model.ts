export class AcademicModel {
  public id?: string;
  public educationalInstitution?: string;
  public formation?: string;
  public fieldOfStudy?: string;
  public startDate?: string;
  public endDate?: string;
  public grade?: string;
  public activities?: string;
  public description?: string;

  constructor(academicModel?: AcademicModel) {
    this.id = academicModel ? academicModel.id : null;
    this.educationalInstitution = academicModel ? academicModel.educationalInstitution : null;
    this.formation = academicModel ? academicModel.formation : null;
    this.fieldOfStudy = academicModel ? academicModel.fieldOfStudy : null;
    this.startDate = academicModel ? academicModel.startDate : null;
    this.endDate = academicModel ? academicModel.endDate : null;
    this.grade = academicModel ? academicModel.grade : null;
    this.activities = academicModel ? academicModel.activities : null;
    this.description = academicModel ? academicModel.description : null;
  }
}
