export abstract class Constants {
  //Common API Endpoints
  public static authenticationBaseURL = 'http://localhost:58441';
  public static baseURL = 'http://localhost:58441';

  //Authentication API Endpoints
  public static getAllUsers = '/getAllUsers';
  public static getUserById = '/getUserById';
  public static addUsers = '/addUsers';
  public static updateUser = '/updateUser';
  public static deleteUser = '/deleteUser';
  public static validateUser = '/validateUser';
  public static getAllRoles = '/getAllRoles';
  public static getRoleById = '/getRoleById';
  public static addRoles = '/addRoles';
  public static updateRole = '/updateRole';
  public static deleteRoles = '/deleteRoles';

  public static getUrl = (endpoint: string, isAuth: boolean = false): string => {
    return isAuth ? this.authenticationBaseURL + endpoint : this.baseURL + endpoint;
  }
}
