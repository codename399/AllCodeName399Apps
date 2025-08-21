import { InjectionToken, Injector } from '@angular/core';
import { PaginationRequest } from '../app/models/pagination-request';

export const PAGINATION_REQUEST = new InjectionToken<PaginationRequest>('pagination-request');
export const CONFIG_FILE_PATH = new InjectionToken<string>('string');
