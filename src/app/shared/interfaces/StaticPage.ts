import { BaseModel } from './base/base';

export interface StaticPage extends BaseModel {
  pageName: string;
  description: string;
  descriptionAR: string;
  descriptionTR: string;
  headerImage: string | null;
  headerImageFile: File | null;
}


export function StaticPageToFormData(model: StaticPage): FormData {
  let formData = new FormData();
  if (model.id) formData.append('Id', model.id.toString());
  formData.append('PageName', model.pageName);
  formData.append('Description', model.description);
  formData.append('DescriptionAR', model.descriptionAR);
  formData.append('DescriptionTR', model.descriptionTR);
  if (model.headerImage) formData.append('HeaderImage', model.headerImage);
  if (model.headerImageFile) formData.append('HeaderImageFile', model.headerImageFile);
  return formData;
}