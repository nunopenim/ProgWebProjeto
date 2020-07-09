export class DetailModel {

  public headerText: string;
  public contentText: string;
  public buttonText: string;
  public icon?: string;

  constructor(detailModel?: DetailModel) {
    this.headerText = detailModel ? detailModel.headerText : null;
    this.contentText = detailModel ? detailModel.contentText : null;
    this.buttonText = detailModel ? detailModel.buttonText : null;
    this.icon = detailModel ? detailModel.icon : null;
  }

}
