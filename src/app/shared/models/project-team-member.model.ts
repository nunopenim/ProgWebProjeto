export class ProjectTeamMemberModel {
  public id?: string;
  public memberSpecialization?: string;
  public memberName?: string;
  public startDate?: string;
  public endDate?: string;

  constructor(projectTeamMember: ProjectTeamMemberModel) {
    this.id = projectTeamMember ? projectTeamMember.id : null;
    this.memberSpecialization = projectTeamMember ? projectTeamMember.memberSpecialization : null;
    this.memberName = projectTeamMember ? projectTeamMember.memberName : null;
    this.startDate = projectTeamMember ? projectTeamMember.startDate : null;
    this.endDate = projectTeamMember ? projectTeamMember.endDate : null;
  }
}
