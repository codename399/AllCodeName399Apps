import moment from "moment";
import { Status } from "./enum/status.enum";
import { Website } from "./enum/website.enum";

export class GameDetail {
    id!: string;
    name!: string;
    status!: Status;
    website!: Website;
    creationDate!: string;
    startDate!: string;
    archiveDate!: string;
    completionDate!: string;
}