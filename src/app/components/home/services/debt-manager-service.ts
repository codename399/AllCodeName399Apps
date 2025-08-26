import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from '../../../../injectors/common-injector';
import { PagedResponse } from '../../../models/paged-response';
import { PaginationRequest } from '../../../models/pagination-request';
import { Debt } from '../models/debt';
import { DebtDto } from '../models/dto/debt-dto';

@Injectable({
  providedIn: 'root'
})
export class DebtManagerService {
  #httpClient = inject(HttpClient);
  #apiConstants = inject(API_CONSTANTS);

  getAll(
    paginationRequest: PaginationRequest
  ): Observable<PagedResponse<Debt>> {
    return this.#httpClient.post<PagedResponse<Debt>>(
      this.#apiConstants.getUrl(this.#apiConstants.getAllDebts),
      paginationRequest
    );
  }

  add(debts: DebtDto) {
    return this.#httpClient.post(
      this.#apiConstants.getUrl(this.#apiConstants.addDebts),
      debts
    );
  }

  update(debt: DebtDto) {
    return this.#httpClient.put(
      this.#apiConstants.getUrl(this.#apiConstants.updateDebt),
      debt
    );
  }

  delete(ids: string[]) {
    return this.#httpClient.post(
      this.#apiConstants.getUrl(this.#apiConstants.deleteDebts),
      ids
    );
  }
}
