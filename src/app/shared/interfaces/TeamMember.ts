import { BaseModel } from './base/base';

export interface TeamMember extends BaseModel {
  name: string;
  nameAR: string;
  nameTR: string;
  jopTitle: string;
  jopTitleAR: string;
  jopTitleTR: string;
  image: string;
  imageFile: File;
}

export function TeamMemberToFormData(model: TeamMember): FormData {
  let formData = new FormData();
  if (model.id) formData.append('Id', model.id.toString());
  formData.append('Name', model.name);
  formData.append('NameAR', model.nameAR);
  formData.append('NameTR', model.nameTR);
  formData.append('JopTitle', model.jopTitle);
  formData.append('JopTitleAR', model.jopTitleAR);
  formData.append('JopTitleTR', model.jopTitleTR);
  if (model.image) formData.append('Image', model.image);
  if (model.imageFile) formData.append('ImageFile', model.imageFile);
  return formData;
}

