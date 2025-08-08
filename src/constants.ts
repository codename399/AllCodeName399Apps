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

  //Game-Stash API Endpoints
  public static getAll = this.baseURL + 'getAll';
  public static getByStatus = this.baseURL + 'getByStatus';
  public static add = this.baseURL + 'add';
  public static update = this.baseURL + 'update';
  public static delete = this.baseURL + 'delete';

  public static getUrl(endpoint: string, isAuth: boolean): string {
    return isAuth ? this.authenticationBaseURL + endpoint : this.baseURL + endpoint;
  }
}
