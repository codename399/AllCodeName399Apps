import { Injectable, inject } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PAGINATION_REQUEST } from "../../../../injectors/common-injector";
import { DebtManagerService } from "../services/debt-manager-service";

@Injectable({
    providedIn: "root"
})
export class DebtManagerResolver implements Resolve<any> {
    #debtManagerService = inject(DebtManagerService);
    #paginationRequest = inject(PAGINATION_REQUEST);

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.#debtManagerService.getAll(this.#paginationRequest);
    }
}