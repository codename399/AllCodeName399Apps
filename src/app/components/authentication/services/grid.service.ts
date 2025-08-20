import { inject, Injectable, Injector, signal } from '@angular/core';
import { PAGINATION_REQUEST } from '../../../../injectors/common-injector';
import { PagedResponse } from '../../../models/paged-response';

@Injectable({
  providedIn: 'root',
})
export class GridService<I> {
  #injector = inject(Injector);
  #service!: any;
  #paginationRequest = inject(PAGINATION_REQUEST);
  #pagedResponse = signal<PagedResponse<I> | null>(null);
  #showForm = signal<boolean>(false);
  #displayedColumns = signal<string[]>([]);
  #item!: I | null;

  get service() {
    return this.#service;
  }

  get paginationRequest() {
    return this.#paginationRequest;
  }

  get pagedResponse(): PagedResponse<I> | null {
    return this.#pagedResponse();
  }

  get showForm() {
    return this.#showForm();
  }

  get displayedColumns() {
    return this.#displayedColumns();
  }

  get item() {
    return this.#item;
  }

  set service(value: any) {
    this.#service = this.#injector.get(value);
  }

  set paginationRequest(value: any) {
    this.#paginationRequest.skip = value.pageIndex * value.pageSize;
    this.#paginationRequest.limit = value.pageSize;
  }

  set pagedResponse(value: PagedResponse<I>) {
    this.#pagedResponse.set(value);
  }

  set showForm(value: boolean) {
    this.#showForm.set(value);
  }

  set displayedColumns(value: string[]) {
    this.#displayedColumns.set(value);
  }

  set item(value: I | null) {
    this.#item = value;
  }

  getAll() {
    return this.#service.getAll(this.paginationRequest);
  }

  add() {
    return this.#service.add(this.#item);
  }

  update() {
    return this.#service.update(this.item);
  }

  delete(event: I[]) {
    return this.#service.delete(event.map((m: any) => m.id ?? ''));
  }
}
