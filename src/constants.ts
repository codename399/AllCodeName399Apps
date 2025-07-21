export abstract class Constants {
    //Game-Stash API Endpoints
    public static baseURL = "http://localhost:58441/";
    public static getAll = this.baseURL + "getAll";
    public static getByStatus = this.baseURL + "getByStatus";
    public static add = this.baseURL + "add";
    public static update = this.baseURL + "update";
    public static delete = this.baseURL + "delete";
}