import { Audit } from "../../../models/audit";

export interface Debt extends Audit {
    fromUserId?: string;
    toUserId?: string;
    title?: string;
    description?: string;
    transactionType?: string;
    totalAmount?: number;
    settledAmount?: number;
    settlementDate?: Date;
    isSettled?: boolean;
    expectedDate?: Date;
}