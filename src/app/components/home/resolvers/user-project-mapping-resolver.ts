import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { combineLatest, forkJoin, merge } from "rxjs";
import { PAGINATION_REQUEST } from "../../../../injectors/common-injector";
import { ProjectService } from "../../authentication/services/project-service";
import { UserService } from "../../authentication/services/user-service";

@Injectable({
    providedIn: "root"
})
export class UserProjectMappingResolver implements Resolve<any> {
    #userService = inject(UserService);
    #projectService = inject(ProjectService);
    #paginationRequest = inject(PAGINATION_REQUEST);

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.#paginationRequest.fetchAll = true;

        return forkJoin(this.#userService.getAll(this.#paginationRequest), this.#projectService.getAll(this.#paginationRequest));
    }
}