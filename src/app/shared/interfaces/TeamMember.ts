import { BaseModel } from './base/base';

export interface TeamMember extends BaseModel {
  name: string;
  jopTitle: string;
  image: string;
  imageFile: File;
}

export function TeamMemberToFormData(model: TeamMember): FormData {
  let formData = new FormData();
  if (model.id) formData.append('Id', model.id.toString());
  formData.append('Name', model.name);
  formData.append('JopTitle', model.jopTitle);
  if (model.image) formData.append('Image', model.image);
  if (model.imageFile) formData.append('ImageFile', model.imageFile);
  return formData;
}

