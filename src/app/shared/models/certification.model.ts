export class CertificationModel {

  public id?: string;
  public certName?: string;
  public issuingOrg?: string;
  public expires?: boolean;
  public issuingDate?: string;
  public expireDate?: string;
  public certCode?: string;
  public certUrl?: string;

  constructor(certificationModel?: CertificationModel) {
    this.id = certificationModel ? certificationModel.id : null;
    this.certName = certificationModel ? certificationModel.certName : null;
    this.issuingOrg = certificationModel ? certificationModel.issuingOrg : null;
    this.expires = certificationModel ? certificationModel.expires : null;
    this.issuingDate = certificationModel ? certificationModel.issuingDate : null;
    this.expireDate = certificationModel ? certificationModel.expireDate : null;
    this.certCode = certificationModel ? certificationModel.certCode : null;
    this.certUrl = certificationModel ? certificationModel.certUrl : null;
  }
}
