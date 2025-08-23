import { Audit } from "../../../models/audit";
import { Status } from "./enum/status-enum";
import { Website } from "./enum/website-enum";

export interface GameDetail extends Audit {
    name?: string;
    status?: Status;
    website?: Website;
    startDate?: Date;
    archiveDate?: Date;
    completionDate?: Date;
}