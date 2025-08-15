import { InjectionToken } from '@angular/core';
import { PaginationRequest } from '../app/models/pagination-request';

export const PAGINATION_REQUEST = new InjectionToken<PaginationRequest>('pagination-request');
