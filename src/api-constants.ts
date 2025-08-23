import { inject } from "@angular/core";
import { Config } from "./assets/environments/config";

export class ApiConstants {
  #config = inject(Config);

  //Common API Endpoints
  public authenticationBaseURL = this.#config.authenticationBaseURL;
  public baseURL = this.#config.baseURL;

  //Authentication API Endpoints
  public getAllUsers = '/getAllUsers';
  public getUserById = '/getUserById';
  public addUsers = '/addUsers';
  public updateUser = '/updateUser';
  public deleteUser = '/deleteUser';
  public validateUser = '/validateUser';
  public changePassword = '/changePassword';
  public getAllRoles = '/getAllRoles';
  public getRoleById = '/getRoleById';
  public addRoles = '/addRoles';
  public updateRole = '/updateRole';
  public deleteRole = '/deleteRole';
  public getAllProjects = '/getAllProjects';
  public getAllMappedProjects = '/getAllMappedProjects';
  public getProjectById = '/getProjectById';
  public addProjects = '/addProjects';
  public updateProject = '/updateProject';
  public deleteProject = '/deleteProject';
  public getAllUserProjectMappings = "/getAllUserProjectMappings";
  public updateUserProjectMappings = "/updateUserProjectMappings";

  public getUrl = (
    endpoint: string,
    isAuth: boolean = false
  ): string => {
    return isAuth
      ? this.authenticationBaseURL + endpoint
      : this.baseURL + endpoint;
  };
}
