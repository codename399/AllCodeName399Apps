import { Constants } from '../../constants';
import { FilterRequest } from './filter-request';

export class PaginationRequest {
  skip?: number = 0;
  limit?: number = 5;
  sortBy?: string = Constants.creationDate;
  filters?: FilterRequest[];
  ascending: boolean = false;
  isDeleted: boolean = false;
  fetchAll: boolean = false;
}
