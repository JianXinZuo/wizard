export const MIME = {
  PNG: 'image/png',
  JPG: 'image/jpg',
  JPEG: 'image/jpeg',
};

export function isImage(MIMEType: string): boolean {
  return [MIME.PNG, MIME.JPEG, MIME.JPEG].includes(MIMEType);
}
