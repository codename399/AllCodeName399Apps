import { Audit } from "../../app/models/audit";

export interface Role extends Audit {
    id: string | null;
    name: string;
}