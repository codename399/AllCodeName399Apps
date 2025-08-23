import { Audit } from "../../../models/audit";

export interface GameDetail extends Audit {
    name?: string;
    status?: string;
    website?: string;
    startDate?: Date;
    archiveDate?: Date;
    completionDate?: Date;
}