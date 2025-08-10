export abstract class ApiConstants {
  //Common API Endpoints
  public static authenticationBaseURL = 'https://localhost:44357';
  public static baseURL = 'http://localhost:58441';

  //Authentication API Endpoints
  public static getAllUsers = '/getAllUsers';
  public static getUserById = '/getUserById';
  public static addUsers = '/addUsers';
  public static updateUser = '/updateUser';
  public static deleteUser = '/deleteUser';
  public static validateUser = '/validateUser';
  public static changePassword = '/changePassword';
  public static getAllRoles = '/getAllRoles';
  public static getRoleById = '/getRoleById';
  public static addRoles = '/addRoles';
  public static updateRole = '/updateRole';
  public static deleteRole = '/deleteRole';
  public static getAllProjects = '/getAllProjects';
  public static getProjectById = '/getProjectById';
  public static addProjects = '/addProjects';
  public static updateProject = '/updateProject';
  public static deleteProject = '/deleteProject';

  public static getUrl = (
    endpoint: string,
    isAuth: boolean = false
  ): string => {
    return isAuth
      ? this.authenticationBaseURL + endpoint
      : this.baseURL + endpoint;
  };
}
