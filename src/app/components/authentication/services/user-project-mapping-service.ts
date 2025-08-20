import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { inject } from "@angular/core/primitives/di";
import { Observable } from "rxjs";
import { ApiConstants } from "../../../../api-constants";
import { PagedResponse } from "../../../models/paged-response";
import { PaginationRequest } from "../../../models/pagination-request";
import { User } from "../models/user";
import { UserProjectMapping } from "../models/user-project-mapping";

@Injectable({
    providedIn: "root"
})
export class UserProjectMappingService {
    #httpClient = inject(HttpClient);

    getAll(
        paginationRequest: PaginationRequest
    ): Observable<PagedResponse<UserProjectMapping>> {
        return this.#httpClient.post<PagedResponse<UserProjectMapping>>(
            ApiConstants.getUrl(ApiConstants.getAllUserProjectMappings, true),
            paginationRequest
        );
    }

    update(
        userProjectMapping: UserProjectMapping
    ) {
        return this.#httpClient.put(
            ApiConstants.getUrl(ApiConstants.updateUserProjectMappings, true),
            userProjectMapping
        );
    }
}