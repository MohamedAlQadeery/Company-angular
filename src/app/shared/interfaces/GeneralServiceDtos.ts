import { BaseModel } from './base/base';

export interface GeneralService extends BaseModel {
  name: string;
  description: string;
  photo: string | null;
  photoFile: string | null;
}

export function GeneralServiceToFormData(model: GeneralService): FormData {
  let formData = new FormData();
  if (model.id) formData.append('Id', model.id.toString());
  formData.append('Name', model.name);
  formData.append('Description', model.description);
  if (model.photo) formData.append('photo', model.photo);
  if (model.photoFile) formData.append('PhotoFile', model.photoFile);
  return formData;
}
