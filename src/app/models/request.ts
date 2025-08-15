import { Constants } from '../../constants';

export class Request {
  skip?: number = 0;
  limit?: number = 5;
  sortBy?: string = Constants.creationDate;
  ascending: boolean = false;
  isDeleted: boolean = false;
}
