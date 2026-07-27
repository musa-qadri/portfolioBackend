export class CreateCertificateDto {
  title: string;
  issuer: string;
  issueDate?: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
}
