import {ProjectTeamMemberModel} from './project-team-member.model';

export class ProjectModel {

  public id?: string;
  public projectName?: string;
  public projectAlias?: string;
  public companyName?: string;
  public companyAddress?: string;
  public state?: string;
  public city?: string;
  public zip?: string;
  public personalProject?: boolean;
  public projectTeamMembers?: Array<ProjectTeamMemberModel>;

  constructor(projectModel?: ProjectModel) {
    this.id = projectModel ? projectModel.id : null;
    this.projectName = projectModel ? projectModel.projectName : null;
    this.projectAlias = projectModel ? projectModel.projectAlias : null;
    this.companyName = projectModel ? projectModel.companyName : null;
    this.companyAddress = projectModel ? projectModel.companyAddress : null;
    this.state = projectModel ? projectModel.state : null;
    this.city = projectModel ? projectModel.city : null;
    this.zip = projectModel ? projectModel.zip : null;
    this.personalProject = projectModel ? projectModel.personalProject : null;
    this.projectTeamMembers = projectModel && projectModel.projectTeamMembers ?
      projectModel.projectTeamMembers.map(pm => new ProjectTeamMemberModel(pm)) : new Array<ProjectTeamMemberModel>();
  }

  public projectCompanyDetails(): string {
    return `${this.companyName}, ${this.companyAddress}`;
  }

  public projectTitle(): string {
    return `${this.projectName} ${this.projectAlias ? '- ' + this.projectAlias : ''}`;
  }

  public locationDetails(): string {
    return `${this.city} ${this.zip ? ',' + this.zip : ''}`;
  }

}
