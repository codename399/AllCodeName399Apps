import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_CONSTANTS } from "../../../../injectors/common-injector";
import { PaginationRequest } from "../../../models/pagination-request";
import { GameDetail } from "../models/game-detail";
import { PagedResponse } from "../../../models/paged-response";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class GameStashService {
    #httpClient = inject(HttpClient);
    #apiConstants = inject(API_CONSTANTS);

    getAll(
        paginationRequest: PaginationRequest
    ): Observable<PagedResponse<GameDetail>> {
        return this.#httpClient.post<PagedResponse<GameDetail>>(
            this.#apiConstants.getUrl(this.#apiConstants.getAllGames),
            paginationRequest
        );
    }

    add(gameDetail: GameDetail) {
        return this.#httpClient.post(
            this.#apiConstants.getUrl(this.#apiConstants.addGames),
            gameDetail
        );
    }

    update(gameDetail: GameDetail) {
        return this.#httpClient.put(
            this.#apiConstants.getUrl(this.#apiConstants.updateGame),
            gameDetail
        );
    }

    delete(gameDetailIds: string[]) {
        return this.#httpClient.post(
            this.#apiConstants.getUrl(this.#apiConstants.deleteGames),
            gameDetailIds
        );
    }
}