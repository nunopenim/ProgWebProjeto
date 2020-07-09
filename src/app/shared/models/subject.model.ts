export class SubjectModel {
  public id?: string;
  public subjectName?: string;
  public certUrl?: string;

  constructor(subjectModel?: SubjectModel) {
    this.id = subjectModel ? subjectModel.id : null;
    this.subjectName =  subjectModel ? subjectModel.subjectName : null;
    this.certUrl = subjectModel ? subjectModel.certUrl : null;
  }
}
