import { Audit } from "../../../models/audit";

export interface UserProjectMapping extends Audit {
    userId: string;
    projectIds?: string[];
}