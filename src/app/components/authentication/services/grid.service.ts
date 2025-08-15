import { inject, Injectable, Injector, signal } from '@angular/core';
import { PAGINATION_REQUEST } from '../../../../injectors/common-injector';
import { PagedResponse } from '../../../models/paged-response';
import { LoaderService } from '../../../services/loader.service';
import { ToastService } from '../../../services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class GridService<I> {
  #injector = inject(Injector);
  #service: any;
  #paginationRequest = inject(PAGINATION_REQUEST);
  #pagedResponse = signal<PagedResponse<I> | null>(null);
  #loaderService = inject(LoaderService);
  #toastService = inject(ToastService);
  #showForm = signal<boolean>(false);
  #displayedColumns = signal<string[]>([]);

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

  get displayedColumns(){
    return this.#displayedColumns();
  }

  set service(value: any) {
    this.#service = this.#injector.get(value);
  }

  set paginationRequest(value: any) {
    this.#paginationRequest.skip = value.previousPageIndex * value.pageSize;
    this.#paginationRequest.limit = value.pageSize;
  }

  set pagedResponse(value: PagedResponse<I>) {
    this.#pagedResponse.set(value);
  }

  set showForm(value: boolean) {
    this.#showForm.set(value);
  }

  set displayedColumns(value:string[]){
    this.#displayedColumns.set(value);
  }

  getAll() {
    this.#loaderService.show();

    this.#service.getAll(this.paginationRequest).subscribe({
      next: (pagedResponse: PagedResponse<I>) => {
        this.pagedResponse = pagedResponse;
        this.#loaderService.hide();
      },
    });
  }

  add(item: I) {
    this.#loaderService.show();
    this.#service.add(item).subscribe({
      next: () => {
        this.getAll();
        this.#toastService.success('Added successfully');
      },
    });
  }

  update(item: I) {
    this.#loaderService.show();

    this.#service.update(item).subscribe({
      next: () => {
        this.getAll();
        this.#toastService.success('Updated successfully');
      },
    });
  }

  delete(event: I[]) {
    this.#loaderService.show();

    this.#service.delete(event.map((m: any) => m.id ?? '')).subscribe({
      next: () => {
        this.getAll();
        this.#toastService.success('Deleted successfully');
      },
    });
  }
}
