export class Util {
  public static getBase64Url(file: any) {
    let profilePictureUrl: string = '';

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        profilePictureUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

    return profilePictureUrl;
  }
}
