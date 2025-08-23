import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { GameStashService } from "../services/game-stash-service";
import { PAGINATION_REQUEST } from "../../../../injectors/common-injector";

@Injectable({
    providedIn: "root"
})
export class GameStashResolver implements Resolve<any> {
    #gameStashService = inject(GameStashService);
    #paginationRequest = inject(PAGINATION_REQUEST);

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.#gameStashService.getAll(this.#paginationRequest);
    }
}