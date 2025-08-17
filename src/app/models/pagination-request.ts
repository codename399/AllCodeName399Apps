import { Constants } from '../../constants';

export class PaginationRequest {
  skip?: number = 0;
  limit?: number = 5;
  sortBy?: string = Constants.creationDate;
  field?: string;
  value?: string;
  ascending: boolean = false;
  isDeleted: boolean = false;
  fetchAll: boolean = false;
}
