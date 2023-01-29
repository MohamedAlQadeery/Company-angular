export interface IAttachmentResponse {
  photo: string | null;
  logo: string | null;
  information: string | null;
  applicationUserId: string;
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
}
